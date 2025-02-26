import { LoaderFunction, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import { update } from "~/utils/auth";
import { getSession } from "~/utils/session";

export async function action({ request }: any) {
	const session = await getSession(request.headers.get("Cookie"));
	const uuid = session.get("userId");
	if (!uuid) {
	  return redirect("/login");
	}

	const formData = await request.formData();
	const username = formData.get("username");
	const email = formData.get("email");
	const firstName = formData.get("First Name");
	const surname = formData.get("Surname");
	const tel = formData.get("Tel");

	if (!username || !email || !firstName || !surname || !tel) {
		return { error: "Please fill in all fields" };
	}

	const res = await update(uuid, username, email, firstName, surname, tel);
	if (res.ok) {
		return {error: "User updated"};
	}
	return { error: res.error };
}

export const loader: LoaderFunction = async ({ request }) => {
	const session = await getSession(request.headers.get("Cookie"));

	if (!session) {
		return redirect("/login");
	}

	const uuid = session.get("userId");
	try {
		const response = await fetch("http://localhost:3000/api/user/getById", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ uuid }),
		});

		if (!response.ok) {
			throw new Error("Failed to fetch user");
		}
		const user = await response.json();
		return Response.json({ user });
	} catch (error) {
		return Response.json({ error: "Failed to load user" }, { status: 500 });
	}
};


export default function Update() {
	const actionData = useActionData<{ error?: string }>();
	const userData = useLoaderData<typeof loader>();
	return (
		<div className="flex h-screen items-center justify-center">
			<div className="flex flex-col justify-center items-center w-full max-w-md bg-white p-8 rounded-lg shadow-md">
				<h1 className="text-2xl font-bold text-center text-black mg-[10px]"> Change Profile </h1>
				<Form method="post" className="space-y-4 mt-6 flex flex-col  bg-gray">
					<label>
						<input type="email" className="pl-2 bg-gray-100" name="email" defaultValue={userData?.user?.email} required />
					</label>
					<label>
						<input type="text" className="pl-2 bg-gray-100" name="username" defaultValue={userData?.user?.username} required />
					</label>
					<label>
						<input type="text" className="pl-2 bg-gray-100" name="First Name" defaultValue={userData?.user?.name} required />
					</label>
					<label>
						<input type="text" className="pl-2 bg-gray-100" name="Surname" defaultValue={userData?.user?.surname} required />
					</label>
					<label>
						<input type="text" className="pl-2 bg-gray-100" name="Tel" defaultValue={userData?.user?.tel} required />
					</label>
					{actionData?.error && <p className="text-red-500 text-sm">{actionData.error}</p>}
					<div className="flex justify-center w-full">
						<button type="submit" className="w-[60px] px-[2px] bg-black bg-green-500 rounded-lg shadow-ml">Change</button>
					</div>
				</Form>
			</div>
		</div>
	);
}
