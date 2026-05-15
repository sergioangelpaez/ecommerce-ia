import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppHeader } from "#/components/header/header";

export const Route = createFileRoute("/_layout")({
	component: () => (
		<div className="p-8 w-full flex justify-center">
			<div className="w-full max-w-400 flex gap-5 flex-col">
				<AppHeader />
				<Outlet />
			</div>
		</div>
	),
});
