import { router } from "@inertiajs/react"
import { useMutation } from "@tanstack/react-query"
import AuthenticatedSessionController from "@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController"
import { LoginPayload, LoginResponse } from "@/types/auth"

export function useLoginUser() {
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: async (data: LoginPayload) => {
      return new Promise((resolve, reject) => {
        router.post(AuthenticatedSessionController.store.url(), data, {
          preserveScroll: true,
          preserveState: false,
          onSuccess: (page) => {
            resolve({
              message: "Login successful",
              redirect: page.props.redirect as string,
            })
          },
          onError: (errors) => {
            reject(new Error(Object.values(errors).flat()[0] as string))
          },
        })
      })
    },
  })
}
