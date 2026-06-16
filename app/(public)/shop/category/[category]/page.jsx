import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/prisma";

export default async function CategoryPage({ params }) {

  const products = await prisma.product.findMany({
    where: {
      category: params.category,
      inStock: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="max-w-7xl mx-auto py-10">

      <h1 className="text-3xl font-bold mb-8">
        {params.category}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </div>
  );
}