import { Button } from "#/components/ui/button";
import { Card, CardContent } from "#/components/ui/card";

export const HeroBanner = () => {
	return (
		<Card className="bg-linear-to-r from-accent to-accent/80 text-primary-foreground p-10 flex flex-col gap-10">
			<CardContent className="grid grid-cols-2 gap-10">
				<div className="flex flex-col gap-10 justify-center">
					<div className="flex gap-5 flex-col">
						<h1 className="text-4xl text-white">
							Experience The Best Possible Audio
						</h1>
						<p className="text-white">
							Morbi justo sem, venenatis sit amet tortor id, porttitor facilisis
							metus. Ut scelerisque mauris. Vivamus fringilla elit eu felis
							iaculis cursus. Integer ullamcorper libero vel orci tristique, in
							ullamcorper est luctus. Ligula felis. Proin interdum velit quam,
							ut iaculis ipsum tempor nec...
						</p>
					</div>
					<div className="flex gap-5">
						<Button className="bg-background">Shop Now</Button>
						<Button variant="outline" className="text-white">
							Learn More
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
