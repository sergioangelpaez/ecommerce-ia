import { useProducts } from "#/hooks/products/use-products";
import type { FilterState } from "#/hooks/products/use-products-filter";
import type { Tables } from "#/types/database.types";
import { FetchErrorCard } from "../shared/errors/fetch-error";
import { ProductCard } from "../shared/product-card";
import { ProductCardSkeleton } from "../shared/skeletons/product-card-skeleton";

interface ProductsCatalogProps {
	filters: FilterState;
}

export const ProductsCatalog = ({ filters }: ProductsCatalogProps) => {
	const { data: products, isLoading, isError } = useProducts(filters);

	if (isLoading) {
		const skeletons = Array.from({ length: 12 }, () => ({
			id: crypto.randomUUID(),
		}));

		return (
			<div className="grid grid-cols-3 gap-5">
				{skeletons.map((item) => (
					<ProductCardSkeleton key={item.id} />
				))}
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex flex-col gap-5">
				<FetchErrorCard />
			</div>
		);
	}

	if (!products || products.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-12 text-center">
				<p className="text-lg font-medium text-foreground">
					No se encontraron productos
				</p>
				<p className="text-sm text-muted-foreground mt-1">
					Intenta cambiando los criterios de tus filtros de búsqueda.
				</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-2 xl:grid-cols-3 gap-5">
			{products.map((product) => (
				<ProductCard product={product as Tables<"products">} key={product.id} />
			))}
		</div>
	);
};
