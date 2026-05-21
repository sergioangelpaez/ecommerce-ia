import { useNavigate } from "@tanstack/react-router";
import { MoonIcon, Search, SunIcon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "#/context/theme-context";
import { CartDrawer } from "../cart/cart-drawer";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export const NavigationToolbar = () => {
	const { theme, toggleTheme } = useTheme();
	const navigate = useNavigate();
	const [query, setQuery] = useState("");

	const handleSearch = () => {
		if (!query.trim()) return;

		navigate({
			to: "/catalog",
			search: (prev) => ({
				...prev,
				search: query.trim(),
			}),
		});

		setQuery("");
	};

	return (
		<div className="flex gap-5 items-center justify-center">
			<div className="relative flex items-center">
				<Search className="absolute left-3 size-4 text-muted-foreground pointer-events-none" />
				<input
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") handleSearch();
						if (e.key === "Escape") setQuery("");
					}}
					placeholder="Buscar productos..."
					className="border border-border rounded-md pl-10 pr-3 py-1.5 text-sm bg-background text-foreground w-64 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
				/>
			</div>

			<Tooltip>
				<TooltipTrigger asChild>
					<div className="flex items-center justify-center">
						<CartDrawer />
					</div>
				</TooltipTrigger>
				<TooltipContent>
					<p>Ver carrito</p>
				</TooltipContent>
			</Tooltip>

			<Tooltip>
				<TooltipTrigger
					asChild
					className="text-foreground cursor-pointer"
					onClick={() => toggleTheme()}
				>
					{theme === "light" ? (
						<MoonIcon className="size-5" />
					) : (
						<SunIcon className="size-5" />
					)}
				</TooltipTrigger>
				<TooltipContent>
					<p>Cambiar el tema</p>
				</TooltipContent>
			</Tooltip>
		</div>
	);
};
