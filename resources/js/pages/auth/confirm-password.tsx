import { Form, Head } from "@inertiajs/react"
import InputError from "@/components/input-error"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/inputs/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import AuthSplitLayout from "@/layouts/auth/auth-split-layout"
import { store } from "@/routes/password/confirm"

export default function ConfirmPassword() {
  return (
    <AuthSplitLayout
      title="Confirm your password"
      description="This is a secure area of the application. Please confirm your password before continuing."
    >
      <Head title="Confirm password" />

      <Form {...store.form()} resetOnSuccess={["password"]}>
        {({ processing, errors }) => (
          <div className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                autoFocus
              />

              <InputError message={errors.password} />
            </div>

            <div className="flex items-center">
              <Button
                className="w-full"
                disabled={processing}
                data-test="confirm-password-button"
                variant={"bridge_digital"}
              >
                {processing && <Spinner />}
                Confirm password
              </Button>
            </div>
          </div>
        )}
      </Form>
    </AuthSplitLayout>
  )
}
