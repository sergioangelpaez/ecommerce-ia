import { Button } from "#/components/ui/button";
import { Card, CardContent } from "#/components/ui/card";

export const HeroBanner = () => {
	return (
		<Card className="bg-linear-to-r from-blue-700 to-blue-900 text-primary-foreground p-10 flex flex-col gap-10">
			<CardContent className="grid grid-cols-2 gap-10">
				<div className="flex flex-col gap-10">
					<div className="flex gap-5 flex-col">
						<h1 className="text-primary-foreground text-4xl">
							Experimenta el Mejor Audio Posible
						</h1>
						<p>
							Experimenta el sonido en su forma más pura. Morbi justo sem,
							venenatis sit amet tortor id, porttitor facilisis metus. Ut
							scelerisque mauris. Vivamus fringilla elit eu felis iaculis
							cursus. Integer ullamcorper libero vel orci tristique, in
							ullamcorper est luctus. Ligula felis. Proin interdum velit quam,
							ut iaculis ipsum tempor nec...
						</p>
					</div>
					<div className="flex gap-5">
						<Button variant="secondary">Comprar Ahora</Button>
						<Button variant="outline">Aprender Más</Button>
					</div>
				</div>
				<div className="flex items-center max-h-80"></div>
			</CardContent>
		</Card>
	);
};
