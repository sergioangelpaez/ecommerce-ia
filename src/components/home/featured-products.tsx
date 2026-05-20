import { Link } from "@tanstack/react-router";
import { CloudAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { useFeaturedProducts } from "#/hooks/products/use-featured-products";
import type { Tables } from "#/types/database.types";
import { ProductCard } from "../shared/product-card";
import { ProductCardSkeleton } from "../shared/skeletons/product-card-skeleton";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "../ui/empty";

const SKELETON_IDS = ["sk-1", "sk-2", "sk-3", "sk-4", "sk-5"];

export const FeaturedProducts = () => {
	const {
		featuredProducts,
		isLoading: isProductsLoading,
		isError: isProductsError,
	} = useFeaturedProducts();

	const [visibleCount, setVisibleCount] = useState(3);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(min-width: 1280px)");

		const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
			setVisibleCount(e.matches ? 5 : 3);
		};

		handleResize(mediaQuery);

		mediaQuery.addEventListener("change", handleResize);

		return () => mediaQuery.removeEventListener("change", handleResize);
	}, []);

	if (isProductsLoading) {
		return (
			<div className="flex flex-col gap-5">
				<div className="w-full flex justify-between items-center">
					<h1>Productos Recomendados</h1>
				</div>
				<Carousel className="w-full">
					<CarouselContent>
						{SKELETON_IDS.slice(0, visibleCount).map((id) => (
							<CarouselItem
								key={id}
								className="basis-1/2 md:basis-1/3 xl:basis-1/5"
							>
								<ProductCardSkeleton />
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
		);
	}

	if (isProductsError || !featuredProducts) {
		return (
			<div className="flex flex-col gap-5">
				<ProductCardSkeleton />
			</div>
		);
	}

	const productsArray: Tables<"products">[] = Array.isArray(featuredProducts)
		? featuredProducts
		: Object.values(featuredProducts);

	return (
		<div className="flex flex-col gap-5">
			<div className="w-full flex justify-between">
				<h1>Productos Recomendados</h1>
				<Button size="lg">
					<Link to="/catalog">Ver todos los productos</Link>
				</Button>
			</div>

			<div className="grid grid-cols-3 xl:grid-cols-5 gap-5">
				{productsArray.slice(0, visibleCount).map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
};
