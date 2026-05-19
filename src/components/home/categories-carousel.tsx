import { ArrowLeftCircle, ArrowRightCircle, CloudAlert } from "lucide-react";
import { useCallback, useState } from "react";
import { useCategories } from "#/hooks/categories/use-categories";
import { CategoryCard } from "../shared/category-card";
import { Card, CardContent } from "../ui/card";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "../ui/carousel";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "../ui/empty";
import { Skeleton } from "../ui/skeleton";

export const CategoriesCarousel = () => {
	const {
		data: categories,
		isLoading: isCategoriesLoading,
		isError: isCategoriesError,
	} = useCategories();

	const [api, setApi] = useState<CarouselApi>();
	const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
	const scrollNext = useCallback(() => api?.scrollNext(), [api]);

	if (isCategoriesLoading) {
		return (
			<div className="flex flex-col gap-5">
				<div className="w-full flex justify-between items-center">
					<h1>Shop By Category</h1>
				</div>
				<Carousel className="w-full">
					<CarouselContent>
						{[1, 2, 3, 4].map((n) => (
							<CarouselItem
								key={`skeleton-${n}`}
								className="basis-1/2 md:basis-1/3 lg:basis-1/4"
							>
								<div className="p-1">
									<Card className="p-6 flex flex-col h-100 overflow-hidden">
										<div className="flex flex-col gap-3">
											<Skeleton className="h-5 w-2/3 rounded-md" />
											<div className="flex flex-col gap-1.5">
												<Skeleton className="h-3 w-full rounded-md" />
												<Skeleton className="h-3 w-full rounded-md" />
												<Skeleton className="h-3 w-4/5 rounded-md" />
											</div>
											<Skeleton className="h-3 w-1/2 rounded-md" />
										</div>
										<Skeleton className="flex-1 min-h-0 w-full mt-3 rounded-lg" />
									</Card>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
		);
	}

	if (isCategoriesError || !categories) {
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
									There was an error fetching the categories information. Please
									try reloading the page.
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
			<div className="w-full flex justify-between items-center">
				<h1>Shop By Category</h1>
				<div className="flex gap-3 text-accent">
					<ArrowLeftCircle className="cursor-pointer" onClick={scrollPrev} />
					<ArrowRightCircle className="cursor-pointer" onClick={scrollNext} />
				</div>
			</div>

			<Carousel setApi={setApi} className="w-full">
				<CarouselContent>
					{categories.map((category) => (
						<CarouselItem
							key={category.id}
							className="basis-1/2 md:basis-1/3 lg:basis-1/4"
						>
							<div className="p-1">
								<CategoryCard category={category} />
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</div>
	);
};
