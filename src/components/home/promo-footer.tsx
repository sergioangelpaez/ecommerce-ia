import { BoxIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export const PromoFooter = () => {
	return (
		<Card className="flex flex-col items-center">
			<h1>Vive la Mejor de Experiencia de Compra con AI Ecommerce</h1>
			<div className="grid grid-cols-3">
				<div className="flex flex-col gap-3">
					<div className="flex gap-2 flex-col items-center">
						<BoxIcon className="size-10" />
						<h2 className="m-0">Free Delivery</h2>
						<p className="text-center text-sm text-muted-foreground">
							Descripcion Descripcion Descripcion Descripcion Descripcion
							Descripcion Descripcion Descripcion Descripcion Descripcion
							Descripcion Descripcion Descripcion Descripcion
						</p>
					</div>
				</div>
				<div className="flex flex-col gap-3">
					<div className="flex gap-2 flex-col items-center">
						<BoxIcon className="size-10" />
						<h2 className="m-0">Free Delivery</h2>
						<p className="text-center text-sm text-muted-foreground">
							Descripcion Descripcion Descripcion Descripcion Descripcion
							Descripcion Descripcion Descripcion Descripcion Descripcion
							Descripcion Descripcion Descripcion Descripcion
						</p>
					</div>
				</div>
				<div className="flex flex-col gap-3">
					<div className="flex gap-2 flex-col items-center">
						<BoxIcon className="size-10" />
						<h2 className="m-0">Free Delivery</h2>
						<p className="text-center text-sm text-muted-foreground">
							Descripcion Descripcion Descripcion Descripcion Descripcion
							Descripcion Descripcion Descripcion Descripcion Descripcion
							Descripcion Descripcion Descripcion Descripcion
						</p>
					</div>
				</div>
			</div>
			<Button>Comprar Ahora</Button>
		</Card>
	);
};
