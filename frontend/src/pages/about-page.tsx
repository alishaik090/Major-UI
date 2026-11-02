import { GitBranch, HeartPulse, Layers3, UsersRound } from "lucide-react";
import { Card } from "../components/ui/card";

const pillars = [
  { icon: HeartPulse, title: "Project goal", body: "Create a calm, consistent entry point for independently built medical-image analysis services." },
  { icon: Layers3, title: "Architecture", body: "The React client calls an Express gateway. The gateway forwards valid requests only to configured organ services." },
  { icon: GitBranch, title: "Workflow", body: "Image upload → organ selection → gateway validation → configured service → transparent result display." },
];
const team = ["Brain Developer", "Kidney Developer", "Retina Developer", "Guide", "College"];

export function AboutPage() {
  return <main className="mx-auto max-w-7xl px-5 py-14"><p className="text-sm font-bold uppercase tracking-wider text-teal-600">About the platform</p><h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">A service boundary designed for evolving clinical research workflows.</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">MedScope AI is an interface and API gateway, not a medical model. Each organ integration remains independently owned, configured, deployed, and evaluated.</p><section className="mt-12 grid gap-5 md:grid-cols-3">{pillars.map(({ icon: Icon, title, body }) => <Card key={title}><Icon className="text-teal-600" /><h2 className="mt-4 text-lg font-bold">{title}</h2><p className="mt-2 leading-6 text-slate-600 dark:text-slate-300">{body}</p></Card>)}</section><section className="mt-12"><div className="flex items-center gap-3"><UsersRound className="text-teal-600" /><h2 className="text-2xl font-bold">Meet the team</h2></div><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{team.map((member) => <Card key={member} className="p-4"><p className="text-sm font-bold">{member}</p><p className="mt-1 text-sm text-slate-500">Placeholder — to be added</p></Card>)}</div></section></main>;
}
