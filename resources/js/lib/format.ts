import { format } from "date-fns"

export function formatMilliseconds(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 3 }).format(
    value,
  )
}

export function formatDate(value: Date | string | null | undefined): string {
  if (!value) return "Never expires"

  try {
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) {
      return "Invalid date"
    }
    return format(date, "LLL dd, y HH:mm")
  } catch (error) {
    return "Invalid date"
  }
}

export function formatCompactNumber(value: number) {
  switch (true) {
    case value >= 1000000:
      return `${(value / 1000000).toFixed(1)}M`
    case value >= 1000:
      return `${(value / 1000).toFixed(1)}k`
    case value >= 100:
      return value.toString()
    default:
      return value.toString()
  }
}

export function formatDateLocal(
  dateString: string | null,
  options: {
    locale?: string
    year?: "numeric" | "2-digit"
    month?: "numeric" | "2-digit" | "long" | "short" | "narrow"
    day?: "numeric" | "2-digit"
  } = {},
): string {
  if (!dateString) return "Not available"

  const {
    locale = "en-US",
    year = "numeric",
    month = "long",
    day = "numeric",
  } = options

  return new Date(dateString).toLocaleDateString(locale, {
    year,
    month,
    day,
  })
}

export function formatProjectName(project: string): string {
  const decodedProject = decodeURIComponent(project).replace(/_/g, " ")

  switch (decodedProject.toLowerCase()) {
    case "usi bridgepro":
      return "USI BridgePRO"
    case "grmpi bridgepro":
      return "GRMPI BridgePRO"
    default:
      return decodedProject.replace(/\b\w/g, (char) => char.toUpperCase())
  }
}

export const truncateKey = (key: string, length = 15) => {
  return key.length > length ? `${key.substring(0, length)}...` : key
}

export const permissionMap = {
  create: "c",
  read: "r",
  update: "u",
  delete: "d",
  approve: "a",
  view: "v",
} as const

export const permissionDisplay = {
  create: "Create",
  read: "Read",
  update: "Update",
  delete: "Delete",
  approve: "Approve",
  view: "View",
} as const

export const permissionColor = {
  create: "bg-blue-500 text-white",
  read: "bg-green-500 text-white",
  update: "bg-yellow-500 text-black",
  delete: "bg-red-500 text-white",
  approve: "bg-purple-500 text-white",
  view: "bg-gray-500 text-white",
} as const
