import { SheetMenu } from "@/components/ui/sidebar/sheet-menu"

interface NavbarProps {
  title?: string
}

interface NavbarItemProps {
  children: React.ReactNode
}

const NavbarItem: React.FC<NavbarItemProps> = ({ children }) => (
  <div className="transition-transform active:scale-95">{children}</div>
)

export const Navbar = async ({ title }: NavbarProps) => {
  // const router = useRouter()
  return (
    <header className="sticky top-0 z-20 w-full">
      <nav className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-full">
        <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
          <div className="flex-shrink-0">
            <SheetMenu />
          </div>
          <h6 className="font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-foreground dark:text-white truncate min-w-0">
            {title}
          </h6>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 flex-shrink-0 ml-2">
          {/* <NavbarItem>
            <div className="hidden xs:block">
              <AnimatedThemeToggler />
            </div>
            <div className="block xs:hidden">
              <AnimatedThemeToggler />
            </div>
          </NavbarItem> */}
          <NavbarItem>{""}</NavbarItem>
        </div>
      </nav>
    </header>
  )
}
