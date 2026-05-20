import { Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import { Card, CardContent } from "#/components/ui/card";

export const HeroBanner = () => {
	return (
		<Card className="bg-linear-to-r from-accent to-accent/80 text-primary-foreground p-10 flex flex-col gap-10">
			<CardContent className="grid grid-cols-2 gap-10">
				<div className="flex flex-col gap-10 justify-center">
					<div className="flex gap-5 flex-col">
						<h1 className="text-4xl text-white">
							Experimenta el Mejor Audio Posible
						</h1>
						<p className="text-white">
							Experimenta la verdadera libertad del sonido con nuestros
							audífonos inalámbricos premium. Disfruta de una acústica
							cristalina, cancelación de ruido avanzada y un diseño ergonómico
							pensado para acompañarte todo el día con el máximo confort. Dale a
							tus oídos la calidad que se merecen y lleva tu música al siguiente
							nivel.
						</p>
					</div>
					<div className="flex gap-5">
						<Button variant="secondary">
							<Link to="/catalog">Comprar ahora</Link>
						</Button>
						<Button variant="outline" className="text-white">
							<Link to="/">Comprar ahora</Link>
						</Button>
					</div>
				</div>
				<div className="flex items-center justify-center max-h-80">
					<img
						className="object-top h-full scale-125"
						src="src\assets\woman-with-headphones.png"
						alt=""
					/>
				</div>
			</CardContent>
		</Card>
	);
};
