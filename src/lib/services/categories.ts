export const getAllCategories = async (): Promise<Category[]> => {
	const res = await fetch("https://api.escuelajs.co/api/v1/categories");
	if (!res.ok) throw new Error("Error al obtener categorias");
	return res.json();
};
