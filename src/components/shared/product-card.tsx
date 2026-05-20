import { Link } from "@tanstack/react-router";
import type { Tables } from "../../types/database.types";
import { buttonVariants } from "../ui/button";
import { Card } from "../ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export const ProductCard = ({ product }: { product: Tables<"products"> }) => {
	return (
		<Card className="p-6 bg-card flex flex-col group hover:ring-1 ring-accent transition-all duration-300">
			<div className="aspect-square rounded-md overflow-hidden bg-muted">
				<img
					src={product.image_url ?? ""}
					alt=""
					className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
				/>
			</div>
			<div className="flex flex-col gap-1">
				<p className="text-muted text-sm font-medium capitalize">
					{product.brand}
				</p>
				<div className="flex flex-col justify-between gap-5">
					<div className="flex flex-col gap-2">
						<div className="flex flex-col gap-1 h-36">
							<h3 className="text-ellipsis h-16">{product.name}</h3>
							<p className="text-muted text-sm line-clamp-3">
								<Tooltip>
									<TooltipTrigger className="text-left line-clamp-3">
										{product.description}
									</TooltipTrigger>
									<TooltipContent className="max-w-fit text-center">
										{product.description}
									</TooltipContent>
								</Tooltip>
							</p>
						</div>

						<div className="flex gap-3 items-center">
							<p className="text-accent font-bold">${product.price}</p>
							{product.compare_price && (
								<p className="text-muted text-sm font-bold line-through">
									${product.compare_price}
								</p>
							)}
						</div>
					</div>

					<div className="flex gap-3">
						<Link
							to="/"
							className={buttonVariants({
								className:
									"w-full sm:w-fit mt-auto justify-center gap-2 font-semibold",
							})}
						>
							Agregar al carrito
						</Link>
						<Link
							to="/product/$productId"
							params={{ productId: product.id }}
							className={buttonVariants({
								variant: "link",
							})}
						>
							Detalles
						</Link>
					</div>
				</div>
			</div>
		</Card>
	);
};
