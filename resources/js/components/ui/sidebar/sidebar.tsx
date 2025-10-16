import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Menu } from "@/components/ui/sidebar/menu"
import { SidebarToggle } from "@/components/ui/sidebar/sidebar-toggle"
import { APP_ASSETS } from "@/config/assets"
import { useSidebarToggle } from "@/hooks/ui/use-sidebar-toggle"
import { useStore } from "@/hooks/ui/use-store"
import { cn } from "@/lib/cn"
import ImageComponent from "../image"

interface SidebarProps {
  title?: string
  logoSrc?: string
  logoAlt?: string
  logoHeight?: string
  logoWidth?: string
  homeUrl?: string
}

export const Sidebar = ({
  title = "BridgePOS",
  logoSrc = APP_ASSETS.USI_LOGO,
  logoAlt = "logo",
  logoHeight = "250",
  logoWidth = "250",
  homeUrl = "/",
}: SidebarProps) => {
  const sidebar = useStore(useSidebarToggle, (state) => state)

  if (!sidebar) return null

  return (
    <aside
      className={cn(
        "-translate-x-full fixed top-0 left-0 z-30 h-screen transition-[width] duration-300 ease-in-out lg:translate-x-0",
        sidebar?.isOpen === false ? "w-[90px]" : "w-[240px]",
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative flex h-full flex-col overflow-y-auto px-3 py-4 shadow-md">
        <Button
          className={cn(
            "mb-1 transition-all duration-300 ease-in-out",
            sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0",
          )}
          variant="link"
          asChild
        >
          <Link href={homeUrl} className="flex items-center gap-2">
            <ImageComponent
              src={logoSrc}
              alt={logoAlt}
              height={logoHeight}
              width={logoWidth}
              className={cn(
                "rounded-full object-contain transition-all duration-300 ease-in-out",
                sidebar?.isOpen === false ? "size-8" : "size-12",
              )}
            />
            {sidebar?.isOpen && (
              <span className="font-semibold text-base dark:text-white transition-opacity duration-300">
                {title}
              </span>
            )}
          </Link>
        </Button>
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  )
}
