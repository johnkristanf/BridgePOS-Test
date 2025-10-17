// -
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "@inertiajs/react"
import { useEffect } from "react"
import { useForm as useReactHookForm } from "react-hook-form"
import toast from "react-hot-toast"
import { DynamicForm } from "@/components/ui/forms/dynamic-form"
import { useRegisterUser } from "@/hooks/api/auth"
import { RegisterPayload, registerSchema } from "@/types/auth"
import { DynamicFormType, FieldConfig } from "@/types/form"

export const RegisterForm = () => {
  const { mutate: register, isPending } = useRegisterUser()

  const inertiaForm = useForm<RegisterPayload>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  })

  const reactHookForm = useReactHookForm<RegisterPayload>({
    resolver: zodResolver(registerSchema) as any,
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  })

  const registerForm = {
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
  } as unknown as DynamicFormType<RegisterPayload>

  useEffect(() => {
    if (inertiaForm.errors) {
      Object.entries(inertiaForm.errors).forEach(([key, value]) => {
        reactHookForm.setError(key as keyof RegisterPayload, {
          type: "manual",
          message: value,
        })
      })
    }
  }, [inertiaForm.errors, reactHookForm])

  const registerFields: FieldConfig<RegisterPayload>[] = [
    {
      name: "name",
      type: "text",
      label: "Name",
      placeholder: "Full name",
      autoFocus: true,
      autoComplete: "name",
      disabled: isPending,
    },
    {
      name: "email",
      type: "email",
      label: "Email address",
      placeholder: "email@example.com",
      autoComplete: "email",
      disabled: isPending,
    },
    {
      name: "password",
      type: "password-input",
      label: "Password",
      placeholder: "••••••••",
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

  const handleSubmit = async (data: RegisterPayload) => {
    await toast.promise(
      new Promise((resolve, reject) => {
        register(data, {
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
        loading: "Creating account...",
        success: (message) => message as string,
        error: (err) => err as string,
      },
    )
  }

  return (
    <DynamicForm<RegisterPayload>
      form={registerForm}
      fields={registerFields}
      onSubmit={handleSubmit}
      submitButtonTitle="Create account"
      submitButtonClassname="w-full"
      size="md"
    />
  )
}
