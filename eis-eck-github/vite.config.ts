import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// Setze hier deinen GitHub-Repository-Namen, falls die Seite unter
// https://dein-name.github.io/REPO-NAME erreichbar sein soll.
// Beispiel: base: "/eis-eck/"
// Falls du eine eigene Domain nutzt oder es unter dein-name.github.io läuft: base: "/"
const base = process.env.BASE_URL ?? "/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
  build: {
    outDir: "dist",
  },
});
