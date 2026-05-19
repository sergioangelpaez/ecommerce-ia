import { Link } from "@tanstack/react-router";
import { MoonIcon, Search, ShoppingCartIcon, SunIcon } from "lucide-react";
import { useTheme } from "#/hooks/use-theme";
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
					<Link to="/">{theme === "light" ? <SunIcon /> : <MoonIcon />}</Link>
				</TooltipTrigger>
				<TooltipContent>
					<p>Toggle Theme</p>
				</TooltipContent>
			</Tooltip>

			<Tooltip>
				<TooltipTrigger asChild className="text-foreground">
					<Link to="/">
						<Search className="size-6" />
					</Link>
				</TooltipTrigger>
				<TooltipContent>
					<p>Search</p>
				</TooltipContent>
			</Tooltip>

			<Tooltip>
				<TooltipTrigger asChild className="text-foreground">
					<Link to="/">
						<ShoppingCartIcon className="size-6" />
					</Link>
				</TooltipTrigger>
				<TooltipContent>
					<p>Go to cart</p>
				</TooltipContent>
			</Tooltip>

			<Button size="lg" className="cursor-pointer text-white">
				Shop with AI
			</Button>
		</div>
	);
};
