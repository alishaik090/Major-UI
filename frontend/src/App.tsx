import { Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout";
import { AboutPage } from "./pages/about-page";
import { DashboardPage } from "./pages/dashboard-page";
import { HomePage } from "./pages/home-page";
import { NotFoundPage } from "./pages/not-found-page";
import { ResultPage } from "./pages/result-page";

export default function App() {
  return <AppShell><Routes><Route path="/" element={<HomePage />} /><Route path="/about" element={<AboutPage />} /><Route path="/dashboard" element={<DashboardPage />} /><Route path="/result" element={<ResultPage />} /><Route path="*" element={<NotFoundPage />} /></Routes></AppShell>;
}
