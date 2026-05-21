import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback } from "react";
import { Route } from "#/routes/_layout/catalog";

export interface FilterState {
	search: string;
	categoryIds: string[];
	brands: string[];
	minPrice: number | null;
	maxPrice: number | null;
	onlyOnSale: boolean;
	sortBy: "price_asc" | "price_desc" | "newest" | "name_asc";
}

export const initialFilters: FilterState = {
	search: "",
	categoryIds: [],
	brands: [],
	minPrice: null,
	maxPrice: null,
	onlyOnSale: false,
	sortBy: "newest",
};

export const useProductsFilter = () => {
	const navigate = Route.useNavigate();
	const currentSearch = useSearch({ from: "/_layout/catalog" });

	const filters = { ...initialFilters, ...currentSearch } as FilterState;

	const setFilter = useCallback(
		<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
			navigate({
				search: (prev) => ({
					...prev,
					[key]: value,
				}),
			});
		},
		[navigate],
	);

	const resetFilters = useCallback(() => {
		navigate({
			search: initialFilters,
		});
	}, [navigate]);

	return { filters, setFilter, resetFilters };
};
