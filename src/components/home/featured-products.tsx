import { CloudAlert } from "lucide-react";
import { useFeaturedProducts } from "#/hooks/products/use-featured-products";
import { ProductCard } from "../shared/product-card";
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
import { Skeleton } from "../ui/skeleton";

export const FeaturedProducts = () => {
	const {
		featuredProducts,
		isLoading: isProductsLoading,
		isError: isProductsError,
	} = useFeaturedProducts();

	if (isProductsLoading) {
		return (
			<div className="flex flex-col gap-5">
				<div className="w-full flex justify-between items-center">
					<h1>Featured Products</h1>
				</div>
				<Carousel className="w-full">
					<CarouselContent>
						{[1, 2, 3, 4, 5].map((n) => (
							<CarouselItem
								key={`skeleton-${n}`}
								className="basis-1/2 md:basis-1/3 lg:basis-1/5"
							>
								<Card className="p-6 flex flex-col gap-1">
									<Skeleton className="w-full aspect-square rounded-md mb-1" />
									<Skeleton className="h-3 w-1/3 rounded-md" />

									<div className="flex flex-col gap-5">
										<div className="flex flex-col gap-2">
											<div className="flex flex-col gap-1">
												<Skeleton className="h-4 w-3/4 rounded-md" />
												<Skeleton className="h-3 w-full rounded-md" />
												<Skeleton className="h-3 w-full rounded-md" />
												<Skeleton className="h-3 w-2/3 rounded-md" />
											</div>
											<div className="flex gap-3 items-center">
												<Skeleton className="h-4 w-16 rounded-md" />
												<Skeleton className="h-3 w-12 rounded-md" />
											</div>
										</div>
										<div className="flex gap-3">
											<Skeleton className="h-9 w-28 rounded-md" />
											<Skeleton className="h-9 w-16 rounded-md" />
										</div>
									</div>
								</Card>
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
				<Card>
					<CardContent>
						<Empty>
							<EmptyHeader>
								<EmptyMedia variant="icon">
									<CloudAlert />
								</EmptyMedia>
								<EmptyTitle>Oops!</EmptyTitle>
								<EmptyDescription>
									There was an error fetching the products information. Please
									try realoding the page.
								</EmptyDescription>
							</EmptyHeader>
						</Empty>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-5">
			<div className="w-full flex justify-between">
				<h1>Featured Products</h1>
				<Button size="lg">See All Products</Button>
			</div>
			<div className="grid grid-cols-3 lg:grid-cols-5 gap-5">
				{Object.values(
					featuredProducts
						.slice(0, 5)
						.map((product) => (
							<ProductCard key={product.id} product={product} />
						)),
				)}
			</div>
		</div>
	);
};
