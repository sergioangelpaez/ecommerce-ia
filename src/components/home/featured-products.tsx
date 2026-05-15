import { ProductCard } from "../shared/product-card";
import { Button } from "../ui/button";

export const FeaturedProducts = () => {
	return (
		<div className="flex flex-col gap-5">
			<div className="w-full flex justify-between">
				<h1>Productos Recomendados</h1>
				<Button size="lg">Ver todos los productos</Button>
			</div>
			<div className="grid grid-cols-3 lg:grid-cols-5 gap-5">
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
			</div>
		</div>
	);
};
