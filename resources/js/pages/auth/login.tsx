import { Head } from "@inertiajs/react"
import { LoginForm } from "@/components/features/auth/login/login-form"
import AuthSplitLayout from "@/layouts/auth/auth-split-layout"

export default function Login() {
  return (
    <AuthSplitLayout
      title="Log-in"
      description="Enter your email and password below to log in"
    >
      <Head title="Log in" />
      <LoginForm />
    </AuthSplitLayout>
  )
}
