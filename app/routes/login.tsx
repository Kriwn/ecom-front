import { ActionFunction } from "@remix-run/node";
import { Form, Link, redirect, useActionData, useFetcher } from "@remix-run/react";
import { login } from "~/utils/auth";
import { commitSession, getSession } from "~/utils/session";

interface fetcherProps {
  error? : string;
}


export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Please fill in all fields" };
  }

  const user = await login(username, password);
  if (!user) {
    return { error: "Invalid username or password" };
  }

  const session = await getSession(request.headers.get("Cookie"));
  session.set("userId", user.uuid);

  return redirect("/product", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}


export default function Login() {
  const fetcher = useFetcher<fetcherProps>();
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-purple-700">
      <div className="flex flex-col justify-center items-center w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-black mt-[5px]"> Welcome to Ecom</h1>
        <fetcher.Form method="post" className="space-y-4 mt-3 flex flex-col  bg-gray">
          <label>
            <input type="text" className="pl-2 bg-gray-100" name="username" placeholder="Username" required />
          </label>
          <label>
            <input type="password" className="pl-2 bg-gray-100" name="password" placeholder="Password" required />
          </label>
          {fetcher.data?.error && <p className="text-red-500 text-sm">{fetcher.data?.error}</p>}
          <div className="flex justify-center w-full">
            <button type="submit" className="w-[60px] px-[2px] bg-black bg-green-500 rounded-lg shadow-ml">Login</button>
          </div>
        </fetcher.Form>
        <Link to="/register" className="mt-1 text-black" >Register</Link>
      </div>
    </div>
  );
}
