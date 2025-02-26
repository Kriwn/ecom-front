import { LoaderFunction, redirect, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSession } from "~/utils/session";

export const meta: MetaFunction = () => {
  return [
    { title: "Ecom App" },
    { name: "description", content: "Ecom!" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (session) {
    return redirect("/product");
  }
  else{
    return redirect("/login");
  }

};

export default function Index() {
  const { user } = useLoaderData<typeof loader>();

  return <div>Welcome, {user.name}!</div>;
}
