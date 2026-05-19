import { Newspaper, PhoneIcon, TruckIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export const PromoFooter = () => {
	return (
		<Card className="flex flex-col items-center gap-10">
			<h1 className="max-w-xl text-center">
				Be Part Of The Best Shopping Experience with{" "}
				<span className="text-accent font-bold">AI Ecommerce</span>
			</h1>
			<div className="flex justify-around w-full">
				<div className="flex flex-col gap-3 max-w-80">
					<div className="flex gap-2 flex-col items-center">
						<TruckIcon className="size-10" />
						<h2 className="m-0">Free Shipping</h2>
						<p className="text-center text-sm text-muted">
							Receive your products at your doorstep at no extra cost on
							purchases over a certain amount.
						</p>
					</div>
				</div>

				<div className="flex flex-col gap-3 max-w-80">
					<div className="flex gap-2 flex-col items-center">
						<PhoneIcon className="size-10" />
						<h2 className="m-0">24/7 Support</h2>
						<p className="text-center text-sm text-muted">
							Our customer service team is available at any time to resolve your
							questions and guide your purchase.
						</p>
					</div>
				</div>

				<div className="flex flex-col gap-3 max-w-80">
					<div className="flex gap-2 flex-col items-center">
						<Newspaper className="size-10" />
						<h2 className="m-0">Secure Guarantee</h2>
						<p className="text-center text-sm text-muted">
							Shop with total peace of mind; we back every product with simple
							and fast return policies.
						</p>
					</div>
				</div>
			</div>

			<Button size="lg">Shop Now</Button>
		</Card>
	);
};
