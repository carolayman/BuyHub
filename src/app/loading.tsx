import { ShoppingCart } from "lucide-react";

export default function Loading() {
  return (
    <main
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="flex min-h-[calc(100vh-76px)] items-center justify-center bg-gradient-to-b from-green-50/60 via-white to-gray-50 px-5"
    >
      <div className="flex flex-col items-center text-center">
        {/* Logo with pulsing rings and a spinning arc */}
        <div className="relative flex h-28 w-28 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-green-500/10 [animation-duration:2s]" />
          <span className="absolute inset-3 rounded-full bg-green-500/10" />

          <svg
            className="absolute inset-0 h-full w-full animate-spin [animation-duration:1.2s]"
            viewBox="0 0 100 100"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="50"
              cy="50"
              r="46"
              stroke="currentColor"
              strokeWidth="3"
              className="text-green-100"
            />
            <circle
              cx="50"
              cy="50"
              r="46"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="72 290"
              className="text-green-500"
            />
          </svg>

          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500 shadow-lg shadow-green-500/25">
            <ShoppingCart className="h-7 w-7 text-white" />
          </div>
        </div>

        <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900">
          Buy<span className="text-green-500">Hub</span>
        </h2>

        <p className="mt-2 max-w-xs text-sm leading-6 text-gray-500">
          Getting everything ready for you
        </p>

        <div className="mt-5 flex items-center gap-1.5" aria-hidden="true">
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              className="h-2 w-2 animate-bounce rounded-full bg-green-500"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>

        <span className="sr-only">Loading, please wait</span>
      </div>
    </main>
  );
}