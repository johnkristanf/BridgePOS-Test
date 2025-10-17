import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "@inertiajs/react"
import { useEffect } from "react"
import { useForm as useReactHookForm } from "react-hook-form"
import toast from "react-hot-toast"
import { DynamicForm } from "@/components/ui/forms/dynamic-form"
import { useForgotPassword } from "@/hooks/api/auth"
import { ForgotPasswordPayload, forgotPasswordSchema } from "@/types/auth"
import { DynamicFormType, FieldConfig } from "@/types/form"

export const ForgotPasswordForm = () => {
  const { mutate: forgotPassword, isPending } = useForgotPassword()

  const inertiaForm = useForm<ForgotPasswordPayload>({
    email: "",
  })

  const reactHookForm = useReactHookForm<ForgotPasswordPayload>({
    resolver: zodResolver(forgotPasswordSchema) as any,
    defaultValues: {
      email: "",
    },
  })

  const forgotPasswordForm = {
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
  } as unknown as DynamicFormType<ForgotPasswordPayload>

  useEffect(() => {
    if (inertiaForm.errors) {
      Object.entries(inertiaForm.errors).forEach(([key, value]) => {
        reactHookForm.setError(key as keyof ForgotPasswordPayload, {
          type: "manual",
          message: value,
        })
      })
    }
  }, [inertiaForm.errors, reactHookForm])

  const forgotPasswordFields: FieldConfig<ForgotPasswordPayload>[] = [
    {
      name: "email",
      type: "email",
      label: "Email address",
      placeholder: "email@example.com",
      autoFocus: true,
      autoComplete: "email",
      disabled: isPending,
    },
  ]

  const handleSubmit = async (data: ForgotPasswordPayload) => {
    await toast.promise(
      new Promise((resolve, reject) => {
        forgotPassword(data, {
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
        loading: "Sending reset link...",
        success: (message) => message as string,
        error: (err) => err as string,
      },
    )
  }

  return (
    <DynamicForm<ForgotPasswordPayload>
      form={forgotPasswordForm}
      fields={forgotPasswordFields}
      onSubmit={handleSubmit}
      submitButtonTitle="Email password reset link"
      submitButtonClassname="w-full"
      size="md"
    />
  )
}
