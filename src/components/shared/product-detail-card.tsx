import { Minus, Plus, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import { useState } from "react";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { Separator } from "#/components/ui/separator";

interface ProductDetailViewProps {
	product: {
		brand: string | null;
		compare_price: number | null;
		description: string | null;
		id: string;
		image_url: string | null;
		images: string[] | null;
		name: string;
		price: number;
		sku: string | null;
		stock: number;
		tags: string[] | null;
	};
}

export function ProductDetailCard({ product }: ProductDetailViewProps) {
	const allImages =
		product.images && product.images.length > 0
			? product.images
			: [product.image_url || "/placeholder-product.png"];

	const [mainImage, setMainImage] = useState(allImages[0]);
	const [quantity, setQuantity] = useState(1);

	const hasDiscount =
		product.compare_price != null &&
		Number(product.compare_price) > Number(product.price);

	const discountPercentage = hasDiscount
		? Math.round(
				((Number(product.compare_price) - Number(product.price)) /
					Number(product.compare_price)) *
					100,
			)
		: 0;

	const isOutOfStock = product.stock <= 0;

	return (
		<main className="flex flex-col gap-12">
			{/* GRID PRINCIPAL */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
				{/* COLUMNA IZQUIERDA — Imágenes */}
				<section className="lg:col-span-7 flex flex-col gap-4">
					<div className="relative aspect-3/2 w-full overflow-hidden rounded-2xl">
						{hasDiscount && !isOutOfStock && (
							<Badge
								variant="destructive"
								className="absolute left-4 top-4 z-10 text-xs font-semibold shadow-sm"
							>
								-{discountPercentage}% OFF
							</Badge>
						)}
						<img
							src={mainImage}
							alt={product.name}
							className={`w-full h-full object-cover ${isOutOfStock ? "opacity-40" : ""}`}
						/>
					</div>

					{allImages.length > 1 && (
						<div className="flex gap-3 overflow-x-auto pb-2">
							{allImages.map((img, index) => (
								<button
									key={index}
									onClick={() => setMainImage(img)}
									className={`relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
										mainImage === img
											? "border-primary shadow-sm"
											: "border-border hover:border-muted-foreground/50"
									}`}
								>
									<img
										src={img}
										alt={`${product.name} - vista ${index + 1}`}
										className="h-full w-full object-cover"
									/>
								</button>
							))}
						</div>
					)}
				</section>

				{/* COLUMNA DERECHA — Información */}
				<section className="lg:col-span-5 flex flex-col gap-6 sticky top-0">
					{/* Header */}
					<div className="flex flex-col gap-2">
						{product.brand && (
							<span className="text-xs font-bold uppercase tracking-widest text-muted">
								{product.brand}
							</span>
						)}
						<h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
							{product.name}
						</h1>
						{product.sku && (
							<p className="text-xs text-muted font-mono">SKU: {product.sku}</p>
						)}
					</div>

					<Separator />

					{/* Precios */}
					<div className="flex flex-col gap-1">
						<div className="flex items-baseline gap-3">
							<span className="text-3xl font-black text-foreground">
								${product.price.toLocaleString()}
							</span>
							{hasDiscount && (
								<span className="text-base text-muted line-through font-medium">
									${product.compare_price?.toLocaleString()}
								</span>
							)}
							{hasDiscount && (
								<Badge
									variant="secondary"
									className="text-emerald-600 bg-emerald-500/10"
								>
									Ahorras $
									{(product.compare_price! - product.price).toLocaleString()}
								</Badge>
							)}
						</div>
						<p className="text-xs text-muted">
							Impuestos incluidos. Ver opciones de pago en el checkout.
						</p>
					</div>

					<Separator />

					{/* Stock y cantidad */}
					<div className="flex flex-col gap-4">
						<div className="flex items-center gap-2">
							<span
								className={`h-2 w-2 rounded-full ${isOutOfStock ? "bg-destructive" : "bg-emerald-500"}`}
							/>
							<span className="text-sm font-medium text-foreground">
								{isOutOfStock
									? "Agotado temporalmente"
									: `${product.stock} unidades disponibles`}
							</span>
						</div>

						{!isOutOfStock && (
							<div className="flex items-center gap-4">
								<span className="text-sm font-medium text-muted">
									Cantidad:
								</span>
								<div className="flex items-center border border-input rounded-lg bg-background overflow-hidden">
									<Button
										variant="ghost"
										size="icon"
										className="h-9 w-9 rounded-none border-r border-input"
										onClick={() => setQuantity((q) => Math.max(1, q - 1))}
										disabled={quantity <= 1}
									>
										<Minus className="h-3.5 w-3.5" />
									</Button>
									<span className="w-10 text-center font-semibold text-sm">
										{quantity}
									</span>
									<Button
										variant="ghost"
										size="icon"
										className="h-9 w-9 rounded-none border-l border-input"
										onClick={() =>
											setQuantity((q) => Math.min(product.stock, q + 1))
										}
										disabled={quantity >= product.stock}
									>
										<Plus className="h-3.5 w-3.5" />
									</Button>
								</div>
							</div>
						)}
					</div>

					{/* CTA */}
					<Button
						size="lg"
						disabled={isOutOfStock}
						className="w-full gap-2 font-semibold"
					>
						<ShoppingCart className="h-5 w-5" />
						{isOutOfStock ? "Sin stock" : "Añadir al carrito"}
					</Button>

					{/* Beneficios */}
					<div className="flex flex-col gap-3 rounded-xl border border-border bg-muted/20 p-4">
						<div className="flex items-start gap-3 text-xs text-muted-foreground">
							<Truck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
							<div>
								<p className="font-semibold text-foreground">
									Envío a todo el país
								</p>
								<p className="text-muted">
									Calcula el costo de envío en el siguiente paso.
								</p>
							</div>
						</div>
						<Separator />
						<div className="flex items-start gap-3 text-xs text-muted-foreground">
							<ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
							<div>
								<p className="font-semibold text-foreground">
									Compra Garantizada
								</p>
								<p className="text-muted">
									Tus datos protegidos con cifrado SSL de extremo a extremo.
								</p>
							</div>
						</div>
					</div>
				</section>
			</div>

			{/* DESCRIPCIÓN */}
			<section className="flex flex-col gap-4">
				<Separator />
				<h2 className="text-xl font-bold text-foreground">
					Descripción del producto
				</h2>
				<p className="text-muted leading-relaxed text-sm whitespace-pre-line">
					{product.description ||
						"Este producto no cuenta con una descripción detallada en este momento."}
				</p>

				{product.tags && product.tags.length > 0 && (
					<div className="flex flex-wrap gap-2 mt-2">
						{product.tags.map((tag) => (
							<Badge
								key={tag}
								variant="secondary"
								className="font-mono text-xs"
							>
								#{tag}
							</Badge>
						))}
					</div>
				)}
			</section>
		</main>
	);
}
