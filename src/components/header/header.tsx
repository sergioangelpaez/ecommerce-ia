import { AppLogo } from "./app-logo";
import { UserNavigationMenu } from "./menu";
import { NavigationToolbar } from "./navigation-toolbar";

export const AppHeader = () => {
	return (
		<header
			className="sticky top-3 z-50 w-full flex items-center justify-between p-4 duration-300 transition-all
            bg-card/80 backdrop-blur-md rounded-md shadow-md hover:ring-1 ring-accent"
		>
			<AppLogo />
			<UserNavigationMenu />
			<NavigationToolbar />
		</header>
	);
};
