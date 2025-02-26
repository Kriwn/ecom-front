import { Form, Link, redirect, useActionData, useFetcher} from "@remix-run/react";
import { register } from "~/utils/auth";

interface fetcherProps {
  error? : string;
}

export async function action({ request }: any) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  const email = formData.get("email");
  const firstName = formData.get("First Name");
  const surname = formData.get("Surname");
  const tel = formData.get("Tel");

  if (!username || !password || !email || !firstName || !surname || !tel) {
    return { error: "Please fill in all fields" };
  }
  const res = await register(username, password, email, firstName, surname, tel);
  if (!res.error) {
    return redirect("/login");
  }
  return res;
}

export default function Register() {
  const fetcher = useFetcher<fetcherProps>();

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-purple-700">
      <div className="flex flex-col justify-center items-center w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-row justify-start w-full">
        <Link to="/login" className="text-blue-500 hover:underline items-start mr-[80px]">&larr; Back</Link>
        <h1 className="text-2xl font-bold text-center text-black mg-[10px]"> Register </h1>
        </div>
        <fetcher.Form method="post" className="space-y-4 mt-6 flex flex-col  bg-gray">
          <label>
            <input type="email" className="pl-2 bg-gray-100" name="email" placeholder="Email" required />
          </label>
          <label>
            <input type="text" className="pl-2 bg-gray-100" name="username" placeholder="Username" required />
          </label>
          <label>
            <input type="password" className="pl-2 bg-gray-100" name="password" placeholder="Password" required />
          </label>
          <label>
            <input type="text" className="pl-2 bg-gray-100" name="First Name" placeholder="First Name" required />
          </label>
          <label>
            <input type="text" className="pl-2 bg-gray-100" name="Surname" placeholder="Surname" required />
          </label>
          <label>
            <input type="text" className="pl-2 bg-gray-100" name="Tel" placeholder="Phone" required />
          </label>
          {fetcher.data?.error && <p className="text-red-500 text-sm">{fetcher.data?.error}</p>}
          <div className="flex justify-center w-full">
            <button type="submit" className="w-[60px] px-[2px] bg-black bg-green-500 rounded-lg shadow-ml">Register</button>
          </div>
        </fetcher.Form>
      </div>
    </div>
  );
}
