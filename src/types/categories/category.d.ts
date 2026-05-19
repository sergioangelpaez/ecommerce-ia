interface Category {
	id: number;
	name: string;
	description: string;
	parenId: number | null;
}

interface CategoryApiResponse extends ApiResponse<Category> {
	totalCategories: number;
}
