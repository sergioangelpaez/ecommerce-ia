import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppHeader } from "#/components/header/header";
import { ChatWidget } from "#/components/shared/chat-widget";
import { ThemeProvider } from "#/context/theme-context";

export const Route = createFileRoute("/_layout")({
	component: () => (
		<div className="px-8 py-4 w-full flex justify-center">
			<div className="w-full max-w-400 flex gap-8 flex-col">
				<ThemeProvider>
					<AppHeader />
					<Outlet />
					<ChatWidget />
				</ThemeProvider>
			</div>
		</div>
	),
});
