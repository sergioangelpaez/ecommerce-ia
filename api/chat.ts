// api/chat.ts
//
// Vercel Serverless Function: POST /api/chat
//
// Variables de entorno requeridas (.env.local):
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
//   GROQ_API_KEY
//
// Instalación:
//   npm install groq-sdk @supabase/supabase-js @vercel/node

import Groq from "groq-sdk";
import { createClient } from "@supabase/supabase-js";
import type { VercelRequest, VercelResponse } from "@vercel/node";

// ─── Clientes ────────────────────────────────────────────────────────────────

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface RequestBody {
  messages: ChatMessage[];
  userId?: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compare_price: number | null;
  stock: number;
  brand: string | null;
  tags: string[];
  avg_rating: number;
  review_count: number;
  categories: { name: string } | null;
}

interface RawProduct extends Omit<Product, "categories"> {
  categories: { name: string }[] | null;
}

// Acción que el modelo puede incluir en su respuesta
export interface ChatAction {
  type: "navigate";
  slug: string;       // slug del producto, ej: "samsung-galaxy-s24-fe"
  label: string;      // texto del botón, ej: "Ver Samsung Galaxy S24 FE"
}

// ─── Búsqueda de productos en Supabase ───────────────────────────────────────

async function searchProducts(query: string): Promise<Product[]> {
  const SELECT = `
    id, name, slug, description, price, compare_price,
    stock, brand, tags, avg_rating, review_count,
    categories ( name )
  `;

  // Palabras que indican intención genérica, no un producto específico
  const genericIntents = [
    "recomienda", "recomiéndame", "sugiere", "sugiéreme",
    "qué hay", "que hay", "qué tienen", "que tienen",
    "muéstrame", "muestrame", "ver productos", "ver todo",
    "qué venden", "que venden", "novedades", "populares",
    "destacados", "ofertas", "algo", "cualquier",
  ];

  const isGeneric = genericIntents.some((w) =>
    query.toLowerCase().includes(w)
  );

  // Si la intención es genérica, devolver productos destacados directamente
  if (isGeneric) {
    const { data } = await supabase
      .from("products_with_rating")
      .select(SELECT)
      .eq("is_active", true)
      .gt("stock", 0)
      .order("avg_rating", { ascending: false })
      .limit(6);

    return ((data as RawProduct[]) ?? []).map((p): Product => ({
      ...p,
      categories: Array.isArray(p.categories)
        ? (p.categories[0] ?? null)
        : p.categories,
    }));
  }

  // Búsqueda normal por texto y tags
  const { data: textResults } = await supabase
    .from("products_with_rating")
    .select(SELECT)
    .textSearch("name", query, { config: "spanish" })
    .eq("is_active", true)
    .gt("stock", 0)
    .order("avg_rating", { ascending: false })
    .limit(5);

  const keywords = query
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 3);

  const { data: tagResults } = keywords.length
    ? await supabase
        .from("products_with_rating")
        .select(SELECT)
        .overlaps("tags", keywords)
        .eq("is_active", true)
        .gt("stock", 0)
        .order("avg_rating", { ascending: false })
        .limit(5)
    : { data: [] };

  const combined = [
    ...((textResults as RawProduct[]) ?? []),
    ...((tagResults as RawProduct[]) ?? []),
  ];
  const seen = new Set<string>();
  const unique = combined
    .filter((p) => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    })
    .slice(0, 6)
    .map((p): Product => ({
      ...p,
      categories: Array.isArray(p.categories)
        ? (p.categories[0] ?? null)
        : p.categories,
    }));

  // Fallback: si no encontró nada específico, devolver destacados
  if (!unique.length) {
    const { data } = await supabase
      .from("products_with_rating")
      .select(SELECT)
      .eq("is_active", true)
      .gt("stock", 0)
      .order("avg_rating", { ascending: false })
      .limit(6);

    return ((data as RawProduct[]) ?? []).map((p): Product => ({
      ...p,
      categories: Array.isArray(p.categories)
        ? (p.categories[0] ?? null)
        : p.categories,
    }));
  }

  return unique;
}

// ─── Formatear productos para el contexto del LLM ────────────────────────────

function formatProductsForPrompt(products: Product[]): string {
  if (!products.length) return "No se encontraron productos relevantes.";

  return products
    .map((p) => {
      const discount =
        p.compare_price && p.compare_price > p.price
          ? ` (antes $${p.compare_price.toLocaleString("es-CO")})`
          : "";
      const rating =
        p.avg_rating > 0
          ? ` | Rating: ${p.avg_rating}/5 (${p.review_count} reseñas)`
          : "";
      const stock = p.stock < 5 ? ` | Solo ${p.stock} en stock` : "";

      return [
        `• ${p.name}`,
        `  ID: ${p.id}`,
        `  Slug: ${p.slug}`,
        `  Categoría: ${p.categories?.name ?? "General"}`,
        `  Precio: $${p.price.toLocaleString("es-CO")}${discount}`,
        `  Marca: ${p.brand ?? "Sin marca"}${rating}${stock}`,
        `  Descripción: ${p.description}`,
        `  Tags: ${p.tags.join(", ")}`,
      ].join("\n");
    })
    .join("\n\n");
}

// ─── System prompt ────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `Eres Lumi, el asistente de ventas virtual de esta tienda online.
Tu objetivo es ayudar al usuario a encontrar exactamente lo que necesita,
actuando como un vendedor experto, empático y genuinamente útil.

PERSONALIDAD:
- Cálido y conversacional, nunca robótico ni genérico.
- Haces preguntas inteligentes para entender mejor la necesidad del usuario
  (para quién es, qué uso le dará, cuál es su presupuesto).
- Eres honesto: si un producto no encaja bien, lo dices y sugieres uno mejor.
- Usas emojis con moderación para dar calidez, no para decorar.

FORMATO DE RESPUESTA:
- Responde siempre en español.
- Cuando recomiendes productos, menciona su nombre exacto y precio.
- Sé conciso pero completo. Máximo 3 productos por respuesta a menos que
  el usuario pida más opciones.
- No menciones IDs de productos al usuario; son solo para uso interno.

ACCIONES DE NAVEGACIÓN:
Cuando quieras llevar al usuario a la página de un producto específico
(por ejemplo, después de recomendarlo con entusiasmo), incluye al FINAL
de tu respuesta un bloque JSON con este formato exacto, en una línea separada:

ACTION:{"type":"navigate","slug":"slug-del-producto","label":"Ver nombre del producto"}

Usa esto con moderación — solo cuando genuinamente quieras invitar al usuario
a ver un producto en particular. No lo uses en cada mensaje.

CONTEXTO DE PRODUCTOS:
Tienes acceso a los productos disponibles en la tienda. Úsalos para hacer
recomendaciones específicas y reales. No inventes productos que no estén
en el catálogo proporcionado.`;

// ─── Parsear acción del texto de respuesta ────────────────────────────────────

function parseAction(text: string): { clean: string; action: ChatAction | null } {
  const actionMatch = text.match(/ACTION:(\{.*\})\s*$/m);
  if (!actionMatch) return { clean: text.trim(), action: null };

  try {
    const action = JSON.parse(actionMatch[1]) as ChatAction;
    const clean = text.replace(/ACTION:\{.*\}\s*$/m, "").trim();
    return { clean, action };
  } catch {
    return { clean: text.trim(), action: null };
  }
}

// ─── Handler principal ────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { messages, userId }: RequestBody = req.body;

    if (!messages || messages.length === 0) {
      return res.status(400).json({ error: "messages requerido" });
    }

    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
    const query = lastUserMessage?.content ?? "";

    const products = await searchProducts(query);
    const productsContext = formatProductsForPrompt(products);

    const systemWithContext = `${SYSTEM_PROMPT}

---
PRODUCTOS DISPONIBLES RELEVANTES A LA CONSULTA DEL USUARIO:
${productsContext}
---`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemWithContext },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
      max_tokens: 1024,
      temperature: 0.7,
    });

    const rawText = response.choices[0].message.content ?? "";

    // Separar el texto limpio de la acción opcional
    const { clean: assistantMessage, action } = parseAction(rawText);

    if (userId) {
      await supabase.from("user_interactions").insert({
        user_id: userId,
        type: "chat_message",
        search_query: query,
        metadata: {
          products_shown: products.map((p) => p.id),
          message_count: messages.length,
        },
      });
    }

    return res.status(200).json({
      message: assistantMessage,
      suggestedProductIds: products.map((p) => p.id),
      action: action ?? null,   // { type: "navigate", slug, label } | null
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}