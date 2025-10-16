import { wayfinder } from "@laravel/vite-plugin-wayfinder"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import laravel from "laravel-vite-plugin"
import { defineConfig } from "vite"
import { compression, defineAlgorithm } from "vite-plugin-compression2"

export default defineConfig({
  plugins: [
    laravel({
      input: ["resources/css/app.css", "resources/js/app.tsx"],
      ssr: "resources/js/ssr.tsx",
      refresh: true,
    }),
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    tailwindcss(),
    wayfinder({
      formVariants: true,
    }),
    compression({
      algorithms: [
        "gzip",
        "brotliCompress",
        defineAlgorithm("deflate", { level: 9 }),
      ],
    }),
  ],
  esbuild: {
    jsx: "automatic",
  },
})
