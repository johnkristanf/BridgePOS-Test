import {
  AlertCircle,
  AlertTriangleIcon,
  CheckCircle,
  Info,
  XCircle,
} from "lucide-react"
import { ReactNode } from "react"
import { create } from "zustand"

export type DialogVariant = "default" | "confirmation"
export type ConfirmationType =
  | "success"
  | "error"
  | "info"
  | "danger"
  | "warning"

interface DialogState {
  isOpen: boolean
  title: string
  description?: string
  children?: ReactNode
  variant: DialogVariant
  confirmationType?: ConfirmationType
  icon?: ReactNode
  onConfirm?: () => void
  onCancel?: () => void
  confirmText?: string
  cancelText?: string
}

interface DialogStore extends DialogState {
  openDialog: (
    config: Omit<DialogState, "isOpen" | "variant"> & {
      variant?: DialogVariant
    },
  ) => void
  openConfirmation: (config: {
    title: string
    description?: string
    type: ConfirmationType
    onConfirm: () => void
    onCancel?: () => void
    confirmText?: string
    cancelText?: string
  }) => void
  closeDialog: () => void
  setOpen: (open: boolean) => void
}

export const confirmationConfig: Record<
  ConfirmationType,
  { icon: React.ReactNode; confirmButtonClass: string; titleClass: string }
> = {
  success: {
    icon: <CheckCircle className="size-8 text-green-500" />,
    confirmButtonClass: "bg-green-600 hover:bg-green-700 text-white",
    titleClass: "text-green-700",
  },
  error: {
    icon: <XCircle className="size-8 text-red-500" />,
    confirmButtonClass: "bg-red-600 hover:bg-red-700 text-white",
    titleClass: "text-red-700",
  },
  info: {
    icon: <Info className="size-8 text-blue-500" />,
    confirmButtonClass: "bg-blue-600 hover:bg-blue-700 text-white",
    titleClass: "text-blue-700",
  },
  danger: {
    icon: <AlertCircle className="size-8 text-[#ffcc08]" />,
    confirmButtonClass: "bg-amber-600 hover:bg-[#ffcc08] text-white",
    titleClass: "text-[#ffcc08]",
  },
  warning: {
    icon: <AlertTriangleIcon className="size-8 text-[#ffcc08]" />,
    confirmButtonClass: "bg-yellow-600 hover:bg-[#ffcc08] text-white",
    titleClass: "text-black",
  },
}

export const useDynamicDialog = create<DialogStore>((set) => ({
  isOpen: false,
  title: "",
  description: undefined,
  children: undefined,
  variant: "default",
  confirmationType: undefined,
  icon: undefined,
  onConfirm: undefined,
  onCancel: undefined,
  confirmText: "Confirm",
  cancelText: "Cancel",

  openDialog: (config) =>
    set({
      isOpen: true,
      title: config.title,
      description: config.description,
      children: config.children,
      variant: config.variant || "default",
      confirmationType: config.confirmationType,
      icon: config.icon,
      onConfirm: config.onConfirm,
      onCancel: config.onCancel,
      confirmText: config.confirmText,
      cancelText: config.cancelText,
    }),

  openConfirmation: (config) => {
    const { type, ...rest } = config
    const { icon } = confirmationConfig[type]

    set({
      isOpen: true,
      variant: "confirmation",
      confirmationType: type,
      icon,
      ...rest,
    })
  },

  closeDialog: () =>
    set({
      isOpen: false,
      title: "",
      description: undefined,
      children: undefined,
      variant: "default",
      confirmationType: undefined,
      icon: undefined,
      onConfirm: undefined,
      onCancel: undefined,
      confirmText: "Confirm",
      cancelText: "Cancel",
    }),

  setOpen: (open) =>
    set((_state) => ({
      isOpen: open,
      ...(open === false && {
        title: "",
        description: undefined,
        children: undefined,
        variant: "default",
        confirmationType: undefined,
        icon: undefined,
        onConfirm: undefined,
        onCancel: undefined,
        confirmText: "Confirm",
        cancelText: "Cancel",
      }),
    })),
}))
