import { initialFilters } from "#/hooks/products/use-products-filter";
import { getRandom } from "#/lib/utils";
import { useProducts } from "./use-products";

export const useFeaturedProducts = () => {
	const { data: products, isLoading, isError } = useProducts(initialFilters);

	const featuredProducts = products ? getRandom(products, 5) : [];

	return { featuredProducts, isLoading, isError };
};
