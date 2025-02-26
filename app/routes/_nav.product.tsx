import { type LoaderFunction, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ProductCard from "~/components/ProductCard";
import { getSession } from "~/utils/session";


export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const uuid = session.get("userId");
  if (!uuid) {
    return redirect("/login");
  }

  try {
    const productResponse = await fetch("http://localhost:3000/api/product/getAll");
    if (!productResponse.ok) throw new Error("Failed to fetch products");
    const allProducts = await productResponse.json();

    const likedResponse = await fetch("http://localhost:3000/api/user/getWithLiked", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uuid }),
    });
    if (!likedResponse.ok) throw new Error("Failed to fetch liked products");
    const likedProducts = await likedResponse.json();

    const likedProductIds = new Set(likedProducts.map((product: any) => product.id));

    const productsWithLikes = allProducts.map((product: any) => ({
      ...product,
      isLiked: likedProductIds.has(product.id),
    }));

    return Response.json({ products: productsWithLikes , uuid});
  } catch (error) {
    return Response.json({ error: "Failed to load products" }, { status: 500 });
  }
};

export default function ProductList() {
  const { products, error } = useLoaderData<typeof loader>();
  if (error) {
    return <p className="text-red-500 text-center">Error loading products.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.map((product: any) => (
        <ProductCard
          key={product.id}
          uuid={product.uuid}
          product_id={product.id}
          name={product.name}
          price={product.price}
          amount={product.amount}
          imageUrl={product.image_url}
          description={product.description}
          isLiked={product.isLiked}
        />
      ))}
    </div>
  );
}
