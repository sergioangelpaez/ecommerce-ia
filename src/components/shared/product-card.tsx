import { Button } from "../ui/button";
import { Card } from "../ui/card";

export const ProductCard = ({ product }: { product: Product }) => {
	return (
		<Card className="p-6 bg-card flex flex-col">
			<img
				src={product.image}
				alt=""
				className="object-cover aspect-square rounded-md"
			/>
			<div className="flex flex-col gap-1">
				<p className="text-muted text-sm font-medium capitalize">
					{product.brand}
				</p>
				<div className="flex flex-col gap-5">
					<div className="flex flex-col gap-2">
						<div className="flex flex-col gap-1">
							<h3 className="text-ellipsis">{product.title}</h3>
							<p className="text-muted text-sm line-clamp-3">
								{product.description}
							</p>
						</div>

						<div className="flex gap-3 items-center">
							<p className="text-accent font-bold">
								${product.discountedPrice}
							</p>
							<p className="text-muted text-sm font-bold line-through">
								${product.price}
							</p>
						</div>
					</div>

					<div className="flex gap-3">
						<Button>Add to Cart</Button>
						<Button variant="link">Details</Button>
					</div>
				</div>
			</div>
		</Card>
	);
};
