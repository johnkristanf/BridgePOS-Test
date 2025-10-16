import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import toast from "react-hot-toast"
import { ErrorFallback } from "./error-fallback"
import { LoadingFallback } from "./loading-fallback"

const FallbackBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error) => {
        toast.error(`An error occurred: ${error.message}`)
      }}
    >
      <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
    </ErrorBoundary>
  )
}

export default FallbackBoundary
