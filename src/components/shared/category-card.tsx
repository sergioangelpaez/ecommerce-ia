import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Card } from "../ui/card";

export const CategoryCard = () => {
	return (
		<Card className="p-6 bg-card flex flex-col hover:scale-103 transition-all duration-400 h-100 overflow-hidden">
			<div className="flex flex-col gap-3">
				<h3>Nombre de la categoría</h3>
				<p className="text-muted-foreground text-sm font-medium">
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry. Lorem Ipsum has been the industry's standard dummy text ever
					since the 1500s.
				</p>
				<Link
					to="/"
					className="text-xs text-accent font-medium flex gap-3 items-center"
				>
					Ver todos los productos
					<ChevronRight className="size-4" />
				</Link>
			</div>
			<img
				src="src\assets\woman-with-headphones.png"
				alt=""
				className="object-contain w-full flex-1 min-h-0"
			/>
		</Card>
	);
};
