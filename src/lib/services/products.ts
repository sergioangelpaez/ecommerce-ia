export const getAllProducts = async (): Promise<ProductApiResponse> => {
	const res = await fetch(
		"https://fakestoreapiserver.reactbd.org/api/products",
	);
	if (!res.ok) throw new Error("Error al obtener productos");
	return res.json();
};
