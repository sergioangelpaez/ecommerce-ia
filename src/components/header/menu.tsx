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
						<Link to="/">Inicio</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink asChild className="nav-menu-item">
						<Link to="/catalog">Catálogo</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuLink asChild className="nav-menu-item">
					<Link to="/">Acerca de este proyecto</Link>
				</NavigationMenuLink>
			</NavigationMenuList>
		</NavigationMenu>
	);
};
