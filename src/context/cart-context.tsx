import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

export interface CartItem {
	id: string;
	name: string;
	price: number;
	image?: string;
	quantity: number;
}

interface CartContextType {
	cart: CartItem[];
	addToCart: (product: Omit<CartItem, "quantity">) => void;
	removeFromCart: (id: string) => void;
	updateQuantity: (id: string, quantity: number) => void;
	clearCart: () => void;
	cartCount: number;
	cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [cart, setCart] = useState<CartItem[]>(() => {
		const saved = localStorage.getItem("cart");
		return saved ? JSON.parse(saved) : [];
	});

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);

	const addToCart = (product: Omit<CartItem, "quantity">) => {
		setCart((prev) => {
			const exists = prev.find((item) => item.id === product.id);
			if (exists) {
				return prev.map((item) =>
					item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item,
				);
			}
			return [...prev, { ...product, quantity: 1 }];
		});
	};

	const removeFromCart = (id: string) => {
		setCart((prev) => prev.filter((item) => item.id !== id));
	};

	const updateQuantity = (id: string, quantity: number) => {
		if (quantity <= 0) {
			removeFromCart(id);
			return;
		}
		setCart((prev) =>
			prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
		);
	};

	const clearCart = () => setCart([]);

	const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
	const cartTotal = cart.reduce(
		(total, item) => total + item.price * item.quantity,
		0,
	);

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
				updateQuantity,
				clearCart,
				cartCount,
				cartTotal,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context)
		throw new Error("useCart debe usarse dentro de un CartProvider");
	return context;
};
