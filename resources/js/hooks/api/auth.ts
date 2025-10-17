import { router } from "@inertiajs/react"
import { useMutation } from "@tanstack/react-query"
import AuthenticatedSessionController from "@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController"
import NewPasswordController from "@/actions/App/Http/Controllers/Auth/NewPasswordController"
import PasswordResetLinkController from "@/actions/App/Http/Controllers/Auth/PasswordResetLinkController"
import RegisteredUserController from "@/actions/App/Http/Controllers/Auth/RegisteredUserController"
import twoFactor from "@/routes/two-factor"
import {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
  TwoFactorChallengePayload,
  TwoFactorChallengeResponse,
} from "@/types/auth"

export const useLoginUser = () => {
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationKey: ["login"],
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

export const useRegisterUser = () => {
  return useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationKey: ["register"],
    mutationFn: async (data: RegisterPayload) => {
      return new Promise((resolve, reject) => {
        router.post(RegisteredUserController.store.url(), data, {
          preserveScroll: true,
          preserveState: false,
          onSuccess: (page) => {
            resolve({
              message: "Registration successful",
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

export const useForgotPassword = () => {
  return useMutation<ForgotPasswordResponse, Error, ForgotPasswordPayload>({
    mutationKey: ["forgot-password"],
    mutationFn: async (data: ForgotPasswordPayload) => {
      return new Promise((resolve, reject) => {
        router.post(PasswordResetLinkController.store.url(), data, {
          preserveScroll: true,
          preserveState: true,
          onSuccess: (page) => {
            resolve({
              message: "Password reset link sent successfully",
              status: page.props.status as string,
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

export const useResetPassword = () => {
  return useMutation<ResetPasswordResponse, Error, ResetPasswordPayload>({
    mutationKey: ["reset-password"],
    mutationFn: async (data: ResetPasswordPayload) => {
      return new Promise((resolve, reject) => {
        router.post(NewPasswordController.store.url(), data, {
          preserveScroll: true,
          preserveState: false,
          onSuccess: (page) => {
            resolve({
              message: "Password reset successful",
              status: page.props.status as string,
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

export const useTwoFactorChallenge = () => {
  return useMutation<
    TwoFactorChallengeResponse,
    Error,
    TwoFactorChallengePayload
  >({
    mutationKey: ["twoFactorChallenge"],
    mutationFn: async (data: TwoFactorChallengePayload) => {
      return new Promise((resolve, reject) => {
        router.post(twoFactor.login.store.url(), data, {
          preserveScroll: true,
          preserveState: false,
          onSuccess: (page) => {
            resolve({
              message: "Two-factor authentication successful",
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
