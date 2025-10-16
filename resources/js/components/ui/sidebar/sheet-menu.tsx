import { Link } from "@inertiajs/react"
import { MenuIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "@/components/ui/sidebar/menu"
import { VisuallyHiddenComponent } from "@/components/ui/visually-hidden"
import { APP_ASSETS } from "@/config/assets"
import ImageComponent from "../image"

interface SheetMenuProps {
  title?: string
  logoSrc?: string
  logoAlt?: string
  logoHeight?: string
  logoWidth?: string
  homeUrl?: string
}

export const SheetMenu = ({
  title = "BridgePOS",
  logoSrc = APP_ASSETS.USI_LOGO,
  logoAlt = "logo",
  logoHeight = "80",
  logoWidth = "80",
  homeUrl = "/",
}: SheetMenuProps) => {
  return (
    <Sheet>
      <VisuallyHiddenComponent>
        <SheetTitle>Navigation Menu</SheetTitle>
        <SheetDescription>
          Access the main navigation menu for the application
        </SheetDescription>
      </VisuallyHiddenComponent>

      <SheetTrigger className="lg:hidden" asChild>
        <Button
          className="h-8"
          variant="outline"
          size="icon"
          aria-label="Open navigation menu"
        >
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>

      <SheetContent
        className="flex h-full flex-col overflow-y-auto bg-background border-border px-3 py-4 shadow-md sm:w-72 dark:bg-zinc-900"
        side="left"
        aria-describedby="sheet-description"
      >
        <SheetHeader className="pb-4">
          <Button
            className="flex items-center justify-center pt-6 pb-4 hover:bg-transparent"
            variant="link"
            asChild
          >
            <Link
              href={homeUrl}
              className="flex flex-col items-center gap-3 transition-transform hover:scale-105"
              aria-label={`Go to ${title} homepage`}
            >
              <div className="relative">
                <ImageComponent
                  src={logoSrc}
                  alt={logoAlt}
                  height={logoHeight}
                  width={logoWidth}
                  className="rounded-full object-contain transition-all duration-300 ease-in-out drop-shadow-sm"
                />
              </div>
              <span className="font-semibold text-base text-foreground dark:text-white transition-opacity duration-300 text-center">
                {title}
              </span>
            </Link>
          </Button>
        </SheetHeader>

        <div className="flex-1 min-h-0">
          <Menu isOpen />
        </div>
      </SheetContent>
    </Sheet>
  )
}
