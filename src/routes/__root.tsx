import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-soft px-4 text-center">
      <p className="font-display text-7xl font-bold text-primary">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-foreground">
        This page has been swept away
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist. Our cleaning services are all
        still here though - pick one below or give us a call.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-2">
        <Link
          to="/"
          className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
        >
          Go home
        </Link>
        <Link
          to="/bookings"
          className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold"
        >
          Book a cleaning
        </Link>
        <a
          href="https://api.whatsapp.com/send?phone=60135519772&text=I%20want%20to%20book%20a%20cleaning%20service%20and%20claim%20my%2010%25%20first-time%20discount."
          className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold"
        >
          Call +60 13 551 9772
        </a>
      </div>
    </main>
  );
}


function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Aart Cleaning Services" },
      {
        name: "description",
        content:
          "Local cleaning services for homes, offices, factories, post-renovation units and malls in Kuala Lumpur and the Klang Valley.",
      },
      { name: "author", content: "Aart Cleaning Services" },
      { property: "og:site_name", content: "Aart Cleaning Services" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      // Preload the two latin variable fonts so they fetch in parallel with
      // the stylesheet instead of waiting for CSS parse (breaks the chain).
      {
        rel: "preload",
        href: "/fonts/space-grotesk-latin-wght-normal.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: "/fonts/manrope-latin-wght-normal.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}