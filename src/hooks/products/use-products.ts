import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "#/lib/services/products";

export const useProducts = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["products", "all"],
		queryFn: getAllProducts,
	});

	return { data, isLoading, isError };
};
