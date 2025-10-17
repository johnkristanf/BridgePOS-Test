import { Head } from "@inertiajs/react"
import { useMemo, useState } from "react"
import { TwoFactorChallengeForm } from "@/components/features/auth/two-factor-challenge/two-factor-challenge-form"
import TextLink from "@/components/text-link"
import AuthSplitLayout from "@/layouts/auth/auth-split-layout"
import { login } from "@/routes"

export default function TwoFactorChallenge() {
  const [showRecoveryInput, setShowRecoveryInput] = useState<boolean>(false)

  const authConfigContent = useMemo<{
    title: string
    description: string
    toggleText: string
  }>(() => {
    if (showRecoveryInput) {
      return {
        title: "Recovery Code",
        description:
          "Please confirm access to your account by entering one of your emergency recovery codes.",
        toggleText: "login using an authentication code",
      }
    }

    return {
      title: "Authentication Code",
      description:
        "Enter the authentication code provided by your authenticator application.",
      toggleText: "login using a recovery code",
    }
  }, [showRecoveryInput])

  const toggleRecoveryMode = (): void => {
    setShowRecoveryInput(!showRecoveryInput)
  }

  return (
    <AuthSplitLayout
      title={authConfigContent.title}
      description={authConfigContent.description}
    >
      <Head title="Two-Factor Auth" />

      <div className="space-y-6">
        <TwoFactorChallengeForm showRecoveryInput={showRecoveryInput} />{" "}
        <div className="space-y-2 text-center text-sm">
          <button
            type="button"
            onClick={toggleRecoveryMode}
            className="text-muted-foreground underline-offset-4 hover:underline"
          >
            {authConfigContent.toggleText}
          </button>

          <div className="text-muted-foreground">
            <span>remembered your password? </span>
            <TextLink href={login()}>Log in</TextLink>
          </div>
        </div>
      </div>
    </AuthSplitLayout>
  )
}
