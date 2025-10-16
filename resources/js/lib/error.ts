import { ZodError } from "zod"

export interface ErrorResponseData {
  message: string
  statusCode?: number
  errors?: Record<string, string[]>
}

export interface LaravelErrorResponse {
  message: string
  errors?: Record<string, string[]>
}

export interface LaravelValidationErrorResponse {
  message: string
  errors: Record<string, string[]>
}

export class HttpError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public data?: any,
  ) {
    super(message)
    this.name = "HttpError"
  }
}

export class ErrorHandler {
  public static handleError(error: unknown): ErrorResponseData {
    if (error instanceof HttpError) {
      return ErrorHandler.handleHttpError(error)
    }

    if (ErrorHandler.isZodError(error)) {
      return ErrorHandler.handleZodError(error)
    }

    if (ErrorHandler.isAxiosError(error)) {
      return ErrorHandler.handleAxiosError(error)
    }

    if (error instanceof Error) {
      return ErrorHandler.handleGenericError(error)
    }

    return ErrorHandler.handleUnknownError(error)
  }

  private static handleHttpError(error: HttpError): ErrorResponseData {
    if (error.data && ErrorHandler.isLaravelErrorResponse(error.data)) {
      return ErrorHandler.handleLaravelError(error.data, error.statusCode)
    }

    return {
      message: error.message,
      statusCode: error.statusCode,
    }
  }

  private static isZodError(error: unknown): error is ZodError {
    return error instanceof ZodError
  }

  private static isAxiosError(error: unknown): boolean {
    return (
      typeof error === "object" &&
      error !== null &&
      "isAxiosError" in error &&
      (error as any).isAxiosError === true
    )
  }

  private static isLaravelErrorResponse(
    data: unknown,
  ): data is LaravelErrorResponse {
    return (
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof (data as any).message === "string"
    )
  }

  private static isLaravelValidationError(
    data: unknown,
  ): data is LaravelValidationErrorResponse {
    return (
      ErrorHandler.isLaravelErrorResponse(data) &&
      "errors" in data &&
      typeof (data as any).errors === "object" &&
      (data as any).errors !== null
    )
  }

  private static handleAxiosError(error: any): ErrorResponseData {
    const response = error.response
    const statusCode = response?.status || 500

    if (response?.data && ErrorHandler.isLaravelErrorResponse(response.data)) {
      return ErrorHandler.handleLaravelError(response.data, statusCode)
    }

    if (error.code === "NETWORK_ERROR" || !response) {
      return {
        message: "Network error. Please check your connection.",
        statusCode: 0,
      }
    }

    return {
      message: error.message || "An unexpected error occurred.",
      statusCode,
    }
  }

  private static handleLaravelError(
    data: LaravelErrorResponse,
    statusCode: number,
  ): ErrorResponseData {
    if (statusCode === 422 && ErrorHandler.isLaravelValidationError(data)) {
      return ErrorHandler.handleLaravelValidationError(data)
    }

    return {
      message: data.message,
      statusCode,
      errors: data.errors,
    }
  }

  private static handleLaravelValidationError(
    data: LaravelValidationErrorResponse,
  ): ErrorResponseData {
    const fieldErrors = Object.entries(data.errors)
      .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
      .join("; ")

    return {
      message: fieldErrors || "Validation failed",
      statusCode: 422,
      errors: data.errors,
    }
  }

  private static handleZodError(error: ZodError): ErrorResponseData {
    const message = error.issues.map((e) => e.message).join(", ")
    return {
      message: `Validation error: ${message}`,
      statusCode: 400,
    }
  }

  private static handleGenericError(error: Error): ErrorResponseData {
    return {
      message: error.message || "An unexpected error occurred.",
      statusCode: 500,
    }
  }

  private static handleUnknownError(error: unknown): ErrorResponseData {
    return {
      message: typeof error === "string" ? error : "An unknown error occurred.",
      statusCode: 500,
    }
  }

  public static getUserFriendlyMessage(errorData: ErrorResponseData): string {
    if (errorData.errors) {
      const fieldMessages = Object.entries(errorData.errors)
        .map(([_field, messages]) => messages.join(", "))
        .join(", ")
      return fieldMessages || errorData.message
    }
    return errorData.message
  }

  public static hasValidationErrors(errorData: ErrorResponseData): boolean {
    return !!(errorData.errors && Object.keys(errorData.errors).length > 0)
  }
}
