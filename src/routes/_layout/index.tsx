import { createFileRoute } from "@tanstack/react-router";
import { CategoriesCarousel } from "#/components/home/categories-carousel";
import { FeaturedProducts } from "#/components/home/featured-products";
import { HeroBanner } from "#/components/home/hero";
import { PromoFooter } from "#/components/home/promo-footer";

export const Route = createFileRoute("/_layout/")({ component: Home });

function Home() {
	return (
		<div className="pt-4 flex gap-20 flex-col">
			<HeroBanner />
			<FeaturedProducts />
			<CategoriesCarousel />
			<PromoFooter />
		</div>
	);
}
