import { AppLogo } from "./app-logo";
import { UserNavigationMenu } from "./menu";
import { NavigationToolbar } from "./navigation-toolbar";

export const AppHeader = () => {
	return (
		<header
			className="sticky top-5 z-50 w-full flex items-center justify-between p-4 transition-all
            bg-background/80 backdrop-blur-md rounded-md shadow-md"
		>
			<AppLogo />
			<UserNavigationMenu />
			<NavigationToolbar />
		</header>
	);
};
