import { Link } from "@tanstack/react-router";
import { Bot } from "lucide-react";

export const AppLogo = () => {
	return (
		<div className="flex gap-3 items-center justify-center">
			<Bot className="size-8 text-accent" />
			<Link to="/">
				<h1>AI ecommerce</h1>
			</Link>
		</div>
	);
};
