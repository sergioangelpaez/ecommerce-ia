import { Link } from "@tanstack/react-router";
import { MoonIcon, Search, ShoppingCartIcon, SunIcon } from "lucide-react";
import { useTheme } from "#/context/theme-context";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export const NavigationToolbar = () => {
	const { theme, toggleTheme } = useTheme();
	return (
		<div className="flex gap-5 items-center justify-center">
			<Tooltip>
				<TooltipTrigger
					asChild
					className="text-foreground"
					onClick={() => toggleTheme()}
				>
					{theme === "light" ? <MoonIcon /> : <SunIcon />}
				</TooltipTrigger>
				<TooltipContent>
					<p>Cambiar el tema</p>
				</TooltipContent>
			</Tooltip>

			<Tooltip>
				<TooltipTrigger asChild className="text-foreground">
					<Link to="/">
						<Search className="size-6" />
					</Link>
				</TooltipTrigger>
				<TooltipContent>
					<p>Buscar</p>
				</TooltipContent>
			</Tooltip>

			<Tooltip>
				<TooltipTrigger asChild className="text-foreground">
					<Link to="/">
						<ShoppingCartIcon className="size-6" />
					</Link>
				</TooltipTrigger>
				<TooltipContent>
					<p>Ir al carrito</p>
				</TooltipContent>
			</Tooltip>

			<Button size="lg" className="cursor-pointer text-white">
				Compra con IA
			</Button>
		</div>
	);
};
