import { useQuery } from "@tanstack/react-query";
import { getMaxProductPrice, getProductBrands } from "#/lib/services/products";

export const useProductFiltersMeta = () => {
	const brandsQuery = useQuery({
		queryKey: ["products", "brands"],
		queryFn: getProductBrands,
		staleTime: 1000 * 60 * 5,
	});

	const maxPriceQuery = useQuery({
		queryKey: ["products", "maxPrice"],
		queryFn: getMaxProductPrice,
		staleTime: 1000 * 60 * 5,
	});

	return {
		brands: brandsQuery.data ?? [],
		maxPrice: maxPriceQuery.data ?? 5000,
		isLoading: brandsQuery.isLoading || maxPriceQuery.isLoading,
	};
};
