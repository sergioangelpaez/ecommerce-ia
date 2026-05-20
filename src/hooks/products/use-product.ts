import { useQuery } from "@tanstack/react-query";
import { getProductById } from "#/lib/services/products";

export const useProduct = (productId: string) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["products", productId],
		queryFn: () => getProductById(productId),
	});

	return { data, isLoading, isError };
};
