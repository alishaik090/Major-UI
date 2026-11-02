import { ArrowRight, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { DragDropZone, ErrorAlert, ImagePreview, Loader, OrganDropdown, UploadCard } from "../components/analysis";
import { Button } from "../components/ui/button";
import { routes } from "../config/routes";
import { useAnalysis } from "../hooks/use-analysis";
import type { Organ } from "../types/analysis";

interface AnalysisForm { organ: Organ }

export function DashboardPage() {
  const navigate = useNavigate();
  const { analyze, isSubmitting, error, clearError } = useAnalysis();
  const { watch, setValue, handleSubmit, reset } = useForm<AnalysisForm>({ defaultValues: { organ: "retina" } });
  const organ = watch("organ");
  const [file, setFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [validationError, setValidationError] = useState<string>();

  useEffect(() => () => { if (imageUrl) URL.revokeObjectURL(imageUrl); }, [imageUrl]);

  const selectFile = (selected: File) => {
    if (!selected.type.startsWith("image/") && selected.type !== "image/tiff") { setValidationError("Choose a supported image file."); return; }
    if (selected.size > 15 * 1024 * 1024) { setValidationError("Choose an image smaller than 15 MB."); return; }
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setFile(selected);
    setImageUrl(URL.createObjectURL(selected));
    setValidationError(undefined);
    clearError();
  };
  const clearFile = () => { if (imageUrl) URL.revokeObjectURL(imageUrl); setFile(undefined); setImageUrl(undefined); };
  const resetAll = () => { clearFile(); reset({ organ: "retina" }); setValidationError(undefined); clearError(); };
  const submit = handleSubmit(async ({ organ: selectedOrgan }) => {
    if (!file || !imageUrl) { setValidationError("Upload an image before starting analysis."); return; }
    try { const analysis = await analyze(file, selectedOrgan); navigate(routes.result, { state: { fileName: file.name, imageUrl, analysis } }); } catch { /* The hook exposes the service message. */ }
  });

  return <main className="mx-auto max-w-6xl px-5 py-12"><div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-wider text-teal-600">Analysis workspace</p><h1 className="mt-2 text-4xl font-black tracking-tight">Prepare a secure service request.</h1><p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">This gateway does not perform analysis itself. A request can only complete when the selected organ service has been configured.</p></div><div className="mt-9 grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]"><UploadCard><form onSubmit={submit} className="space-y-5">{!file ? <DragDropZone onFile={selectFile} disabled={isSubmitting} /> : imageUrl ? <ImagePreview file={file} imageUrl={imageUrl} onClear={clearFile} /> : null}<OrganDropdown value={organ} onChange={(next) => setValue("organ", next)} disabled={isSubmitting} />{(validationError || error) && <ErrorAlert message={validationError ?? error ?? ""} onDismiss={() => { setValidationError(undefined); clearError(); }} />}{isSubmitting && <Loader label={`Routing your ${organ} image to its connected service…`} />}<div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Button type="button" variant="secondary" onClick={resetAll} disabled={isSubmitting}><RotateCcw size={16} />Reset</Button><Button type="submit" disabled={isSubmitting}><ArrowRight size={16} />{isSubmitting ? "Analyzing" : "Analyze image"}</Button></div></form></UploadCard><aside className="space-y-4"><div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm leading-6 text-blue-950 dark:border-blue-950 dark:bg-blue-950/40 dark:text-blue-100"><strong className="block">Before you upload</strong><p className="mt-2">Only send data you are authorized to process. Connected organ services define their own privacy, retention, and clinical-use policies.</p></div><div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm dark:border-slate-800 dark:bg-slate-900"><p className="font-bold">Accepted types</p><p className="mt-2 text-slate-500">PNG, JPEG, WebP, TIFF</p><p className="mt-1 text-slate-500">Maximum file size: 15 MB</p></div></aside></div></main>;
}
