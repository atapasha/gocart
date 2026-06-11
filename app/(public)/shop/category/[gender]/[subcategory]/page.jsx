'use client'

import ProductCard from "@/components/ProductCard";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function CategoryPage() {
  const { gender, subcategory } = useParams();

  const products = useSelector((state) => state.product.list);

  const filteredProducts = products.filter(
    (product) =>
      product.gender === gender &&
      product.category === subcategory
  );

  return (
    <div className="max-w-7xl mx-auto py-10">
      <h1 className="text-2xl mb-6">
        {gender} / {subcategory}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}