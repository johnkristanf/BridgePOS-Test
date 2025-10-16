import { Form, Head } from "@inertiajs/react"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { useMemo, useState } from "react"
import InputError from "@/components/input-error"
import TextLink from "@/components/text-link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/inputs/input"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/inputs/input-otp"
import { OTP_MAX_LENGTH } from "@/hooks/ui/use-two-factor-auth"
import AuthSplitLayout from "@/layouts/auth/auth-split-layout"
import { login } from "@/routes"
import { store } from "@/routes/two-factor/login"

export default function TwoFactorChallenge() {
  const [showRecoveryInput, setShowRecoveryInput] = useState<boolean>(false)
  const [code, setCode] = useState<string>("")

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

  const toggleRecoveryMode = (clearErrors: () => void): void => {
    setShowRecoveryInput(!showRecoveryInput)
    clearErrors()
    setCode("")
  }

  return (
    <AuthSplitLayout
      title={authConfigContent.title}
      description={authConfigContent.description}
    >
      <Head title="Two-Factor Auth" />

      <div className="space-y-6">
        <Form
          {...store.form()}
          className="space-y-4"
          resetOnError
          resetOnSuccess={!showRecoveryInput}
        >
          {({ errors, processing }) => (
            <>
              {showRecoveryInput ? (
                <>
                  <Input
                    name="recovery_code"
                    type="text"
                    placeholder="Enter recovery code"
                    autoFocus={showRecoveryInput}
                    required
                  />
                  <InputError message={errors.recovery_code} />
                </>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-3 text-center">
                  <div className="flex w-full items-center justify-center">
                    <InputOTP
                      name="code"
                      maxLength={OTP_MAX_LENGTH}
                      value={code}
                      onChange={(value) => setCode(value)}
                      disabled={processing}
                      pattern={REGEXP_ONLY_DIGITS}
                    >
                      <InputOTPGroup>
                        {Array.from({ length: OTP_MAX_LENGTH }, (_, index) => (
                          <InputOTPSlot key={index} index={index} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <InputError message={errors.code} />
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={processing}
                variant={"bridge_digital"}
              >
                Continue
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                <span>remembered your password? </span>
                <TextLink href={login()} tabIndex={6}>
                  Log in
                </TextLink>
              </div>
            </>
          )}
        </Form>
      </div>
    </AuthSplitLayout>
  )
}
