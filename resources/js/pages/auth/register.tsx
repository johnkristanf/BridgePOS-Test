import { Head } from "@inertiajs/react"
import { RegisterForm } from "@/components/features/auth/register/register-form"
import TextLink from "@/components/text-link"
import AuthSplitLayout from "@/layouts/auth/auth-split-layout"
import { login } from "@/routes"

export default function Register() {
  return (
    <AuthSplitLayout
      title="Create an account"
      description="Enter your details below to create your account"
    >
      <Head title="Register" />
      <RegisterForm />
      <div className="text-center text-sm text-muted-foreground mt-2">
        Already have an account? <TextLink href={login()}>Log in</TextLink>
      </div>
    </AuthSplitLayout>
  )
}
