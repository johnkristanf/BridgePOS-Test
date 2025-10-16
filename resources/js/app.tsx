import "../css/app.css"

import { createInertiaApp } from "@inertiajs/react"
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers"
import { createRoot } from "react-dom/client"
import { GlobalDynamicDialog } from "./components/contexts/global-dynamic-dialog"
import NuqsAdapterContext from "./components/contexts/nuqs-adapter"
import { QueryProvider } from "./components/contexts/query"
import { TailwindIndicator } from "./components/contexts/tailwind-indicator"
import { ToastProvider } from "./components/contexts/toast"
import { TooltipProvider } from "./components/ui/tooltip"
import { initializeTheme } from "./hooks/ui/use-appearance"

const appName = import.meta.env.VITE_APP_NAME || "Laravel"

createInertiaApp({
  title: (title) => (title ? `${title} | ${appName}` : appName),
  resolve: (name) =>
    resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob("./pages/**/*.tsx"),
    ),
  setup({ el, App, props }) {
    const root = createRoot(el)

    root.render(
      <NuqsAdapterContext>
        <TooltipProvider disableHoverableContent>
          <QueryProvider>
            <App {...props} />
            <ToastProvider />
            <TailwindIndicator />
            <GlobalDynamicDialog />
          </QueryProvider>
        </TooltipProvider>
      </NuqsAdapterContext>,
    )
  },
  progress: {
    color: "#349083",
  },
})

// This will set light / dark mode on load...
initializeTheme()
