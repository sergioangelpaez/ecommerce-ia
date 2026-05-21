import { useNavigate } from "@tanstack/react-router";
import { Minus, Plus, ShoppingCartIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCart } from "#/context/cart-context";
import { Button } from "../ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";

export const CartDrawer = () => {
	const { cart, updateQuantity, removeFromCart, cartCount, cartTotal } =
		useCart();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<button
					type="button"
					className="relative text-foreground p-1 cursor-pointer"
				>
					<ShoppingCartIcon className="size-6" />
					{cartCount > 0 && (
						<span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full size-5 flex items-center justify-center animate-in fade-in zoom-in-50">
							{cartCount}
						</span>
					)}
				</button>
			</SheetTrigger>
			<SheetContent className="w-full sm:max-w-md bg-background border-l border-border flex flex-col h-full p-4">
				<SheetHeader className="border-b border-border m-0">
					<SheetTitle className="text-xl font-bold text-foreground flex items-center gap-2 m-0">
						Tu Carrito ({cartCount})
					</SheetTitle>
				</SheetHeader>

				<div className="flex-1 overflow-y-auto py-4 space-y-4 custom-scrollbar">
					{cart.length === 0 ? (
						<div className="text-center py-12 text-muted">
							El carrito está vacío.
						</div>
					) : (
						cart.map((item) => (
							<div
								key={item.id}
								className="flex gap-4 bg-secondary/30 p-3 rounded-lg border border-border/50"
							>
								{item.image && (
									<img
										src={item.image}
										alt={item.name}
										className="size-16 object-cover rounded bg-muted"
									/>
								)}
								<div className="flex-1 min-w-0">
									<h4 className="text-sm font-semibold text-foreground truncate">
										{item.name}
									</h4>
									<p className="text-sm font-medium text-blue-500 mt-0.5">
										${(item.price * item.quantity).toLocaleString("es-CO")}
									</p>
									<div className="flex items-center border border-input rounded-lg bg-background overflow-hidden mt-2 max-w-fit">
										<Button
											variant="ghost"
											size="icon"
											className="text-muted-foreground h-8 w-8 rounded-none border-r border-input hover:bg-accent cursor-pointer"
											onClick={() => updateQuantity(item.id, item.quantity - 1)}
											disabled={item.quantity <= 1}
										>
											<Minus className="h-3.5 w-3.5" />
										</Button>

										<span className="w-9 text-center font-semibold text-foreground text-xs">
											{item.quantity}
										</span>

										<Button
											variant="ghost"
											size="icon"
											className="text-muted-foreground h-8 w-8 rounded-none border-l border-input hover:bg-accent cursor-pointer"
											onClick={() => updateQuantity(item.id, item.quantity + 1)}
										>
											<Plus className="h-3.5 w-3.5" />
										</Button>
									</div>
								</div>
								<Button
									variant="destructive"
									size="icon"
									className="self-start"
									onClick={() => removeFromCart(item.id)}
								>
									<Trash2 className="size-4" />
								</Button>
							</div>
						))
					)}
				</div>

				{cart.length > 0 && (
					<div className="border-t border-border pt-4 space-y-4">
						<div className="flex justify-between items-center text-lg font-bold">
							<span className="text-foreground">Total:</span>
							<span className="text-blue-500">
								${cartTotal.toLocaleString("es-CO")}
							</span>
						</div>
						<Button
							className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 cursor-pointer"
							onClick={() => {
								setOpen(false);
								navigate({ to: "/checkout" });
							}}
						>
							Ir al Checkout
						</Button>
					</div>
				)}
			</SheetContent>
		</Sheet>
	);
};
