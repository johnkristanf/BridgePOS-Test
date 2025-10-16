import { LayoutGrid, LucideIcon, Settings2Icon } from "lucide-react"

interface Submenu<T extends string> {
  href: string
  label: string
  active: boolean
  icon: LucideIcon
}

interface Menu<T extends string> {
  href: string
  label: string
  active: boolean
  icon: LucideIcon
  submenus: Submenu<string>[]
}

interface Group {
  groupLabel: string
  menus: Menu<string>[]
}

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/",
          label: "Dashboard",
          active: pathname === "/",
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: "/settings",
          label: "Settings",
          active: pathname === "/settings",
          icon: Settings2Icon,
          submenus: [],
        },
      ],
    },
  ]
}
