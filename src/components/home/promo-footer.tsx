import { Newspaper, PhoneIcon, TruckIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export const PromoFooter = () => {
	return (
		<Card className="flex flex-col items-center gap-10">
			<h1>Vive la Mejor Experiencia de Compra con AI Ecommerce</h1>
			<div className="flex justify-around w-full">
				<div className="flex flex-col gap-3 max-w-80">
					<div className="flex gap-2 flex-col items-center">
						<TruckIcon className="size-10" />
						<h2 className="m-0">Envío Gratuito</h2>
						<p className="text-center text-sm text-muted-foreground">
							Recibe tus productos en la puerta de tu casa sin costos
							adicionales en compras mayores a cierto monto.
						</p>
					</div>
				</div>
				<div className="flex flex-col gap-3 max-w-80">
					<div className="flex gap-2 flex-col items-center">
						<PhoneIcon className="size-10" />
						<h2 className="m-0">Soporte 24/7</h2>
						<p className="text-center text-sm text-muted-foreground">
							Nuestro equipo de atención está disponible en cualquier momento
							para resolver tus dudas y guiar tu compra.
						</p>
					</div>
				</div>
				<div className="flex flex-col gap-3 max-w-80">
					<div className="flex gap-2 flex-col items-center">
						<Newspaper className="size-10" />
						<h2 className="m-0">Garantía Segura</h2>
						<p className="text-center text-sm text-muted-foreground">
							Compra con total tranquilidad; respaldamos cada producto con
							políticas de devolución simples y rápidas.
						</p>
					</div>
				</div>
			</div>
			<Button>Comprar Ahora</Button>
		</Card>
	);
};
