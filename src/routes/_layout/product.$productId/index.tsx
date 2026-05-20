import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { ProductDetailCard } from "#/components/shared/product-detail-card";
import { useProduct } from "#/hooks/products/use-product";

export const Route = createFileRoute("/_layout/product/$productId/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { productId } = Route.useParams();
	const { data: product, isLoading, isError } = useProduct(productId);

	if (isLoading) return <div>Cargando...</div>;
	if (isError || !product) return <div>Producto no encontrado</div>;

	return (
		<div className="w-full flex flex-col gap-5">
			<Link
				to="/catalog"
				className="flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors w-fit group"
			>
				<ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
				<span>Volver al catálogo</span>
			</Link>

			<ProductDetailCard product={product} />
		</div>
	);
}
