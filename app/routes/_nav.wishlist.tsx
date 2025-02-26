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
    const response = await fetch("http://localhost:3000/api/user/getWithLiked", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uuid }),
    });

    if (!response.ok) throw new Error("Failed to fetch liked products");
    const likedProducts = await response.json();

    return Response.json({ products: likedProducts ,uuid});
  } catch (error) {
    return Response.json({ error: "Failed to load liked products" }, { status: 500 });
  }
};

export default function LikedProducts() {
  const { products, error } = useLoaderData<typeof loader>();

  if (error) {
    return <p className="text-red-500 text-center">Error loading liked products.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.length > 0 ? (
        products.map((product: any) => (
          <ProductCard
            key={product.id}
            uuid={product.id}
			product_id={product.id}
            name={product.name}
            price={product.price}
            amount={product.amount}
            imageUrl={product.image_url}
            description={product.description}
            isLiked={true}
          />
        ))
      ) : (
        <p className="text-gray-500 text-center col-span-3">No liked products yet.</p>
      )}
    </div>
  );
}
