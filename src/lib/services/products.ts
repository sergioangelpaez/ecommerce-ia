import { supabase } from "./supabase";

export const getAllProducts = async () => {
	const response = await supabase.from("products").select();

	if (response.error) throw new Error(response.error.message);
	return response.data;
};
