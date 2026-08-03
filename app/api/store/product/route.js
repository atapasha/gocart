// app/api/store/product/route.js

import prisma from "@/lib/prisma";
import imagekit from "@/config/imageKit";
import authSeller from "@/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Add New Product
export async function POST(request) {
  try {
    const { userId } = getAuth(request);

    const storeId = await authSeller(userId);

    if (!storeId) {
      return NextResponse.json(
        { error: "Not authorized" },
        { status: 401 }
      );
    }

    const formData = await request.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const mrp = Number(formData.get("mrp"));
    const price = Number(formData.get("price"));
    const category = formData.get("category");

    const sizes = JSON.parse(
      formData.get("sizes") || "[]"
    );

    const colors = JSON.parse(
      formData.get("colors") || "[]"
    );

    const images = formData.getAll("images");

    if (
      !name ||
      !description ||
      !category ||
      images.length === 0 ||
      isNaN(mrp) ||
      isNaN(price)
    ) {
      return NextResponse.json(
        { error: "Missing product details" },
        { status: 400 }
      );
    }
//upload the images on imgkit
    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const buffer = Buffer.from(
          await image.arrayBuffer()
        );

        const response = await imagekit.upload({
          file: buffer,
          fileName: image.name,
          folder: "/products",
        });

        return imagekit.url({
          path: response.filePath,
          transformation: [
            { quality: "auto" },
            { format: "webp" },
            { width: "1024" },
          ],
        });
      })
    );

    const product = await prisma.product.create({
      data: {
        name,
        description,
        mrp,
        price,
        category,
        sizes,
        colors,
        images: imageUrls,
        storeId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message || "Something went wrong",
      },
      {
        status: 400,
      }
    );
  }
}

// Get All Products For Seller
export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    const storeId = await authSeller(userId);

    if (!storeId) {
      return NextResponse.json(
        { error: "Not authorized" },
        { status: 401 }
      );
    }

    const products = await prisma.product.findMany({
      where: {
        storeId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message || "Something went wrong",
      },
      {
        status: 400,
      }
    );
  }
}