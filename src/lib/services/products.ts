export const getAllProducts = async () => {
	const res = await fetch("https://api.escuelajs.co/api/v1/products");
	if (!res.ok) throw new Error("Error al obtener productos");
	return res.json();
};
