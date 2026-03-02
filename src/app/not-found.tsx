export const runtime = 'edge';

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 text-center">
      <p className="font-mono text-muted-foreground text-sm">404</p>
      <h1 className="text-2xl font-bold text-foreground">Page not found</h1>
      <Link
        href="/"
        className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
      >
        Go home
      </Link>
    </div>
  );
}
