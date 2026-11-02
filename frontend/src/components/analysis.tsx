import { AlertCircle, CheckCircle2, FileImage, LoaderCircle, UploadCloud, X } from "lucide-react";
import type { ChangeEvent, DragEvent } from "react";
import type { Organ } from "../types/analysis";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export function ErrorAlert({ message, onDismiss }: { message: string; onDismiss?: () => void }) { return <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200"><AlertCircle className="mt-0.5 shrink-0" size={18} /><span className="flex-1">{message}</span>{onDismiss && <button onClick={onDismiss} aria-label="Dismiss error"><X size={16} /></button>}</div>; }

export function Loader({ label = "Preparing your request…" }: { label?: string }) { return <div className="flex items-center justify-center gap-3 rounded-xl bg-teal-50 p-5 text-teal-800 dark:bg-teal-950 dark:text-teal-200"><LoaderCircle className="animate-spin" /><span className="font-medium">{label}</span></div>; }

export function StatusBadge({ connected }: { connected: boolean }) { return <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold", connected ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300")}><span className="h-1.5 w-1.5 rounded-full bg-current" />{connected ? "Result received" : "Awaiting connection"}</span>; }

export function DragDropZone({ onFile, disabled }: { onFile: (file: File) => void; disabled?: boolean }) {
  const choose = (event: ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (file) onFile(file); event.target.value = ""; };
  const drop = (event: DragEvent<HTMLLabelElement>) => { event.preventDefault(); const file = event.dataTransfer.files?.[0]; if (file) onFile(file); };
  return <label onDragOver={(event) => event.preventDefault()} onDrop={drop} className={cn("block cursor-pointer rounded-2xl border-2 border-dashed border-teal-200 bg-teal-50/50 px-6 py-10 text-center transition hover:border-teal-500 hover:bg-teal-50 dark:border-teal-900 dark:bg-teal-950/30", disabled && "cursor-not-allowed opacity-50")}><input type="file" className="sr-only" accept="image/png,image/jpeg,image/webp,image/tiff" onChange={choose} disabled={disabled} /><UploadCloud className="mx-auto text-teal-600" size={34} /><p className="mt-3 font-bold">Drop an image here, or browse</p><p className="mt-1 text-sm text-slate-500">PNG, JPEG, WebP, or TIFF · maximum 15 MB</p></label>;
}

export function ImagePreview({ file, imageUrl, onClear }: { file: File; imageUrl: string; onClear: () => void }) { return <Card className="flex items-center gap-4 p-4"><img src={imageUrl} alt="Selected upload preview" className="h-20 w-20 rounded-xl object-cover" /><div className="min-w-0 flex-1"><p className="truncate font-bold">{file.name}</p><p className="mt-1 text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB · ready for routing</p></div><Button variant="ghost" className="text-slate-500" onClick={onClear} aria-label="Remove selected image"><X size={19} /></Button></Card>; }

const organLabels: Record<Organ, string> = { brain: "Brain", kidney: "Kidney", retina: "Retina" };
export function OrganDropdown({ value, onChange, disabled }: { value: Organ; onChange: (organ: Organ) => void; disabled?: boolean }) { return <label className="block"><span className="mb-2 block text-sm font-bold">Target organ</span><select value={value} disabled={disabled} onChange={(event) => onChange(event.target.value as Organ)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-teal-950">{(Object.entries(organLabels) as [Organ, string][]).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>; }

export function UploadCard({ children }: { children: React.ReactNode }) { return <Card className="shadow-glow"><div className="mb-5 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950"><FileImage size={20} /></span><div><h2 className="font-bold">New analysis</h2><p className="text-sm text-slate-500">Files stay in transit only for this request.</p></div></div>{children}</Card>; }

export function PredictionCard({ label, value }: { label: string; value: string }) { return <Card className="p-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p><p className="mt-2 break-words font-semibold text-ink dark:text-white">{value}</p></Card>; }

export function ResultViewer({ imageUrl, result }: { imageUrl: string; result: Record<string, unknown> }) { return <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_1.1fr]"><Card><p className="mb-3 font-bold">Original image</p><img src={imageUrl} alt="Original uploaded image" className="aspect-square w-full rounded-xl object-contain bg-slate-100 dark:bg-slate-800" /></Card><Card><p className="mb-3 font-bold">Connected-service payload</p><pre className="max-h-[32rem] overflow-auto rounded-xl bg-slate-950 p-4 text-xs leading-6 text-teal-100">{JSON.stringify(result, null, 2)}</pre></Card></div>; }

export function ToastNotifications({ message }: { message?: string }) { return message ? <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-xl"><CheckCircle2 size={18} />{message}</div> : null; }
