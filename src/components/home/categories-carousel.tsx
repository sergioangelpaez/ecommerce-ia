import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { CategoryCard } from "../shared/category-card";

export const CategoriesCarousel = () => {
	return (
		<div className="flex flex-col gap-5">
			<div className="w-full flex justify-between">
				<h1>Compra por Categorías</h1>
				<div className="flex gap-3 text-accent">
					<ArrowLeftCircle />
					<ArrowRightCircle />
				</div>
			</div>
			<div className="grid grid-cols-3 lg:grid-cols-5 gap-5">
				<CategoryCard />
				<CategoryCard />
				<CategoryCard />
				<CategoryCard />
				<CategoryCard />
			</div>
		</div>
	);
};
