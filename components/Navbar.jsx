"use client";
import { Package2Icon, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

import { useUser, useClerk, UserButton ,isLoaded } from "@clerk/nextjs";
const Navbar = () => {
  const { user } = useUser();
  console.log("useeeeeeeeeeeeeeeeer",user)
  const { openSignIn } = useClerk();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const cartCount = useSelector((state) => state.cart.total);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/shop/category/?search=${search}`);
  };
const categories = {
  women: [
    { name: "Kadın Jean Pantolon", slug: "kadin-jean-pantalon" },
    { name: "Kadın Jean Tulum", slug: "kadin-jean-tulum" },
    { name: "Kadın Jean Takım", slug: "kadin-jean-takim" },
    { name: "Kadın Takım", slug: "kadin-takim" },
    { name: "Kadın Elbise", slug: "kadin-elbise" },
    { name: "Kadın Crop", slug: "kadin-krop" },
    { name: "Şapka", slug: "sapka" },
    { name: "Alt Giyim", slug: "alt-giyim" },
    { name: "Üst Giyim", slug: "ust-giyim" },
  ],

  men: [
    { name: "Erkek Terlik", slug: "erkek-terlik" },
    { name: "Erkek Deniz Şortu", slug: "deniz-sortu" },
    { name: "Erkek Şort", slug: "short" },
    { name: "Erkek Boxer / Çorap", slug: "boxer-corap" },
    { name: "Erkek Tişört", slug: "tshirt" },
    { name: "Erkek Pantolon", slug: "pantalon" },
    { name: "Erkek Eşofman", slug: "esofman" },
    { name: "Şapka", slug: "sapka" },
    { name: "Atlet", slug: "atlet" },
  ],

  accessories: [
    { name: "Kolye", slug: "kolye" },
    { name: "Küpe", slug: "kupe" },
    { name: "Bileklik", slug: "bileklik" },
    { name: "Pa Bandı", slug: "paband" },
    { name: "Gerdanlık ve Bileklik Seti", slug: "set-gardanband-dastband" },
    { name: "Ter Bandı", slug: "araghgir" },
  ],
};

  return (
    <nav className="relative bg-white">
      <div className="mx-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto py-4  transition-all">
          <Link
            href="/"
            className="relative text-4xl font-semibold text-slate-700"
          >
<span className="bg-gray-200 px-3 py-1 rounded-md font-bold text-gray-800">
  Honey Maral
</span>            <span className="text-green-600 text-5xl leading-0">.</span>
            <p className="absolute text-xs font-semibold -top-1 -right-8 px-3 p-0.5 rounded-full flex items-center gap-2 text-white bg-green-500">
              plus
            </p>
          </Link>

          {/* Desktop Menu */}

 
          <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600">
<Link href="/">خانه</Link>            <div className="relative group">
              <Link
                href="/shop"
                className="font-medium text-slate-700 hover:text-green-600 transition-all duration-300"
              >
                فروشگاه 
              </Link>

              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 grid grid-cols-3 gap-16 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] rounded-3xl p-10 min-w-[950px] border border-slate-100 z-50">
                {/* Women */}
                <div>
                  <h3 className="uppercase tracking-[3px] text-xs font-bold text-pink-500 mb-5 pb-3 border-b border-pink-100">
                    Kadın
                  </h3>

                  <div className="flex flex-col gap-2">
                    {categories.women.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/shop/category/${item.slug}`}
                        className="text-sm py-1 text-slate-600 hover:text-pink-500 hover:translate-x-2 transition-all duration-300"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Men */}
                <div>
                  <h3 className="uppercase tracking-[3px] text-xs font-bold text-blue-500 mb-5 pb-3 border-b border-blue-100">
                    Erkek
                  </h3>

                  <div className="flex flex-col gap-2">
                    {categories.men.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/shop/category/${item.slug}`}
                        className="text-sm py-1 text-slate-600 hover:text-blue-500 hover:translate-x-2 transition-all duration-300"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Accessories */}
                <div>
                  <h3 className="uppercase tracking-[3px] text-xs font-bold text-purple-500 mb-5 pb-3 border-b border-purple-100">
Aksesuarlar                  </h3>

                  <div className="flex flex-col gap-2">
                    {categories.accessories.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/shop/category/accessories/${item.slug}`}
                        className="text-sm py-1 text-slate-600 hover:text-purple-500 hover:translate-x-2 transition-all duration-300"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>{" "}
            <Link href="/">درباره ما</Link>
            <Link href="/">تماس با ما</Link> 
            <form
              onSubmit={handleSearch}
              className="hidden xl:flex items-center w-xs text-sm gap-2 bg-slate-100 px-4 py-3 rounded-full"
            >
              <Search size={18} className="text-slate-600" />
              <input
                className="w-full bg-transparent outline-none placeholder-slate-600"
                type="text"
                placeholder="Search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                required
              />
            </form>
            <Link
              href="/cart"
              className="relative flex items-center gap-2 text-slate-600"
            >
              <ShoppingCart size={18} />
              خرید
              <button className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full">
                {cartCount}
              </button>
            </Link>
            {!user ? (
              <button
                onClick={openSignIn}
                className="px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
              >ورود              </button>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/orders"
                  className="text-slate-600 hover:text-green-600 transition"
                >
                  سفارش ها
                </Link>

                <UserButton />
              </div>
            )}
          </div>

          {/* Mobile User Button  */}
          <div className="sm:hidden">
            {user ? (
              <div>
                {" "}
                <div className="flex items-center gap-3">
                  <Link href="/cart">
                    <ShoppingCart size={20} />
                  </Link>

                  <Link href="/orders">
                    <Package2Icon size={20} />
                  </Link>

                  <UserButton />
                </div>
                <div className="flex items-center gap-3">
                  <Link href="/cart">
                    <ShoppingCart size={20} />
                  </Link>

                  <Link href="/orders">
                    <Package2Icon size={20} />
                  </Link>

                  <UserButton />
                </div>
              </div>
            ) : (
              <button
                onClick={openSignIn}
                className="px-7 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-sm transition text-white rounded-full"
              >
                وارد شوید
              </button>
            )}
          </div>
        </div>
      </div>
      <hr className="border-gray-300" />
    </nav>
  );
};

export default Navbar;
