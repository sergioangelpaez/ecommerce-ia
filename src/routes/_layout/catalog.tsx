import { createFileRoute } from "@tanstack/react-router";
import { Filters } from "#/components/catalog/filters";

export const Route = createFileRoute("/_layout/catalog")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="h-[80dvh] w-full">
			<Filters />
		</div>
	);
}
