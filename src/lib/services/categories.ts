export const getAllCategories = async (): Promise<CategoryApiResponse> => {
	const res = await fetch(
		"https://fakestoreapiserver.reactbd.org/api/categories",
	);
	if (!res.ok) throw new Error("Error al obtener categorias");
	return res.json();
};
