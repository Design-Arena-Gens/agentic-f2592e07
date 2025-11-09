export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-900/60 pt-8 text-sm text-slate-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>Built by Cortex Courier — your async comms co-pilot.</p>
        <div className="flex flex-wrap gap-4">
          <a
            href="mailto:hello@cortexcourier.ai"
            className="text-slate-400 transition hover:text-accent"
          >
            Contact
          </a>
          <a
            href="https://agentic-f2592e07.vercel.app"
            className="text-slate-400 transition hover:text-accent"
          >
            Live site
          </a>
          <a
            href="https://vercel.com"
            className="text-slate-400 transition hover:text-accent"
          >
            Deploy on Vercel
          </a>
        </div>
      </div>
    </footer>
  );
}
