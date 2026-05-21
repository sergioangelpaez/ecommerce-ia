// src/hooks/useChat.ts

import { useCallback, useState } from "react";

export interface ChatAction {
	type: "navigate";
	slug: string;
	label: string;
}

export interface Message {
	id: string;
	role: "user" | "assistant";
	content: string;
	suggestedProductIds?: string[];
	action?: ChatAction | null;
	timestamp: Date;
	isWelcome?: boolean;
}

interface UseChatOptions {
	userId?: string;
}

interface UseChatReturn {
	messages: Message[];
	isLoading: boolean;
	error: string | null;
	sendMessage: (content: string) => Promise<void>;
	clearChat: () => void;
}

const WELCOME: Message = {
	id: crypto.randomUUID(),
	role: "assistant",
	content:
		"¡Hola! Soy Lumi 👋 Tu asistente de compras. ¿Qué estás buscando hoy?",
	timestamp: new Date(),
	isWelcome: true,
};

export function useChat({ userId }: UseChatOptions = {}): UseChatReturn {
	const [messages, setMessages] = useState<Message[]>([WELCOME]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const sendMessage = useCallback(
		async (content: string) => {
			if (!content.trim() || isLoading) return;
			setError(null);

			const userMessage: Message = {
				id: crypto.randomUUID(),
				role: "user",
				content: content.trim(),
				timestamp: new Date(),
			};

			setMessages((prev) => [...prev, userMessage]);
			setIsLoading(true);

			try {
				// Excluir el mensaje de bienvenida del historial que enviamos a la API
				const history = [...messages, userMessage]
					.filter((m) => !m.isWelcome)
					.map((m) => ({ role: m.role, content: m.content }));

				const res = await fetch("/api/chat", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ messages: history, userId }),
				});

				if (!res.ok) throw new Error(`Error ${res.status}`);

				const data = await res.json();

				const assistantMessage: Message = {
					id: crypto.randomUUID(),
					role: "assistant",
					content: data.message,
					suggestedProductIds: data.suggestedProductIds ?? [],
					action: data.action ?? null, // ← acción de navegación opcional
					timestamp: new Date(),
				};

				setMessages((prev) => [...prev, assistantMessage]);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Error desconocido");
				setMessages((prev) => [
					...prev,
					{
						id: crypto.randomUUID(),
						role: "assistant",
						content:
							"Lo siento, tuve un problema al procesar tu mensaje. ¿Puedes intentarlo de nuevo?",
						timestamp: new Date(),
					},
				]);
			} finally {
				setIsLoading(false);
			}
		},
		[messages, isLoading, userId],
	);

	const clearChat = useCallback(() => {
		setMessages([
			{
				...WELCOME,
				id: crypto.randomUUID(),
				timestamp: new Date(),
				isWelcome: true,
			},
		]);
		setError(null);
	}, []);

	return { messages, isLoading, error, sendMessage, clearChat };
}
