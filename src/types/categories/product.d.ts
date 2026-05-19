interface Product {
	id: string;
	title: string;
	isNew: true;
	oldPrice: string;
	price: number;
	discountedPrice: number;
	description: string;
	category: string;
	type: string;
	stock: number;
	brand: string;
	size: {
		0: string;
		1: string;
		2: string;
	};
	image: string;
	rating: number;
}

interface ProductApiResponse extends ApiResponse<Product> {
	totalProducts: number;
}
