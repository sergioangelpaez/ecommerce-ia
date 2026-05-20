import { supabase } from "./supabase";

export const getAllCategories = async () => {
	const response = await supabase.from("categories").select();

	if (response.error) throw new Error(response.error.message);
	return response.data;
};
