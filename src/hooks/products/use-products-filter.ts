import { useCallback, useState } from "react";

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
	const [filters, setFilters] = useState<FilterState>(initialFilters);

	const setFilter = useCallback(
		<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
			setFilters((prev) => ({ ...prev, [key]: value }));
		},
		[],
	);

	const resetFilters = useCallback(() => {
		setFilters(initialFilters);
	}, []);

	return { filters, setFilter, resetFilters };
};
