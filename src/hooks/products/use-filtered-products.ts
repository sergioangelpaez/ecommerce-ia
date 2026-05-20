import { supabase } from "#/lib/services/supabase";
import type { FilterState } from "./use-products-filter";

export const getAllProducts = async (filters: FilterState) => {
	let query = supabase
		.from("products_with_rating")
		.select("*")
		.eq("is_active", true);

	if (filters.search.trim()) {
		query = query.ilike("name", `%${filters.search.trim()}%`);
	}

	if (filters.categoryIds.length > 0) {
		query = query.in("category_id", filters.categoryIds);
	}

	if (filters.brands.length > 0) {
		query = query.in("brand", filters.brands);
	}

	if (filters.minPrice !== null) {
		query = query.gte("price", filters.minPrice);
	}
	if (filters.maxPrice !== null) {
		query = query.lte("price", filters.maxPrice);
	}

	if (filters.onlyOnSale) {
		query = query.not("compare_price", "is", null).gt("compare_price", 0);
	}

	switch (filters.sortBy) {
		case "price_asc":
			query = query.order("price", { ascending: true });
			break;
		case "price_desc":
			query = query.order("price", { ascending: false });
			break;
		case "name_asc":
			query = query.order("name", { ascending: true });
			break;
		case "newest":
		default:
			query = query.order("created_at", { ascending: false });
			break;
	}

	const { data, error } = await query;
	if (error) throw new Error(error.message);
	return data;
};
