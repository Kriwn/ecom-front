export async function LikeApi(user_id: string, product_id: number) {
	const response = await fetch("http://localhost:3000/api/liked/like", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ user_id, product_id }),
	});
	const json = await response.json();
	return json;
}

export async function unLikeApi(user_id: string, product_id: number) {
	const response = await fetch("http://localhost:3000/api/liked/like", {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ user_id, product_id }),
	});
	const json = await response.json();
	return json;
}
