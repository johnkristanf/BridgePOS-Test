import { wayfinder } from "@laravel/vite-plugin-wayfinder"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import laravel from "laravel-vite-plugin"
import { visualizer } from "rollup-plugin-visualizer"
import { defineConfig } from "vite"
import { compression, defineAlgorithm } from "vite-plugin-compression2"
import { ViteImageOptimizer } from "vite-plugin-image-optimizer"
import { VitePWA } from "vite-plugin-pwa"
import svgr from "vite-plugin-svgr"

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
      threshold: 1024,
      deleteOriginalAssets: false,
      algorithms: [
        "gzip",
        "brotliCompress",
        defineAlgorithm("deflate", { level: 9 }),
      ],
    }),
    svgr({
      include: "**/*.svg?react",
      exclude: "",
    }),
    visualizer({ filename: "stats.html", open: true }),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      webp: { quality: 80 },
      avif: { quality: 70 },
      cache: true,
    }),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
    }),
  ],
  esbuild: {
    jsxDev: false,
    jsx: "automatic",
    drop: ["console", "debugger"],
  },
  build: {
    minify: "esbuild",
    target: "es2018",
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    assetsInlineLimit: 4096,
    manifest: true,
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
        manualChunks: {
          react: ["react", "react-dom"],
          inertia: ["@inertiajs/react"],
          vendor: ["axios"],
        },
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "@inertiajs/react", "axios"],
  },
  server: {
    watch: { usePolling: false },
    hmr: { overlay: true },
    fs: { strict: true },
  },
})
