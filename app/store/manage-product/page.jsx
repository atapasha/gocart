"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Loading from "@/components/Loading";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";

export default function StoreManageProducts() {
  const { getToken } = useAuth();
  const { user } = useUser();

  const currency =
    process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$";

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const colorMap = {
    Black: "#000000",
    White: "#ffffff",
    Red: "#ef4444",
    Blue: "#3b82f6",
    Green: "#22c55e",
    Yellow: "#eab308",
    Orange: "#f97316",
    Purple: "#a855f7",
    Pink: "#ec4899",
    Brown: "#92400e",
    Gray: "#6b7280",
    Navy: "#1e3a8a",
    Beige: "#f5f5dc",
    Cream: "#fffdd0",
    Khaki: "#c3b091",
    Gold: "#ffd700",
    Silver: "#c0c0c0",
  };

  const fetchProducts = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get(
        "/api/store/product",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts(
        data.products.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        )
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleStock = async (productId) => {
    try {
      const token = await getToken();

      const { data } = await axios.post(
        "/api/store/stock-toggle",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId
            ? {
                ...product,
                inStock: !product.inStock,
              }
            : product
        )
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          error.message
      );
    }
  };

  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, [user]);

  if (loading) return <Loading />;

  return (
    <>
      <h1 className="text-2xl text-slate-500 mb-5">
        Manage{" "}
        <span className="text-slate-800 font-medium">
          Products
        </span>
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px] text-left ring ring-slate-200 rounded overflow-hidden text-sm">
          <thead className="bg-slate-50 text-gray-700 uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3">
                Product
              </th>

              <th className="px-4 py-3">
                Category
              </th>

              <th className="px-4 py-3 hidden lg:table-cell">
                Sizes
              </th>

              <th className="px-4 py-3 hidden lg:table-cell">
                Colors
              </th>

              <th className="px-4 py-3 hidden xl:table-cell">
                Description
              </th>

              <th className="px-4 py-3">
                MRP
              </th>

              <th className="px-4 py-3">
                Price
              </th>

              <th className="px-4 py-3 text-center">
                Stock
              </th>
            </tr>
          </thead>

          <tbody className="text-slate-700">
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-3">
                  <div className="flex gap-3 items-center">
                    <Image
                      width={50}
                      height={50}
                      className="rounded shadow object-cover"
                      src={
                        product.images?.[0] ||
                        "/placeholder.png"
                      }
                      alt={product.name}
                    />

                    <div className="font-medium">
                      {product.name}
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3">
                  {product.category}
                </td>

                <td className="px-4 py-3 hidden lg:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {product.sizes?.length ? (
                      product.sizes.map((size) => (
                        <span
                          key={size}
                          className="px-2 py-1 text-xs border rounded bg-slate-100"
                        >
                          {size}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-400">
                        -
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-4 py-3 hidden lg:table-cell">
                  <div className="flex flex-wrap gap-2">
                    {product.colors?.length ? (
                      product.colors.map((color) => (
                        <div
                          key={color}
                          title={color}
                          className="w-6 h-6 rounded-full border border-slate-300"
                          style={{
                            backgroundColor:
                              colorMap[color] ||
                              "#e5e7eb",
                          }}
                        />
                      ))
                    ) : (
                      <span className="text-slate-400">
                        -
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-4 py-3 max-w-xs hidden xl:table-cell">
                  <p className="truncate">
                    {product.description}
                  </p>
                </td>

                <td className="px-4 py-3">
                  {currency}{" "}
                  {product.mrp?.toLocaleString()}
                </td>

                <td className="px-4 py-3 font-medium">
                  {currency}{" "}
                  {product.price?.toLocaleString()}
                </td>

                <td className="px-4 py-3 text-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={product.inStock}
                      onChange={() =>
                        toast.promise(
                          toggleStock(product.id),
                          {
                            loading:
                              "Updating stock...",
                          }
                        )
                      }
                    />

                    <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200"></div>

                    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-5"></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}