import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "#/lib/services/categories";

export const useCategories = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["get-all-products"],
		queryFn: async () => await getAllCategories(),
	});

	return { data, isLoading, isError };
};
