import { Card } from "../ui/card";

export const ProductCard = () => {
	return (
		<Card className="p-6 bg-card flex flex-col hover:scale-103 transition-all duration-400">
			<img
				src="src\assets\woman-with-headphones.png"
				alt=""
				className="object-contain aspect-4/3"
			/>
			<div className="flex flex-col gap-3">
				<p className="text-muted text-sm font-medium">Categoria</p>
				<div className="flex flex-col">
					<h3>Nombre del producto</h3>
					<p className="text-accent font-bold">$1.234</p>
				</div>
			</div>
		</Card>
	);
};
