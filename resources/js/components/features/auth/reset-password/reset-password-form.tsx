import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "@inertiajs/react"
import { useEffect } from "react"
import { useForm as useReactHookForm } from "react-hook-form"
import toast from "react-hot-toast"
import { DynamicForm } from "@/components/ui/forms/dynamic-form"
import { useResetPassword } from "@/hooks/api/auth"
import { ResetPasswordPayload, resetPasswordSchema } from "@/types/auth"
import { DynamicFormType, FieldConfig } from "@/types/form"

interface ResetPasswordFormProps {
  token: string
  email: string
}

export const ResetPasswordForm = ({ token, email }: ResetPasswordFormProps) => {
  const { mutate: resetPassword, isPending } = useResetPassword()

  const inertiaForm = useForm<ResetPasswordPayload>({
    token,
    email,
    password: "",
    password_confirmation: "",
  })

  const reactHookForm = useReactHookForm<ResetPasswordPayload>({
    resolver: zodResolver(resetPasswordSchema) as any,
    defaultValues: {
      token,
      email,
      password: "",
      password_confirmation: "",
    },
  })

  useEffect(() => {
    reactHookForm.setValue("token", token)
    reactHookForm.setValue("email", email)
    inertiaForm.setData("token", token)
    inertiaForm.setData("email", email)
  }, [token, email])

  const resetPasswordForm = {
    ...reactHookForm,
    data: inertiaForm.data,
    errors: inertiaForm.errors,
    processing: isPending,
    setData: inertiaForm.setData,
    transform: inertiaForm.transform,
    reset: (values: any) => {
      reactHookForm.reset(values)
      inertiaForm.reset()
    },
    clearErrors: (name: any) => {
      reactHookForm.clearErrors(name)
      inertiaForm.clearErrors(name as any)
    },
  } as unknown as DynamicFormType<ResetPasswordPayload>

  useEffect(() => {
    if (inertiaForm.errors) {
      Object.entries(inertiaForm.errors).forEach(([key, value]) => {
        reactHookForm.setError(key as keyof ResetPasswordPayload, {
          type: "manual",
          message: value,
        })
      })
    }
  }, [inertiaForm.errors, reactHookForm])

  const resetPasswordFields: FieldConfig<ResetPasswordPayload>[] = [
    {
      name: "email",
      type: "email",
      label: "Email address",
      placeholder: "email@example.com",
      autoComplete: "email",
      disabled: true,
    },
    {
      name: "password",
      type: "password-input",
      label: "Password",
      placeholder: "••••••••",
      autoFocus: true,
      autoComplete: "new-password",
      disabled: isPending,
    },
    {
      name: "password_confirmation",
      type: "password-input",
      label: "Confirm password",
      placeholder: "••••••••",
      autoComplete: "new-password",
      disabled: isPending,
    },
  ]

  const handleSubmit = async (data: ResetPasswordPayload) => {
    await toast.promise(
      new Promise((resolve, reject) => {
        resetPassword(data, {
          onSuccess: (response) => {
            reactHookForm.reset()
            inertiaForm.reset()
            resolve(response.message)
          },
          onError: (error) => {
            reject(error.message)
          },
        })
      }),
      {
        loading: "Resetting password...",
        success: (message) => message as string,
        error: (err) => err as string,
      },
    )
  }

  return (
    <DynamicForm<ResetPasswordPayload>
      form={resetPasswordForm}
      fields={resetPasswordFields}
      onSubmit={handleSubmit}
      submitButtonTitle="Reset password"
      submitButtonClassname="w-full"
      size="md"
    />
  )
}
