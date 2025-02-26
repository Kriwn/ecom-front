import { redirect } from "@remix-run/node";
import { LikeApi, unLikeApi } from "~/utils/like";
import { getSession } from "~/utils/session";


export const action = async ({ request }: { request: Request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session) {
    return redirect("/login");
  }
  const user_id = session.get("userId");
  const formData = await request.formData();
  const product_id = formData.get("product_id") as string;
  const action = formData.get("action") as string;

  if (!product_id) {
    return { error: "Please fill in all fields" };
  }

  console.log("uuid", user_id);
  console.log("product_id", product_id);
  console.log("action", action);

  try {
    let response;

    if (action === "like") {
      response = await LikeApi(user_id, parseInt(product_id));
    } else if (action === "unlike") {
      response = await unLikeApi(user_id, parseInt(product_id));
    } else {
      return  Response.json({ error: "Invalid action" }, { status: 400 });
    }

    if (!response.ok) {
      return Response.json({ error: "Failed to update like status" }, { status: response.status });
    }
    return Response.json({ success: "Like status updated" });
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};
