import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "#/lib/services/categories";

export const useCategories = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["get-all-categories"],
		queryFn: async () => await getAllCategories(),
		select: (data) => data.data,
	});

	return { data, isLoading, isError };
};
