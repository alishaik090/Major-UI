import { Activity, BrainCircuit, Menu, Moon, ShieldCheck, Sun, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { routes } from "../config/routes";
import { cn } from "../lib/utils";
import { useTheme } from "../hooks/use-theme";
import { Button } from "./ui/button";

const navigation = [
  { label: "Overview", to: routes.home },
  { label: "About", to: routes.about },
  { label: "Analysis", to: routes.dashboard },
];

export function ThemeToggle() {
  const [theme, toggleTheme] = useTheme();
  return <Button variant="ghost" className="h-10 w-10 rounded-full p-0" onClick={toggleTheme} aria-label="Toggle color theme">{theme === "light" ? <Moon size={18} /> : <Sun size={18} />}</Button>;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/75 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/75">
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
      <Link to={routes.home} className="flex items-center gap-2 font-bold text-ink dark:text-white"><span className="grid h-9 w-9 place-items-center rounded-xl bg-teal-600 text-white"><Activity size={20} /></span>MedScope AI</Link>
      <nav className="hidden items-center gap-1 md:flex">{navigation.map((item) => <NavLink key={item.to} to={item.to} className={({ isActive }) => cn("rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:text-teal-700 dark:text-slate-300", isActive && "bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300")}>{item.label}</NavLink>)}<ThemeToggle /></nav>
      <Button variant="ghost" className="md:hidden" onClick={() => setOpen(!open)} aria-label="Open navigation">{open ? <X /> : <Menu />}</Button>
    </div>
    {open && <nav className="border-t border-slate-200 bg-white px-5 py-3 dark:border-slate-800 dark:bg-slate-950 md:hidden">{navigation.map((item) => <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 font-medium text-slate-700 dark:text-slate-200">{item.label}</NavLink>)}<ThemeToggle /></nav>}
  </header>;
}

export function Sidebar() {
  return <aside className="hidden w-56 shrink-0 border-r border-slate-200 px-3 py-6 dark:border-slate-800 lg:block">
    <p className="px-3 pb-3 text-xs font-bold uppercase tracking-widest text-slate-400">Workspace</p>
    {navigation.map((item) => <NavLink key={item.to} to={item.to} className={({ isActive }) => cn("mb-1 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300", isActive && "bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300")}>{item.to === routes.dashboard ? <BrainCircuit size={17} /> : <ShieldCheck size={17} />}{item.label}</NavLink>)}
  </aside>;
}

export function Footer() {
  return <footer className="border-t border-slate-200 bg-white/70 dark:border-slate-800 dark:bg-slate-950"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-7 text-sm text-slate-500 sm:flex-row sm:justify-between"><span>© {new Date().getFullYear()} MedScope AI</span><span>Gateway interface only. Connected services remain independently governed.</span></div></footer>;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100"><Navbar />{children}<Footer /></div>;
}
