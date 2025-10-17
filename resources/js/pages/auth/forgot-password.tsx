import { Head } from "@inertiajs/react"
import { ForgotPasswordForm } from "@/components/features/auth/forgot-password/forgot-password-form"
import TextLink from "@/components/text-link"
import AuthSplitLayout from "@/layouts/auth/auth-split-layout"
import { login } from "@/routes"

export default function ForgotPassword({ status }: { status?: string }) {
  return (
    <AuthSplitLayout
      title="Forgot Password"
      description="Enter your email and password below to log in"
    >
      <Head title="Forgot password" />

      {status && (
        <div className="mb-4 text-center text-sm font-medium text-green-600">
          {status}
        </div>
      )}

      <div className="space-y-6">
        <ForgotPasswordForm />
        <div className="space-x-1 text-center text-sm text-muted-foreground mt-2">
          <span>Or, return to</span>
          <TextLink href={login()}>log in</TextLink>
        </div>
      </div>
    </AuthSplitLayout>
  )
}
