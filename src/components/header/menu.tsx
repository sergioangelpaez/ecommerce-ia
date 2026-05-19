import { Link } from "@tanstack/react-router";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";

export const UserNavigationMenu = () => {
	return (
		<NavigationMenu>
			<NavigationMenuList className="flex gap-5">
				<NavigationMenuItem>
					<NavigationMenuLink asChild className="nav-menu-item">
						<Link to="/">Home</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink asChild className="nav-menu-item">
						<Link to="/">Products</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuLink asChild className="nav-menu-item">
					<Link to="/">About this project</Link>
				</NavigationMenuLink>
			</NavigationMenuList>
		</NavigationMenu>
	);
};
