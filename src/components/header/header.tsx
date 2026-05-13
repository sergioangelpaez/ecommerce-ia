import { AppLogo } from "./app-logo";
import { UserNavigationMenu } from "./menu";
import { NavigationToolbar } from "./navigation-toolbar";

export const AppHeader = () => {
	return (
		<div className="w-full flex items-center justify-between">
			<AppLogo />
			<UserNavigationMenu />
			<NavigationToolbar />
		</div>
	);
};
