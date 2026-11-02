import { ArrowLeft, Download, ImageOff } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { PredictionCard, ResultViewer, StatusBadge } from "../components/analysis";
import { Button } from "../components/ui/button";
import { routes } from "../config/routes";
import { formatDuration } from "../lib/utils";
import type { AnalysisSnapshot } from "../types/analysis";

function textValue(value: unknown, fallback = "Not supplied by connected service"): string { return typeof value === "string" || typeof value === "number" ? String(value) : fallback; }
function numericValue(value: unknown): number | undefined { return typeof value === "number" ? value : undefined; }

export function ResultPage() {
  const location = useLocation();
  const snapshot = location.state as AnalysisSnapshot | null;
  if (!snapshot?.analysis || !snapshot.imageUrl) return <main className="mx-auto grid min-h-[60vh] max-w-2xl place-items-center px-5 text-center"><div><ImageOff className="mx-auto text-slate-400" size={42} /><h1 className="mt-5 text-2xl font-bold">No analysis result is open.</h1><p className="mt-2 text-slate-600 dark:text-slate-300">Start a new request from the analysis workspace.</p><Link className="mt-6 inline-flex rounded-xl bg-teal-600 px-4 py-2.5 font-bold text-white" to={routes.dashboard}>Open analysis</Link></div></main>;

  const { analysis } = snapshot;
  const result = analysis.result;
  const label = textValue(result.prediction_label ?? result.label ?? result.prediction);
  const confidence = numericValue(result.confidence ?? result.score);
  const processingTime = numericValue(result.processing_time_ms ?? result.processingTimeMs);
  const model = textValue(result.model_used ?? result.model ?? analysis.service, analysis.service);
  const download = () => { const payload = new Blob([JSON.stringify(analysis, null, 2)], { type: "application/json" }); const url = URL.createObjectURL(payload); const anchor = document.createElement("a"); anchor.href = url; anchor.download = `${snapshot.fileName}-result.json`; anchor.click(); URL.revokeObjectURL(url); };

  return <main className="mx-auto max-w-6xl px-5 py-12"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start"><div><Link to={routes.dashboard} className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 dark:text-teal-300"><ArrowLeft size={16} />Back to analysis</Link><div className="mt-4 flex items-center gap-3"><h1 className="text-4xl font-black tracking-tight">Analysis result</h1><StatusBadge connected /></div><p className="mt-2 text-slate-600 dark:text-slate-300">Received from the configured {analysis.service} service.</p></div><Button variant="secondary" onClick={download}><Download size={16} />Download result</Button></div><section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><PredictionCard label="Prediction label" value={label} /><PredictionCard label="Confidence" value={confidence === undefined ? "Not supplied" : `${(confidence * 100).toFixed(1)}%`} /><PredictionCard label="Processing time" value={formatDuration(processingTime)} /><PredictionCard label="Model used" value={model} /></section><section className="mt-6"><ResultViewer imageUrl={snapshot.imageUrl} result={result} /></section><p className="mt-5 text-sm leading-6 text-slate-500">Results are displayed exactly as received from the independently configured service. Validate its output schema, clinical status, and data-handling policy before operational use.</p></main>;
}
