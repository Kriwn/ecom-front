import { Heart } from "lucide-react";
import { useFetcher } from "@remix-run/react";

interface ProductCardProps {
  uuid: string;
  product_id: number;
  name: string;
  price: number;
  amount: number;
  imageUrl: string;
  description: string;
  isLiked: boolean;
}


const ProductCard: React.FC<ProductCardProps> = ({ uuid, product_id, name, price, imageUrl, amount, description, isLiked }) => {
  const fetcher = useFetcher();
  const liked = fetcher.state === "submitting" ? !isLiked : isLiked; // Optimistic update

  return (
    <div className="border rounded-lg shadow-md p-4">
      <img src={imageUrl} alt={name} className="w-full h-48 object-contain rounded-md" />
      <div className="flex flex-row justify-between">
        <div className="mt-4">
          <h2 className="text-lg font-bold">{name}</h2>
          <p className="text-gray-700">{price.toFixed(2)} ฿</p>
          <p className="text-gray-500">Stock: {amount}</p>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <div>
          <fetcher.Form method="POST" action="/api/liked">
            <input type="hidden" name="user_id" value={uuid} />
            <input type="hidden" name="product_id" value={product_id} />
            <input type="hidden" name="action" value={liked ? "unlike" : "like"} />
            <button type="submit">
              <Heart className="mt-[5px]" color="pink" fill={liked ? "pink" : "none"} />
            </button>
          </fetcher.Form>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
