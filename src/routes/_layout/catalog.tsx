import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Filters } from "#/components/catalog/filters";
import { ProductsCatalog } from "#/components/catalog/products-catalog";
import { useProductsFilter } from "#/hooks/products/use-products-filter";

export const Route = createFileRoute("/_layout/catalog")({
	validateSearch: z.object({
		search: z.string().optional().catch(""),
		categoryIds: z.array(z.string()).optional().catch([]),
		brands: z.array(z.string()).optional().catch([]),
		minPrice: z.number().nullable().optional().catch(null),
		maxPrice: z.number().nullable().optional().catch(null),
		onlyOnSale: z.boolean().optional().catch(false),
		sortBy: z
			.enum(["price_asc", "price_desc", "newest", "name_asc"])
			.optional()
			.catch("newest"),
	}),
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
			<main className="custom-scrollbar">
				<ProductsCatalog filters={filters} />
			</main>
		</div>
	);
}
