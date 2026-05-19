import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export const useTheme = () => {
	const [theme, setTheme] = useState<Theme>(
		() => (localStorage.getItem("theme") as Theme) ?? "light",
	);

	useEffect(() => {
		localStorage.setItem("theme", theme);
		document.documentElement.classList.toggle("dark", theme === "dark");
	}, [theme]);

	const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

	return { theme, setTheme, toggleTheme };
};
