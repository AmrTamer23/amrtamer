'use client';

export const runtime = 'edge';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center">
          <div>
            <h2>Something went wrong!</h2>
            <button onClick={() => reset()}>Try again</button>
          </div>
        </div>
      </body>
    </html>
  );
}
