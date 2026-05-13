import { Link } from "@tanstack/react-router";
import { Search, ShoppingCartIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export const NavigationToolbar = () => {
	return (
		<div className="flex gap-5 items-center justify-center">
			<Tooltip>
				<TooltipTrigger asChild>
					<Link to="/">
						<Search className="size-6" />
					</Link>
				</TooltipTrigger>
				<TooltipContent>
					<p>Buscar</p>
				</TooltipContent>
			</Tooltip>

			<Tooltip>
				<TooltipTrigger asChild>
					<Link to="/">
						<ShoppingCartIcon className="size-6" />
					</Link>
				</TooltipTrigger>
				<TooltipContent>
					<p>Ir al carrito</p>
				</TooltipContent>
			</Tooltip>

			<Button size="lg" className="cursor-pointer">
				Compra con IA
			</Button>
		</div>
	);
};
