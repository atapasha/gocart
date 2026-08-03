"use client";

import { assets } from "@/assets/assets";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function StoreAddProduct() {
  const categories = [
    "kadin-jean-pantalon",
    "kadin-jean-tulum",
    "kadin-jean-takim",
    "kadin-takim",
    "kadin-elbise",
    "kadin-krop",
    "خوراکی",
    "alt-giyim",
    "ust-giyim",
    "erkek-terlik",
    "deniz-sortu",
    "short",
    "boxer-corap",
    "tshirt",
    "pantalon",
    "esofman",
    "atlet",
    "kolye",
    "kupe",
    "bileklik",
    "paband",
    "set-gardanband-dastband",
    "araghgir",
  ];

  const sizesList = [
    "standard",
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
  ];

  const colorsList = [
    "Black",
    "White",
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Orange",
    "Purple",
    "Pink",
    "Brown",
    "Gray",
    "Navy",
    "Beige",
    "Cream",
    "Khaki",
    "Gold",
    "Silver",
  ];

  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [productInfo, setProductInfo] = useState({
    name: "",
    description: "",
    mrp: 0,
    price: 0,
    category: "",
    sizes: [],
    colors: [],
  });

  const [loading, setLoading] = useState(false);

  const { getToken } = useAuth();

  const onChangeHandler = (e) => {
    setProductInfo({
      ...productInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSizeChange = (size) => {
    if (productInfo.sizes.includes(size)) {
      setProductInfo({
        ...productInfo,
        sizes: productInfo.sizes.filter((s) => s !== size),
      });
    } else {
      setProductInfo({
        ...productInfo,
        sizes: [...productInfo.sizes, size],
      });
    }
  };

  const handleColorChange = (color) => {
    if (productInfo.colors.includes(color)) {
      setProductInfo({
        ...productInfo,
        colors: productInfo.colors.filter((c) => c !== color),
      });
    } else {
      setProductInfo({
        ...productInfo,
        colors: [...productInfo.colors, color],
      });
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!images[1] && !images[2] && !images[3] && !images[4]) {
        return toast.error("Please upload at least one image");
      }

      setLoading(true);

      const formData = new FormData();

      formData.append("name", productInfo.name);
      formData.append("description", productInfo.description);
      formData.append("mrp", productInfo.mrp);
      formData.append("price", productInfo.price);
      formData.append("category", productInfo.category);

      formData.append("sizes", JSON.stringify(productInfo.sizes));

      formData.append("colors", JSON.stringify(productInfo.colors));

      Object.keys(images).forEach((key) => {
        if (images[key]) {
          formData.append("images", images[key]);
        }
      });

      const token = await getToken();

      const { data } = await axios.post("/api/store/product", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(data.message);
      //reset form
      setProductInfo({
        name: "",
        description: "",
        mrp: 0,
        price: 0,
        category: "",
        sizes: [],
        colors: [],
      });
      //reset  images
      setImages({
        1: null,
        2: null,
        3: null,
        4: null,
      });
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) =>
        toast.promise(onSubmitHandler(e), { loading: "Adding Product..." })
      }
      className="text-slate-500 mb-28"
    >
      <h1 className="text-2xl">
        Add New <span className="text-slate-800 font-medium">Products</span>
      </h1>

      <p className="mt-7">Product Images</p>

      <div className="flex gap-3 mt-4">
        {Object.keys(images).map((key) => (
          <label key={key} htmlFor={`images${key}`}>
            <Image
              width={300}
              height={300}
              className="h-15 w-auto border border-slate-200 rounded cursor-pointer"
              src={
                images[key]
                  ? URL.createObjectURL(images[key])
                  : assets.upload_area
              }
              alt=""
            />

            <input
              type="file"
              accept="image/*"
              id={`images${key}`}
              hidden
              onChange={(e) =>
                setImages({
                  ...images,
                  [key]: e.target.files?.[0] || null,
                })
              }
            />
          </label>
        ))}
      </div>

      <label className="flex flex-col gap-2 my-6">
        Name
        <input
          type="text"
          name="name"
          value={productInfo.name}
          onChange={onChangeHandler}
          placeholder="Enter product name"
          className="w-full max-w-sm p-2 px-4 outline-none border border-slate-200 rounded"
          required
        />
      </label>

      <label className="flex flex-col gap-2 my-6">
        Description
        <textarea
          name="description"
          value={productInfo.description}
          onChange={onChangeHandler}
          rows={5}
          placeholder="Enter product description"
          className="w-full max-w-sm p-2 px-4 outline-none border border-slate-200 rounded resize-none"
          required
        />
      </label>

      <div className="flex gap-5">
        <label className="flex flex-col gap-2">
          Actual Price (تومان)
          <input
            type="number"
            name="mrp"
            value={productInfo.mrp}
            onChange={onChangeHandler}
            className="w-full max-w-45 p-2 px-4 outline-none border border-slate-200 rounded"
            required
          />
        </label>

        <label className="flex flex-col gap-2">
          Offer Price (تومان)
          <input
            type="number" 
            name="price"
            value={productInfo.price}
            onChange={onChangeHandler}
            className="w-full max-w-45 p-2 px-4 outline-none border border-slate-200 rounded"
            required
          />
        </label>
      </div>

      <select
        value={productInfo.category}
        onChange={(e) =>
          setProductInfo({
            ...productInfo,
            category: e.target.value,
          })
        }
        className="w-full max-w-sm p-2 px-4 my-6 outline-none border border-slate-200 rounded"
        required
      >
        <option value="">Select a category</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Sizes */}

      <div className="my-6">
        <p className="font-medium mb-3">Select Sizes</p>

        <div className="flex flex-wrap gap-2 max-w-xl">
          {sizesList.map((size) => (
            <button
              type="button"
              key={size}
              onClick={() => handleSizeChange(size)}
              className={`px-4 py-2 border rounded transition ${
                productInfo.sizes.includes(size)
                  ? "bg-slate-800 text-white"
                  : "bg-white text-slate-700"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}

      <div className="my-6">
        <p className="font-medium mb-3">Select Colors</p>

        <div className="flex flex-wrap gap-2 max-w-xl">
          {colorsList.map((color) => (
            <button
              type="button"
              key={color}
              onClick={() => handleColorChange(color)}
              className={`px-4 py-2 border rounded transition ${
                productInfo.colors.includes(color)
                  ? "bg-slate-800 text-white"
                  : "bg-white text-slate-700"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <button
        disabled={loading}
        className="bg-slate-800 text-white px-6 mt-7 py-2 hover:bg-slate-900 rounded transition"
      >
        Add Product
      </button>
    </form>
  );
}
