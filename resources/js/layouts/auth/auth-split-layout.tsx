import { Link } from "@inertiajs/react"
import { type PropsWithChildren } from "react"
import ImageComponent from "@/components/ui/image"
import { APP_ASSETS } from "@/config/assets"
import { home } from "@/routes"

interface AuthSplitLayoutProps {
  title?: string
  description?: string
}

export default function AuthSplitLayout({
  children,
  title,
  description,
}: PropsWithChildren<AuthSplitLayoutProps>) {
  return (
    <div className="relative grid h-screen lg:grid-cols-2 overflow-hidden">
      {/* Left panel */}
      <div className="relative flex flex-col justify-center px-8 sm:px-0 lg:px-16 bg-white overflow-y-auto">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] py-8">
          <Link
            href={home()}
            className="relative z-20 flex items-center justify-center mb-8"
          >
            <ImageComponent
              src={APP_ASSETS.BRIDGE_LOGO}
              alt="Bridge Logo"
              className="h-16 w-auto"
            />
          </Link>
          <div className="relative z-10 flex flex-col items-start gap-2 text-left">
            <h1 className="text-xl font-medium">{title}</h1>
            <p className="text-sm text-balance text-muted-foreground">
              {description}
            </p>
          </div>
          <div className="relative z-10">{children}</div>
        </div>
      </div>

      {/* Right panel */}
      <div className="relative hidden lg:block h-screen">
        <ImageComponent
          src={APP_ASSETS.AUTH_USI_BG}
          alt="Company Background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-white/80" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/5" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full p-8">
          <div className="text-center space-y-6">
            <ImageComponent
              src={APP_ASSETS.USI_LOGO}
              alt="USI Logo"
              className="mx-auto w-full max-w-md h-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
