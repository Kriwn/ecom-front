import { ActionFunction } from "@remix-run/node";
import { Form, Link, Outlet, redirect } from "@remix-run/react";
import { destroySession, getSession } from "~/utils/session";

export default function Dashboard() {
	return (
		<div>
			<div className="flex flex-row justify-evenly sticky top-0 bg-blue-500 p-4">
				<Link
					to="/product"
					className="text-white hover:text-yellow-300 focus:text-yellow-400 outline-none"
				>
					Product
				</Link>
				<Link
					to="/wishlist"
					className="text-white hover:text-yellow-300 focus:text-yellow-400 outline-none"
				>
					Wishlist
				</Link>
				<Link
					to="/setting"
					className="text-white hover:text-yellow-300 focus:text-yellow-400 outline-none"
				>
					Setting
				</Link>
				<Form method="post" action="/api/logout">
				<button className="text-white hover:text-red-400">
					Logout
				</button>
				</Form>
			</div>
			<Outlet />
		</div>
	);
}
