import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Card } from "../ui/card";

export const CategoryCard = ({ category }: { category: Category }) => {
	return (
		<Card className="p-6 bg-card flex flex-col h-70 overflow-hidden">
			<div className="flex flex-col h-full items-between justify-between gap-3">
				<div className="flex flex-col gap-3">
					<h3>{category.name}</h3>
					<p className="text-muted line-clamp-3">{category.description}</p>
				</div>
				<Link
					to="/"
					className="text-xs text-accent font-medium flex gap-3 items-center pb-10"
				>
					View all {category.name} products
					<ChevronRight className="size-4" />
				</Link>
			</div>
		</Card>
	);
};
