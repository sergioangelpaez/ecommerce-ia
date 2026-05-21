import { createFileRoute, Link } from "@tanstack/react-router";
import {
	AlertTriangle,
	ArrowLeft,
	CheckCircle2,
	CreditCard,
	Loader2,
} from "lucide-react";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import { useCart } from "#/context/cart-context";

export const Route = createFileRoute("/_layout/checkout")({
	component: CheckoutComponent,
});

function CheckoutComponent() {
	const { cart, cartTotal, clearCart } = useCart();
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [errorMessage, setErrorMessage] = useState("");

	const handleFakePayment = async () => {
		if (cart.length === 0) return;

		setStatus("loading");
		setErrorMessage("");

		try {
			await new Promise((resolve, reject) => {
				setTimeout(() => {
					const isSuccess = Math.random() > 0.5;
					if (isSuccess) {
						resolve(true);
					} else {
						reject(
							new Error(
								"Ocurrió un error al procesar tu pago. Comunícate con tu banco para más información.",
							),
						);
					}
				}, 2500);
			});

			setStatus("success");
			clearCart();
		} catch (error: any) {
			setStatus("error");
			setErrorMessage(
				error.message || "Ocurrió un error inesperado al procesar tu pago.",
			);
		}
	};

	if (status === "success") {
		return (
			<div className="max-w-md mx-auto text-center py-16 space-y-6 animate-in fade-in duration-300">
				<div className="inline-flex items-center justify-center size-16 rounded-full bg-emerald-500/10 text-emerald-500">
					<CheckCircle2 className="size-12" />
				</div>
				<h2 className="text-3xl font-bold text-foreground">
					¡Pago Procesado Exitosamente!
				</h2>
				<p className="text-muted">
					Tu orden ha sido generada correctamente. Toda la información fue
					enviada a tu correo simulado.
				</p>
				<Button
					asChild
					className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
				>
					<Link to="/catalog">Volver al catálogo</Link>
				</Button>
			</div>
		);
	}

	return (
		<div className="max-w-5xl mx-auto py-8 px-4">
			<Link
				to="/catalog"
				className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground mb-6 transition-colors"
			>
				<ArrowLeft className="size-4" /> Volver al catálogo
			</Link>

			<h1 className="text-3xl font-bold text-foreground mb-8">
				Resumen de tu Orden
			</h1>

			{cart.length === 0 && status !== "loading" ? (
				<div className="text-center py-12 bg-secondary/20 border border-border rounded-xl">
					<p className="text-muted mb-4">
						No tienes productos en tu carrito para procesar.
					</p>
					<Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
						<Link to="/catalog">Ir a buscar productos</Link>
					</Button>
				</div>
			) : (
				<div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
					<div className="space-y-4 border border-border bg-background p-6 rounded-xl">
						<h3 className="text-lg font-semibold border-b border-border pb-3">
							Productos
						</h3>
						<div className="divide-y divide-border">
							{cart.map((item) => (
								<div
									key={item.id}
									className="flex items-center gap-4 py-4 first:pt-0 last:pb-0 w-full"
								>
									{item.image && (
										<div className="size-16 rounded-lg overflow-hidden bg-muted border border-border shrink-0">
											<img
												src={item.image}
												alt={item.name}
												className="w-full h-full object-cover"
											/>
										</div>
									)}

									<div className="flex flex-col gap-0.5 min-w-0 flex-1">
										<h4 className="font-semibold text-sm text-foreground truncate uppercase">
											{item.name}
										</h4>
										<p className="text-xs text-muted">
											Cantidad:{" "}
											<span className="font-medium text">{item.quantity}</span>
										</p>
									</div>

									<div className="text-right shrink-0 ml-auto">
										<span className="font-bold text-sm text-foreground">
											${(item.price * item.quantity).toLocaleString("es-CO")}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="space-y-4">
						<div className="border border-border bg-card p-6 rounded-xl space-y-4 shadow-sm">
							<h3 className="text-lg font-semibold border-b border-border pb-3">
								Resumen de Pago
							</h3>

							<div className="space-y-2 text-sm">
								<div className="flex justify-between text-muted">
									<span>Subtotal</span>
									<span>${cartTotal.toLocaleString("es-CO")}</span>
								</div>
								<div className="flex justify-between text-muted">
									<span>Envío</span>
									<span className="text-emerald-500 font-medium">Gratis</span>
								</div>
								<div className="border-t border-border my-2 pt-2 flex justify-between font-bold text-base text-foreground">
									<span>Total M.N.</span>
									<span className="text-blue-500">
										${cartTotal.toLocaleString("es-CO")}
									</span>
								</div>
							</div>

							{status === "error" && (
								<div className="flex gap-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded-lg animate-in shake-1">
									<AlertTriangle className="size-5 shrink-0 mt-0.5" />
									<div>
										<p className="font-semibold">Error en el pago</p>
										<p className="text-xs opacity-90">{errorMessage}</p>
									</div>
								</div>
							)}

							<Button
								className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-70"
								onClick={handleFakePayment}
								disabled={status === "loading"}
							>
								{status === "loading" ? (
									<>
										<Loader2 className="size-5 animate-spin" />
										Procesando transaccion...
									</>
								) : (
									<>
										<CreditCard className="size-5" />
										Pagar
									</>
								)}
							</Button>

							<p className="text-[10px] text-center text-muted mt-2">
								* Nota: Este botón simula un entorno real. Tiene un 25% de
								probabilidad de fallar para que pruebes los flujos de manejo de
								errores de interfaz.
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
