import type { FilterState } from "#/hooks/products/use-products-filter";
import { supabase } from "./supabase";

export const getAllProducts = async (filters: FilterState) => {
	let query = supabase.from("products").select("*").eq("is_active", true);

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

export const getProductBrands = async (): Promise<string[]> => {
	const { data, error } = await supabase
		.from("products")
		.select("brand")
		.eq("is_active", true)
		.not("brand", "is", null);

	if (error) throw new Error(error.message);

	return [...new Set(data.map((p) => p.brand as string))].sort();
};

export const getMaxProductPrice = async (): Promise<number> => {
	const { data, error } = await supabase
		.from("products")
		.select("price")
		.eq("is_active", true)
		.order("price", { ascending: false })
		.limit(1)
		.single();

	if (error) throw new Error(error.message);
	return data.price;
};

export const getProductById = async (productId: string) => {
	const { data, error } = await supabase
		.from("products")
		.select("*")
		.eq("id", productId)
		.single();

	if (error) throw new Error(error.message);
	return data;
};
