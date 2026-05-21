// src/components/ChatWidget.tsx
//
// Fuentes en index.html:
// <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">

import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "#/context/theme-context";
import { type Message, useChat } from "../../hooks/use-chat";

const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_KEY,
);

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface ProductCard {
	id: string;
	name: string;
	slug: string;
	price: number;
	compare_price: number | null;
	brand: string | null;
	image_url: string | null;
	avg_rating: number;
	categories: { name: string } | null;
}

interface RawProductCard extends Omit<ProductCard, "categories"> {
	categories: { name: string }[] | null;
}

interface ChatWidgetProps {
	userId?: string;
}

// ─── Hook productos ───────────────────────────────────────────────────────────

function useProductCards(ids: string[]) {
	const [products, setProducts] = useState<ProductCard[]>([]);

	useEffect(() => {
		if (!ids.length) {
			setProducts([]);
			return;
		}
		supabase
			.from("products_with_rating")
			.select(
				"id, name, slug, price, compare_price, brand, image_url, avg_rating, categories(name)",
			)
			.in("id", ids)
			.then(({ data }) => {
				const normalized = ((data as RawProductCard[]) ?? []).map(
					(p): ProductCard => ({
						...p,
						categories: Array.isArray(p.categories)
							? (p.categories[0] ?? null)
							: p.categories,
					}),
				);
				setProducts(normalized);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ids.join(",")]);

	return products;
}

// ─── Tokens de color por tema ─────────────────────────────────────────────────

function getTokens(dark: boolean) {
	return dark
		? {
				panelBg: "#0d1117",
				panelBorder: "rgba(59,130,246,0.15)",
				headerBg: "rgba(255,255,255,0.02)",
				headerBorder: "rgba(255,255,255,0.06)",
				msgBubbleBg: "rgba(255,255,255,0.06)",
				msgBubbleBorder: "rgba(255,255,255,0.08)",
				msgText: "rgba(255,255,255,0.88)",
				userBubbleBg: "linear-gradient(135deg, #3b82f6, #2563eb)",
				userText: "#ffffff",
				inputBg: "rgba(255,255,255,0.05)",
				inputBorder: "rgba(255,255,255,0.1)",
				inputFocus: "rgba(59,130,246,0.5)",
				inputText: "rgba(255,255,255,0.88)",
				inputPlaceholder: "rgba(255,255,255,0.3)",
				cardBg: "rgba(255,255,255,0.05)",
				cardBorder: "rgba(255,255,255,0.08)",
				cardHoverBg: "rgba(255,255,255,0.09)",
				cardName: "rgba(255,255,255,0.9)",
				cardCategory: "rgba(255,255,255,0.4)",
				cardPrice: "#60a5fa",
				cardDiscount: "#60a5fa",
				cardDiscountBg: "rgba(59,130,246,0.12)",
				labelText: "rgba(255,255,255,0.3)",
				avatarBg: "linear-gradient(135deg, #3b82f6, #2563eb)",
				avatarText: "#ffffff",
				btnClose: "rgba(255,255,255,0.3)",
				btnCloseHover: "rgba(255,255,255,0.7)",
				floatBg: "linear-gradient(135deg, #3b82f6, #2563eb)",
				floatOpenBg: "rgba(255,255,255,0.08)",
				floatShadow: "0 4px 24px rgba(59,130,246,0.4)",
				floatColor: "#ffffff",
				floatOpenColor: "rgba(255,255,255,0.7)",
				scrollbar: "rgba(255,255,255,0.08) transparent",
				shadow: "0 24px 80px rgba(0,0,0,0.7)",
				actionBg: "linear-gradient(135deg, #3b82f6, #2563eb)",
				actionText: "#ffffff",
			}
		: {
				panelBg: "#ffffff",
				panelBorder: "rgba(59,130,246,0.2)",
				headerBg: "#f8faff",
				headerBorder: "rgba(0,0,0,0.06)",
				msgBubbleBg: "#f1f5f9",
				msgBubbleBorder: "transparent",
				msgText: "#0f172a",
				userBubbleBg: "linear-gradient(135deg, #3b82f6, #2563eb)",
				userText: "#ffffff",
				inputBg: "#f1f5f9",
				inputBorder: "rgba(0,0,0,0.08)",
				inputFocus: "rgba(59,130,246,0.4)",
				inputText: "#0f172a",
				inputPlaceholder: "rgba(0,0,0,0.35)",
				cardBg: "#f8faff",
				cardBorder: "rgba(59,130,246,0.12)",
				cardHoverBg: "#eef2ff",
				cardName: "#0f172a",
				cardCategory: "#64748b",
				cardPrice: "#2563eb",
				cardDiscount: "#2563eb",
				cardDiscountBg: "rgba(37,99,235,0.08)",
				labelText: "#94a3b8",
				avatarBg: "linear-gradient(135deg, #3b82f6, #2563eb)",
				avatarText: "#ffffff",
				btnClose: "#94a3b8",
				btnCloseHover: "#0f172a",
				floatBg: "linear-gradient(135deg, #3b82f6, #2563eb)",
				floatOpenBg: "#e2e8f0",
				floatShadow: "0 4px 24px rgba(37,99,235,0.35)",
				floatColor: "#ffffff",
				floatOpenColor: "#64748b",
				scrollbar: "rgba(0,0,0,0.08) transparent",
				shadow: "0 24px 80px rgba(0,0,0,0.15)",
				actionBg: "linear-gradient(135deg, #3b82f6, #2563eb)",
				actionText: "#ffffff",
			};
}

// ─── ActionButton ─────────────────────────────────────────────────────────────

function ActionButton({
	id,
	label,
	t,
}: {
	id: string;
	label: string;
	t: ReturnType<typeof getTokens>;
}) {
	const navigate = useNavigate();
	return (
		<div style={{ paddingLeft: 36 }}>
			<button
				type="button"
				onClick={() =>
					navigate({
						to: "/product/$productId",
						params: { productId: id },
					})
				}
				style={{
					background: t.actionBg,
					border: "none",
					borderRadius: 10,
					padding: "8px 14px",
					color: t.actionText,
					fontSize: 12.5,
					fontWeight: 600,
					fontFamily: "'DM Sans', sans-serif",
					cursor: "pointer",
					display: "flex",
					alignItems: "center",
					gap: 6,
					transition: "opacity 0.2s, transform 0.15s",
					animation: "fadeSlideIn 0.3s ease 0.2s both",
				}}
				onMouseEnter={(e) => {
					(e.currentTarget as HTMLElement).style.opacity = "0.85";
					(e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
				}}
				onMouseLeave={(e) => {
					(e.currentTarget as HTMLElement).style.opacity = "1";
					(e.currentTarget as HTMLElement).style.transform = "translateY(0)";
				}}
			>
				<span>→</span>
				{label}
			</button>
		</div>
	);
}

// ─── ProductMiniCard ──────────────────────────────────────────────────────────

function ProductMiniCard({
	product,
	t,
}: {
	product: ProductCard;
	t: ReturnType<typeof getTokens>;
}) {
	const discount =
		product.compare_price && product.compare_price > product.price
			? Math.round((1 - product.price / product.compare_price) * 100)
			: null;

	return (
		<a
			href={`/product/${product.id}`}
			style={{
				display: "flex",
				alignItems: "center",
				gap: 10,
				padding: "10px 12px",
				background: t.cardBg,
				border: `1px solid ${t.cardBorder}`,
				borderRadius: 12,
				textDecoration: "none",
				color: "inherit",
				transition: "background 0.2s, transform 0.15s",
				cursor: "pointer",
			}}
			onMouseEnter={(e) => {
				(e.currentTarget as HTMLElement).style.background = t.cardHoverBg;
				(e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
			}}
			onMouseLeave={(e) => {
				(e.currentTarget as HTMLElement).style.background = t.cardBg;
				(e.currentTarget as HTMLElement).style.transform = "translateY(0)";
			}}
		>
			<div
				style={{
					width: 44,
					height: 44,
					borderRadius: 8,
					flexShrink: 0,
					background: t.inputBg,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					fontSize: 20,
					overflow: "hidden",
				}}
			>
				{product.image_url ? (
					<img
						src={product.image_url}
						alt={product.name}
						style={{ width: "100%", height: "100%", objectFit: "cover" }}
					/>
				) : (
					"🛍️"
				)}
			</div>
			<div style={{ flex: 1, minWidth: 0 }}>
				<div
					style={{
						fontSize: 12,
						fontWeight: 500,
						color: t.cardName,
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis",
						fontFamily: "'DM Sans', sans-serif",
					}}
				>
					{product.name}
				</div>
				<div style={{ fontSize: 11, color: t.cardCategory, marginTop: 2 }}>
					{product.categories?.name}
				</div>
			</div>
			<div style={{ textAlign: "right", flexShrink: 0 }}>
				<div style={{ fontSize: 13, fontWeight: 600, color: t.cardPrice }}>
					${product.price.toLocaleString("es-CO")}
				</div>
				{discount && (
					<div
						style={{
							fontSize: 10,
							background: t.cardDiscountBg,
							color: t.cardDiscount,
							padding: "1px 5px",
							borderRadius: 4,
							marginTop: 2,
						}}
					>
						-{discount}%
					</div>
				)}
			</div>
		</a>
	);
}

// ─── MessageBubble ────────────────────────────────────────────────────────────

function MessageBubble({
	message,
	t,
}: {
	message: Message;
	t: ReturnType<typeof getTokens>;
}) {
	const isUser = message.role === "user";
	const products = useProductCards(message.suggestedProductIds ?? []);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: isUser ? "flex-end" : "flex-start",
				gap: 8,
				animation: "fadeSlideIn 0.25s ease forwards",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "flex-end",
					gap: 8,
					maxWidth: "85%",
				}}
			>
				{!isUser && (
					<div
						style={{
							width: 28,
							height: 28,
							borderRadius: "50%",
							flexShrink: 0,
							background: t.avatarBg,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontSize: 13,
							fontWeight: 700,
							color: t.avatarText,
							fontFamily: "'DM Serif Display', serif",
						}}
					>
						L
					</div>
				)}
				<div
					style={{
						padding: "10px 14px",
						borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
						background: isUser ? t.userBubbleBg : t.msgBubbleBg,
						border: `1px solid ${isUser ? "transparent" : t.msgBubbleBorder}`,
						color: isUser ? t.userText : t.msgText,
						fontSize: 13.5,
						lineHeight: 1.55,
						fontFamily: "'DM Sans', sans-serif",
						fontWeight: isUser ? 500 : 400,
						whiteSpace: "pre-wrap",
					}}
				>
					{message.content}
				</div>
			</div>

			{products.length > 0 && (
				<div
					style={{
						width: "100%",
						display: "flex",
						flexDirection: "column",
						gap: 6,
						paddingLeft: 36,
						animation: "fadeSlideIn 0.35s ease 0.15s both",
					}}
				>
					<div
						style={{
							fontSize: 11,
							color: t.labelText,
							marginBottom: 2,
							fontFamily: "'DM Sans', sans-serif",
						}}
					>
						Productos que podrían interesarte
					</div>
					{products.map((p) => (
						<ProductMiniCard key={p.id} product={p} t={t} />
					))}
				</div>
			)}

			{message.action?.type === "navigate" && (
				<ActionButton
					slug={message.action.slug}
					label={message.action.label}
					t={t}
				/>
			)}
		</div>
	);
}

// ─── TypingIndicator ──────────────────────────────────────────────────────────

function TypingIndicator({ t }: { t: ReturnType<typeof getTokens> }) {
	return (
		<div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
			<div
				style={{
					width: 28,
					height: 28,
					borderRadius: "50%",
					background: t.avatarBg,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					fontSize: 13,
					fontWeight: 700,
					color: t.avatarText,
					fontFamily: "'DM Serif Display', serif",
				}}
			>
				L
			</div>
			<div
				style={{
					padding: "12px 16px",
					borderRadius: "18px 18px 18px 4px",
					background: t.msgBubbleBg,
					border: `1px solid ${t.msgBubbleBorder}`,
					display: "flex",
					gap: 4,
					alignItems: "center",
				}}
			>
				{[0, 1, 2].map((i) => (
					<div
						key={i}
						style={{
							width: 6,
							height: 6,
							borderRadius: "50%",
							background: t.cardCategory,
							animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite`,
						}}
					/>
				))}
			</div>
		</div>
	);
}

// ─── ChatWidget ───────────────────────────────────────────────────────────────

export function ChatWidget({ userId }: ChatWidgetProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [input, setInput] = useState("");
	const { theme } = useTheme();
	const dark = theme === "dark";
	const t = getTokens(dark);
	const { messages, isLoading, sendMessage, clearChat } = useChat({ userId });
	const bottomRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messages.length, isLoading]);

	useEffect(() => {
		if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
	}, [isOpen]);

	const handleSend = () => {
		if (!input.trim()) return;
		sendMessage(input);
		setInput("");
	};

	return (
		<>
			<style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30%            { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes panelIn {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes bubblePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.4); }
          50%       { box-shadow: 0 0 0 10px rgba(59,130,246,0); }
        }
        .lumi-input:focus { outline: none; }
        .lumi-input::placeholder { color: ${t.inputPlaceholder}; }
        .lumi-scroll::-webkit-scrollbar { width: 4px; }
        .lumi-scroll::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.2); border-radius: 4px; }
      `}</style>

			{/* Panel */}
			{isOpen && (
				<div
					style={{
						position: "fixed",
						bottom: 90,
						right: 24,
						zIndex: 9998,
						width: 360,
						height: 560,
						background: t.panelBg,
						border: `1px solid ${t.panelBorder}`,
						borderRadius: 20,
						display: "flex",
						flexDirection: "column",
						boxShadow: t.shadow,
						animation: "panelIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards",
						overflow: "hidden",
					}}
				>
					{/* Header */}
					<div
						style={{
							padding: "14px 16px",
							borderBottom: `1px solid ${t.headerBorder}`,
							display: "flex",
							alignItems: "center",
							gap: 10,
							background: t.headerBg,
						}}
					>
						<div
							style={{
								width: 34,
								height: 34,
								borderRadius: "50%",
								background: t.avatarBg,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontSize: 15,
								fontWeight: 700,
								color: t.avatarText,
								fontFamily: "'DM Serif Display', serif",
								flexShrink: 0,
							}}
						>
							L
						</div>
						<div>
							<div
								style={{
									fontFamily: "'DM Sans', sans-serif",
									fontWeight: 600,
									fontSize: 14,
									color: t.msgText,
								}}
							>
								Lumi
							</div>
							<div
								style={{
									fontSize: 11,
									color: t.labelText,
									fontFamily: "'DM Sans', sans-serif",
									display: "flex",
									alignItems: "center",
									gap: 4,
								}}
							>
								<span
									style={{
										width: 6,
										height: 6,
										borderRadius: "50%",
										background: "#22c55e",
										display: "inline-block",
									}}
								/>
								Asistente de compras
							</div>
						</div>
						<div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
							{[
								{ icon: "↺", title: "Nueva conversación", action: clearChat },
								{ icon: "×", title: "Cerrar", action: () => setIsOpen(false) },
							].map(({ icon, title, action }) => (
								<button
									key={icon}
									type="button"
									onClick={action}
									title={title}
									style={{
										background: "none",
										border: "none",
										cursor: "pointer",
										color: t.btnClose,
										fontSize: icon === "×" ? 20 : 16,
										padding: "2px 4px",
										borderRadius: 6,
										transition: "color 0.2s",
										fontFamily: "sans-serif",
									}}
									onMouseEnter={(e) =>
										(e.currentTarget.style.color = t.btnCloseHover)
									}
									onMouseLeave={(e) =>
										(e.currentTarget.style.color = t.btnClose)
									}
								>
									{icon}
								</button>
							))}
						</div>
					</div>

					{/* Mensajes */}
					<div
						className="lumi-scroll"
						style={{
							flex: 1,
							overflowY: "auto",
							padding: "14px 12px",
							display: "flex",
							flexDirection: "column",
							gap: 12,
							scrollbarWidth: "thin",
							scrollbarColor: t.scrollbar,
						}}
					>
						{messages.map((msg) => (
							<MessageBubble key={msg.id} message={msg} t={t} />
						))}
						{isLoading && <TypingIndicator t={t} />}
						<div ref={bottomRef} />
					</div>

					{/* Input */}
					<div
						style={{
							padding: "10px 12px",
							borderTop: `1px solid ${t.headerBorder}`,
							display: "flex",
							gap: 8,
							alignItems: "center",
							background: t.headerBg,
						}}
					>
						<input
							ref={inputRef}
							className="lumi-input"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={(e) =>
								e.key === "Enter" && !e.shiftKey && handleSend()
							}
							placeholder="Escribe lo que buscas..."
							disabled={isLoading}
							style={{
								flex: 1,
								background: t.inputBg,
								border: `1px solid ${t.inputBorder}`,
								borderRadius: 10,
								padding: "9px 13px",
								color: t.inputText,
								fontSize: 13.5,
								fontFamily: "'DM Sans', sans-serif",
								transition: "border-color 0.2s",
							}}
							onFocus={(e) => (e.target.style.borderColor = t.inputFocus)}
							onBlur={(e) => (e.target.style.borderColor = t.inputBorder)}
						/>
						<button
							type="button"
							onClick={handleSend}
							disabled={isLoading || !input.trim()}
							style={{
								width: 36,
								height: 36,
								borderRadius: 10,
								border: "none",
								background: input.trim() && !isLoading ? t.actionBg : t.inputBg,
								cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontSize: 16,
								transition: "all 0.2s",
								flexShrink: 0,
								color: input.trim() && !isLoading ? t.actionText : t.labelText,
							}}
						>
							↑
						</button>
					</div>
				</div>
			)}

			{/* Botón flotante */}
			<button
				type="button"
				onClick={() => setIsOpen((o) => !o)}
				style={{
					position: "fixed",
					bottom: 24,
					right: 24,
					zIndex: 9999,
					width: 52,
					height: 52,
					borderRadius: "50%",
					border: "none",
					background: isOpen ? t.floatOpenBg : t.floatBg,
					cursor: "pointer",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					fontSize: isOpen ? 20 : 20,
					boxShadow: isOpen ? "none" : t.floatShadow,
					animation: !isOpen ? "bubblePulse 2.5s ease-in-out infinite" : "none",
					transition: "background 0.3s, box-shadow 0.3s",
					color: isOpen ? t.floatOpenColor : t.floatColor,
				}}
				title={isOpen ? "Cerrar chat" : "Hablar con Lumi"}
			>
				{isOpen ? "×" : "✦"}
			</button>
		</>
	);
}
