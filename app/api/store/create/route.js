import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import imagekit from "@/config/imageKit";

// 1. ایجاد فروشگاه (POST)
export async function POST(request) {
  try {
    // دریافت شناسه کاربر از Clerk
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "کاربر وارد نشده است" },
        { status: 401 }
      );
    }

    // بررسی وجود کاربر در دیتابیس (در صورت عدم وجود، ایجاد کاربر کامل)
    let user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      const clerkUser = await currentUser();

      const name = `${clerkUser?.firstName || ""} ${clerkUser?.lastName || ""}`.trim() || "User";
      const email = clerkUser?.emailAddresses[0]?.emailAddress || "";
      const image = clerkUser?.imageUrl || "";

      user = await prisma.user.create({
        data: {
          id: userId,
          name: name,
          email: email,
          image: image,
        },
      });
    }

    // دریافت داده‌های فرم
    const formData = await request.formData();

    const name = formData.get("name");
    const username = formData.get("username");
    const description = formData.get("description");
    const email = formData.get("email");
    const contact = formData.get("contact");
    const address = formData.get("address");
    const image = formData.get("image");

    if (
      !name ||
      !username ||
      !description ||
      !email ||
      !contact ||
      !address ||
      !image
    ) {
      return NextResponse.json(
        { error: "اطلاعات فروشگاه کامل نیست" },
        { status: 400 }
      );
    }

    // بررسی ثبت فروشگاه قبلی
    const existingStore = await prisma.store.findFirst({
      where: { userId },
    });

    if (existingStore) {
      return NextResponse.json({ status: existingStore.status });
    }

    // بررسی تکراری نبودن نام کاربری
    const isUsernameTaken = await prisma.store.findFirst({
      where: { username: username.toLowerCase() },
    });

    if (isUsernameTaken) {
      return NextResponse.json(
        { error: "این نام کاربری قبلاً انتخاب شده است" },
        { status: 400 }
      );
    }

    // آپلود تصویر لوگو در ImageKit
    const buffer = Buffer.from(await image.arrayBuffer());
    const response = await imagekit.upload({
      file: buffer,
      fileName: image.name,
      folder: "logos",
    });

    const optimizedImage = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "512" },
      ],
    });

    // ساخت فروشگاه در دیتابیس
    await prisma.store.create({
      data: {
        userId,
        name,
        description,
        username: username.toLowerCase(),
        email,
        contact,
        address,
        logo: optimizedImage,
      },
    });

    return NextResponse.json({ message: "درخواست ثبت فروشگاه ارسال شد" });
  } catch (error) {
    console.error("Store creation error:", error);
    return NextResponse.json(
      { error: error.code || error.message || "خطای سرور" },
      { status: 500 }
    );
  }
}

// 2. بررسی وضعیت ثبت‌نام فروشگاه (GET)
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ status: "not registered" });
    }

    const store = await prisma.store.findFirst({
      where: { userId },
    });

    if (store) {
      return NextResponse.json({ status: store.status });
    }

    return NextResponse.json({ status: "not registered" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.code || error.message },
      { status: 400 }
    );
  }
}