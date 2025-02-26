import { j } from "node_modules/vite/dist/node/types.d-aGj9QkWt";

export async function login(username: string, password: string) {
	const response = await fetch("http://localhost:3000/api/user/login", {
	  method: "POST",
	  headers: { "Content-Type": "application/json" },
	  body: JSON.stringify({ username, password }),
	});

	if (!response.ok) return null;

	return await response.json();
}

export async function register(username: string, password: string, email: string, name: string, surname: string, tel: string) {
	const response = await fetch("http://localhost:3000/api/user/register", {
	  method: "POST",
	  headers: { "Content-Type": "application/json" },
	  body: JSON.stringify({ username, password, email, name, surname, tel }),
	});
	const json = await response.json();
	return json;
}


export async function update(uuid: string,username: string, email: string, name: string, surname: string, tel: string) {
	const response = await fetch("http://localhost:3000/api/user/update", {
	  method: "PUT",
	  headers: { "Content-Type": "application/json" },
	  body: JSON.stringify({uuid, username,  email, name, surname, tel }),
	});
	const json = await response.json();
	return json;
}
