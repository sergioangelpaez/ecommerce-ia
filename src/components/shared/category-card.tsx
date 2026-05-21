import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { Tables } from "#/types/database.types";
import { buttonVariants } from "../ui/button";
import { Card } from "../ui/card";

export const CategoryCard = ({
	category,
}: {
	category: Tables<"categories">;
}) => {
	return (
		<Card className="p-6 flex flex-col h-72 relative overflow-hidden group border-none bg-zinc-950">
			{category.image_url && (
				<img
					src={category.image_url}
					alt=""
					className="absolute inset-0 w-full h-full object-cover opacity-40 transition-transform duration-500 group-hover:scale-105"
				/>
			)}

			<div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-black/10 pointer-events-none" />

			<div className="flex flex-col h-full justify-between gap-3 relative z-10 text-white">
				<div className="flex flex-col gap-2">
					<h3 className="text-xl font-bold tracking-tight text-white">
						{category.name}
					</h3>
					<p className="text-sm text-zinc-200 line-clamp-3 leading-relaxed">
						{category.description}
					</p>
				</div>

				<Link
					to="/catalog"
					search={{ categoryIds: [category.id] }}
					className={buttonVariants({
						className:
							"w-full sm:w-fit mt-auto justify-center gap-2 font-semibold shadow-md",
					})}
				>
					Ir a {category.name}
					<ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
				</Link>
			</div>
		</Card>
	);
};
