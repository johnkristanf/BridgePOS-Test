import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "@inertiajs/react"
import { useEffect, useRef } from "react"
import { useForm as useReactHookForm } from "react-hook-form"
import toast from "react-hot-toast"
import { DynamicForm } from "@/components/ui/forms/dynamic-form"
import { useTwoFactorChallenge } from "@/hooks/api/auth"
import { OTP_MAX_LENGTH } from "@/hooks/ui/use-two-factor-auth"
import {
  TwoFactorChallengePayload,
  twoFactorChallengeSchema,
} from "@/types/auth"
import { DynamicFormType, FieldConfig } from "@/types/form"

interface TwoFactorChallengeFormProps {
  showRecoveryInput: boolean
}

export const TwoFactorChallengeForm = ({
  showRecoveryInput,
}: TwoFactorChallengeFormProps) => {
  const { mutate: submitChallenge, isPending } = useTwoFactorChallenge()
  const hasAutoSubmitted = useRef(false)

  const inertiaForm = useForm<TwoFactorChallengePayload>({
    code: "",
    recovery_code: "",
  })

  const reactHookForm = useReactHookForm<TwoFactorChallengePayload>({
    resolver: zodResolver(twoFactorChallengeSchema) as any,
    defaultValues: {
      code: "",
      recovery_code: "",
    },
  })

  const twoFactorForm = {
    ...reactHookForm,
    data: inertiaForm.data,
    errors: inertiaForm.errors,
    processing: isPending,
    setData: inertiaForm.setData,
    transform: inertiaForm.transform,
    reset: (values: any) => {
      reactHookForm.reset(values)
      inertiaForm.reset()
      hasAutoSubmitted.current = false
    },
    clearErrors: (name: any) => {
      reactHookForm.clearErrors(name)
      inertiaForm.clearErrors(name as any)
    },
  } as unknown as DynamicFormType<TwoFactorChallengePayload>

  useEffect(() => {
    if (inertiaForm.errors) {
      Object.entries(inertiaForm.errors).forEach(([key, value]) => {
        reactHookForm.setError(key as keyof TwoFactorChallengePayload, {
          type: "manual",
          message: value,
        })
      })
    }
  }, [inertiaForm.errors, reactHookForm])

  useEffect(() => {
    twoFactorForm.reset()
    hasAutoSubmitted.current = false
  }, [showRecoveryInput])

  const handleSubmit = async (data: TwoFactorChallengePayload) => {
    await toast.promise(
      new Promise((resolve, reject) => {
        submitChallenge(data, {
          onSuccess: (response) => {
            twoFactorForm.reset()
            resolve(response.message)
          },
          onError: (error) => {
            hasAutoSubmitted.current = false
            reject(error.message)
          },
        })
      }),
      {
        loading: "Verifying...",
        success: (message) => message as string,
        error: (err) => err as string,
      },
    )
  }

  const handleOtpComplete = (value: string) => {
    if (!hasAutoSubmitted.current && value.length === OTP_MAX_LENGTH) {
      hasAutoSubmitted.current = true
      handleSubmit({ code: value })
    }
  }

  const twoFactorFields: FieldConfig<TwoFactorChallengePayload>[] =
    showRecoveryInput
      ? [
          {
            name: "recovery_code",
            type: "text",
            label: "",
            placeholder: "Enter recovery code",
            autoFocus: true,
            autoComplete: "off",
            disabled: isPending,
          },
        ]
      : [
          {
            name: "code",
            type: "otp",
            label: "",
            otpLength: OTP_MAX_LENGTH,
            disabled: isPending,
            wrapperClassName: "flex flex-col items-center justify-center",
            containerClassName: "justify-center",
            onComplete: handleOtpComplete,
          },
        ]

  return (
    <DynamicForm<TwoFactorChallengePayload>
      form={twoFactorForm}
      fields={twoFactorFields}
      onSubmit={handleSubmit}
      submitButtonTitle="Continue"
      submitButtonClassname="w-full"
      size="md"
    />
  )
}
