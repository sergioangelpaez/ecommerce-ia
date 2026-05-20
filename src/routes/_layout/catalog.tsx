import { createFileRoute } from "@tanstack/react-router";
import { Filters } from "#/components/catalog/filters";
import { ProductsCatalog } from "#/components/catalog/products-catalog";
import { useProductsFilter } from "#/hooks/products/use-products-filter";

export const Route = createFileRoute("/_layout/catalog")({
	component: RouteComponent,
});

function RouteComponent() {
	const { filters, setFilter, resetFilters } = useProductsFilter();

	return (
		<div className="grid grid-cols-[auto_1fr] gap-8 items-start">
			<Filters
				filters={filters}
				setFilter={setFilter}
				resetFilters={resetFilters}
			/>
			<main className="pr-2 custom-scrollbar">
				<ProductsCatalog filters={filters} />
			</main>
		</div>
	);
}
