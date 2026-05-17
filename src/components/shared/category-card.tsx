import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Card } from "../ui/card";

export const CategoryCard = ({ category }: { category: Category }) => {
	return (
		<Card className="p-6 bg-card flex flex-col h-100 overflow-hidden">
			<div className="flex flex-col gap-3">
				<h3>{category.name}</h3>
				<Link
					to="/"
					className="text-xs text-accent font-medium flex gap-3 items-center"
				>
					View all products
					<ChevronRight className="size-4" />
				</Link>
			</div>
			<img
				src={category.image}
				alt=""
				className="object-contain w-full flex-1 min-h-0"
			/>
		</Card>
	);
};
