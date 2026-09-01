// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// export default defineConfig({
//   tanstackStart: {
//     // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
//     // nitro/vite builds from this
//     server: { entry: "server" },
//   },
// });

export default defineConfig({
  tanstackStart: {
    // Cloudflare SSR entry
    server: { entry: "server" },
  },

  build: {
    cssCodeSplit: true,
    sourcemap: false,

    rollupOptions: {
      output: {
        manualChunks(id) {
          // React + TanStack
          if (
            id.includes("@tanstack/react-router") ||
            id.includes("@tanstack/react-start") ||
            id.includes("@tanstack/react-query")
          ) {
            return "tanstack";
          }

          // Icons
          if (id.includes("lucide-react")) {
            return "icons";
          }

          // Calendar & date utilities (booking page only)
          if (
            id.includes("react-day-picker") ||
            id.includes("date-fns")
          ) {
            return "calendar";
          }

          // Confetti only for thank-you page
          if (id.includes("canvas-confetti")) {
            return "effects";
          }
        },
      },
    },
  },
});