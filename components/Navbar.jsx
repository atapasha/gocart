"use client";
import { Package2Icon, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

import { useUser, useClerk, UserButton } from "@clerk/nextjs";
const Navbar = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const cartCount = useSelector((state) => state.cart.total);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/shop?search=${search}`);
  };
  const categories = {
    women: [
      { name: "KADIN JEAN PANTALON", slug: "kadin-jean-pantalon" },
      { name: "KADIN JEAN TULUM", slug: "kadin-jean-tulum" },
      { name: "KADIN JEAN TAKIM", slug: "kadin-jean-takim" },
      { name: "KADIN TAKIM", slug: "kadin-takim" },
      { name: "KADIN ELBISE", slug: "kadin-elbise" },
      { name: "KADIN KROP", slug: "kadin-krop" },
      { name: "SAPKA", slug: "sapka" },
      { name: "ALT GIYIM", slug: "alt-giyim" },
      { name: "UST GIYIM", slug: "ust-giyim" },
    ],

    men: [
      { name: "ERKEK TERLIK", slug: "terlik" },
      { name: "ERKEK DENIZ SHORTU", slug: "deniz-sortu" },
      { name: "ERKEK SHORT", slug: "short" },
      { name: "ERKEK BOXER / CORAP", slug: "boxer-corap" },
      { name: "ERKEK TSHIRT", slug: "tshirt" },
      { name: "ERKEK PANTALON", slug: "pantalon" },
      { name: "ERKEK ESOFMAN", slug: "esofman" },
      { name: "SAPKA", slug: "sapka" },
      { name: "ATLET", slug: "atlet" },
    ],

    accessories: [
      { name: "KOLYE", slug: "kolye" },
      { name: "KUPE", slug: "kupe" },
      { name: "BILEKLIK", slug: "bileklik" },
      { name: "PABAND", slug: "paband" },
      { name: "SET GARDANBAND VE DASTBAND", slug: "set-gardanband-dastband" },
      { name: "ARAGHGIR", slug: "araghgir" },
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
  7stylefashion
</span>            <span className="text-green-600 text-5xl leading-0">.</span>
            <p className="absolute text-xs font-semibold -top-1 -right-8 px-3 p-0.5 rounded-full flex items-center gap-2 text-white bg-green-500">
              plus
            </p>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600">
            <Link href="/">Home</Link>
            <div className="relative group">
              <Link
                href="/shop"
                className="font-medium text-slate-700 hover:text-green-600 transition-all duration-300"
              >
                Shop
              </Link>

              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 grid grid-cols-3 gap-16 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] rounded-3xl p-10 min-w-[950px] border border-slate-100 z-50">
                {/* Women */}
                <div>
                  <h3 className="uppercase tracking-[3px] text-xs font-bold text-pink-500 mb-5 pb-3 border-b border-pink-100">
                    Women
                  </h3>

                  <div className="flex flex-col gap-2">
                    {categories.women.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/shop/category/women/${item.slug}`}
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
                    Men
                  </h3>

                  <div className="flex flex-col gap-2">
                    {categories.men.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/shop/category/men/${item.slug}`}
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
                    Accessories
                  </h3>

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
            <Link href="/">About</Link>
            <Link href="/">Contact</Link>
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
              Cart
              <button className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full">
                {cartCount}
              </button>
            </Link>
            {!user ? (
              <button
                onClick={openSignIn}
                className="px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
              >
                Login
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/orders"
                  className="text-slate-600 hover:text-green-600 transition"
                >
                  Orders
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
                Login
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
