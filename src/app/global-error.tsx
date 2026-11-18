"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Home,
  RefreshCw,
  ShoppingCart,
  ChevronDown,
  Bug,
} from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-slate-50 antialiased selection:bg-emerald-500 selection:text-white">
        <main className="flex min-h-full flex-col bg-slate-50 text-slate-900">
          <header className="border-b border-slate-200/80 bg-white shadow-xs">
            <div className="mx-auto flex h-20 max-w-7xl items-center px-6 lg:px-10">
              <Link href="/" className="group flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 shadow-md shadow-emerald-600/20 transition-transform group-hover:scale-105">
                  <ShoppingCart className="h-5 w-5 text-white" />
                </div>
                <span className="text-2xl font-bold tracking-tight text-slate-900">
                  Buy<span className="text-emerald-600">Hub</span>
                </span>
              </Link>
            </div>
          </header>

          <section className="flex flex-1 items-center justify-center px-6 py-16 lg:px-8">
            <div className="w-full max-w-xl rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-100 sm:p-12 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-rose-50 ring-8 ring-rose-50/50">
                <AlertTriangle className="h-10 w-10 text-rose-600" />
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3.5 py-1 text-xs font-medium text-rose-700 mb-4 border border-rose-100">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-600 animate-pulse" />
                Error Code: {error.digest || "500_INTERNAL"}
              </div>

              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl mb-3">
                Something went wrong
              </h1>

              <p className="text-sm leading-relaxed text-slate-600 sm:text-base max-w-md mx-auto mb-8">
                An unexpected error occurred while loading this page. You can try refreshing or return safely to the home page.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                <button
                  onClick={() => reset()}
                  className="group flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/25 active:scale-[0.98]"
                >
                  <RefreshCw className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
                  Try Again
                </button>

                <Link
                  href="/"
                  className="flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-xs transition-all hover:bg-slate-50 hover:border-slate-400 active:scale-[0.98]"
                >
                  <Home className="h-4 w-4 text-slate-500" />
                  Back to Home
                </Link>
              </div>

              {error.digest && (
                <div className="mt-8 pt-6 border-t border-slate-100 text-left">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="flex w-full items-center justify-between text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <Bug className="h-3.5 w-3.5" />
                      Technical Details
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        showDetails ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showDetails && (
                    <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-200 shadow-inner">
                      <p className="text-slate-400 mb-1">Digest:</p>
                      <p className="break-all text-emerald-400 mb-3 select-all">
                        {error.digest}
                      </p>
                      {error.message && (
                        <>
                          <p className="text-slate-400 mb-1">Message:</p>
                          <p className="break-words text-rose-400 select-all">
                            {error.message}
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>

          <footer className="border-t border-slate-200/80 bg-white py-6 text-center text-xs text-slate-500">
            <p>
              &copy; {new Date().getFullYear()} BuyHub. All rights reserved.
            </p>
          </footer>
        </main>
      </body>
    </html>
  );
}