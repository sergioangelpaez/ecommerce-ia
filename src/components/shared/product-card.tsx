import { Link } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { useCart } from "#/context/cart-context"; // Importamos tu hook
import type { Tables } from "../../types/database.types";
import { buttonVariants } from "../ui/button";
import { Card } from "../ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export const ProductCard = ({ product }: { product: Tables<"products"> }) => {
	const { cart, addToCart, updateQuantity } = useCart();

	// Verificamos si este producto ya está agregado
	const cartItem = cart.find((item) => item.id === product.id);
	const quantityInCart = cartItem ? cartItem.quantity : 0;

	return (
		<Card className="p-6 bg-card flex flex-col group hover:ring-1 ring-border transition-all duration-300">
			<div className="aspect-square rounded-md overflow-hidden bg-muted">
				<img
					src={product.image_url ?? ""}
					alt=""
					className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
				/>
			</div>
			<div className="flex flex-col gap-1 mt-4">
				<p className="text-muted text-sm font-medium capitalize">
					{product.brand}
				</p>
				<div className="flex flex-col justify-between gap-5">
					<div className="flex flex-col gap-2">
						<div className="flex flex-col gap-1 h-36">
							<h3 className="text-ellipsis h-16 text-foreground font-semibold">
								{product.name}
							</h3>
							<div className="text-muted text-sm line-clamp-3">
								<Tooltip>
									<TooltipTrigger className="text-left line-clamp-3 cursor-help">
										{product.description}
									</TooltipTrigger>
									<TooltipContent className="max-w-xs text-center">
										{product.description}
									</TooltipContent>
								</Tooltip>
							</div>
						</div>

						<div className="flex gap-3 items-center">
							<p className="text-blue-500 font-bold">
								${product.price.toLocaleString()}
							</p>
							{product.compare_price && (
								<p className="text-muted text-sm font-bold line-through">
									${product.compare_price.toLocaleString()}
								</p>
							)}
						</div>
					</div>

					<div className="flex gap-3 items-center mt-auto">
						{quantityInCart === 0 ? (
							<button
								type="button"
								onClick={() =>
									addToCart({
										id: product.id,
										name: product.name,
										price: product.price,
										image: product.image_url ?? undefined,
									})
								}
								className={buttonVariants({
									className:
										"w-full sm:w-fit justify-center gap-2 font-semibold bg-blue-600 hover:bg-blue-700 text-white cursor-pointer",
								})}
							>
								Agregar al carrito
							</button>
						) : (
							<div className="flex items-center border border-border rounded-lg bg-background overflow-hidden h-9">
								<button
									type="button"
									className="px-2.5 h-full hover:bg-muted text-muted-foreground flex items-center justify-center border-r border-border cursor-pointer"
									onClick={() => updateQuantity(product.id, quantityInCart - 1)}
								>
									<Minus className="size-3.5" />
								</button>
								<span className="w-9 text-center font-semibold text-sm text-foreground">
									{quantityInCart}
								</span>
								<button
									type="button"
									className="px-2.5 h-full hover:bg-muted text-muted-foreground flex items-center justify-center border-l border-border cursor-pointer"
									onClick={() => updateQuantity(product.id, quantityInCart + 1)}
								>
									<Plus className="size-3.5" />
								</button>
							</div>
						)}

						<Link
							to="/product/$productId"
							params={{ productId: product.id }}
							className={buttonVariants({
								variant: "link",
								className: "text-muted-foreground hover:text-foreground pl-2",
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
