import { Head } from "@inertiajs/react"
import { ResetPasswordForm } from "@/components/features/auth/reset-password/reset-password-form"
import AuthSplitLayout from "@/layouts/auth/auth-split-layout"

interface ResetPasswordProps {
  token: string
  email: string
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
  return (
    <AuthSplitLayout
      title="Reset Password"
      description="Enter your new password below"
    >
      <Head title="Reset password" />
      <ResetPasswordForm token={token} email={email} />{" "}
    </AuthSplitLayout>
  )
}
