import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "#/lib/services/products";
import type { FilterState } from "./use-products-filter";

export const useProducts = (filters: FilterState) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["products", filters],
		queryFn: () => getAllProducts(filters),
		staleTime: 1000 * 30,
	});

	return { data: data ?? [], isLoading, isError };
};
