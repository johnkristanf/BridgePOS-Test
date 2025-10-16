import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "@inertiajs/react"
import { useEffect } from "react"
import { useForm as useReactHookForm } from "react-hook-form"
import toast from "react-hot-toast"
import { DynamicForm } from "@/components/ui/forms/dynamic-form"
import { useLoginUser } from "@/hooks/api/auth"
import { LoginPayload, loginSchema } from "@/types/auth"
import { DynamicFormType, FieldConfig } from "@/types/form"

export const LoginForm = () => {
  const { mutate: login, isPending } = useLoginUser()

  const inertiaForm = useForm<LoginPayload>({
    email: "",
    password: "",
    remember: false,
  })

  const reactHookForm = useReactHookForm<LoginPayload>({
    resolver: zodResolver(loginSchema) as any,
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  })

  const loginForm = {
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
  } as unknown as DynamicFormType<LoginPayload>

  useEffect(() => {
    if (inertiaForm.errors) {
      Object.entries(inertiaForm.errors).forEach(([key, value]) => {
        reactHookForm.setError(key as keyof LoginPayload, {
          type: "manual",
          message: value,
        })
      })
    }
  }, [inertiaForm.errors, reactHookForm])

  const fields: FieldConfig<LoginPayload>[] = [
    {
      name: "email",
      type: "email",
      label: "Email address",
      placeholder: "email@example.com",
      autoFocus: true,
      autoComplete: "email",
      validation: {
        required: "Email is required",
      },
      disabled: isPending,
    },
    {
      name: "password",
      type: "password-input",
      label: "Password",
      placeholder: "••••••••",
      autoComplete: "current-password",
      validation: {
        required: "Password is required",
        minLength: {
          value: 8,
          message: "Password must be at least 8 characters",
        },
      },
      disabled: isPending,
    },
  ]

  const handleSubmit = async (data: LoginPayload) => {
    await toast.promise(
      new Promise((resolve, reject) => {
        login(data, {
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
        loading: "Logging in...",
        success: (message) => message as string,
        error: (err) => err as string,
      },
    )
  }

  return (
    <DynamicForm<LoginPayload>
      form={loginForm}
      fields={fields}
      onSubmit={handleSubmit}
      submitButtonTitle="Sign in"
      submitButtonClassname="w-full"
      size="md"
    />
  )
}
