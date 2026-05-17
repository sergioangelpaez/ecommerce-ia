import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "#/lib/services/products";

export const useProducts = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["get-all-products"],
		queryFn: async () => await getAllProducts(),
	});

	return { data, isLoading, isError };
};
