import { Link } from "react-router-dom";
import { routes } from "../config/routes";

export function NotFoundPage() { return <main className="mx-auto grid min-h-[60vh] max-w-2xl place-items-center px-5 text-center"><div><p className="text-sm font-bold uppercase tracking-widest text-teal-600">404</p><h1 className="mt-3 text-4xl font-black">That workspace does not exist.</h1><Link className="mt-6 inline-flex rounded-xl bg-teal-600 px-4 py-2.5 font-bold text-white" to={routes.home}>Return home</Link></div></main>; }
