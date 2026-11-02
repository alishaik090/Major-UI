import { useEffect, useState } from "react";

type Theme = "light" | "dark";
const storageKey = "medscope-theme";

function initialTheme(): Theme {
  const saved = localStorage.getItem(storageKey);
  return saved === "dark" || saved === "light" ? saved : "light";
}

export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(storageKey, theme);
  }, [theme]);
  return [theme, () => setTheme((current) => (current === "light" ? "dark" : "light"))];
}
