"use client"

import { AnimatePresence, motion } from "framer-motion"
import { CircleAlert, CircleCheckBig, Loader2 } from "lucide-react"
import { FC, JSX } from "react"
import { resolveValue, Toast, Toaster, ToastType } from "react-hot-toast"

const colors: Record<ToastType, string> = {
  success: "#16A34A",
  error: "#DC2626",
  loading: "#fbbf24",
  blank: "#A3A3A3",
  custom: "#094CC9",
}

const getColor = (type: ToastType): string => colors[type] || colors.error

const getBackgroundColor = (type: ToastType): string => `${getColor(type)}20`

const getIcon = (type: ToastType): JSX.Element => {
  switch (type) {
    case "loading":
      return <Loader2 className="size-6 animate-spin text-yellow-600" />
    case "success":
      return <CircleCheckBig className="size-6 text-green-600" />
    case "error":
      return <CircleAlert className="size-6 text-red-600" />
    default:
      return <CircleAlert className="size-6 text-blue-600" />
  }
}

export const ToastProvider: FC = () => {
  return (
    <Toaster position="top-center">
      {(t: Toast) => (
        <AnimatePresence>
          {t.visible && (
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex max-w-full items-center rounded-lg border-2 bg-white p-2 shadow-md dark:bg-black"
              style={{
                color: getColor(t.type),
                borderColor: getBackgroundColor(t.type),
              }}
            >
              <div
                className="mr-2 flex h-full w-2 items-center justify-center"
                style={{ background: getColor(t.type) }}
              />
              <div className="mr-2 flex size-8 items-center justify-center">
                {getIcon(t.type)}
              </div>
              <div className="mr-4 flex-1 text-sm">
                {resolveValue(t.message, t)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </Toaster>
  )
}
