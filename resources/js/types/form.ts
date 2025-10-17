import { InertiaFormProps } from "@inertiajs/react"
import {
  FieldValues,
  Path,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form"

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
  icon?: React.ReactNode
}

export interface FormSection {
  id: string
  title: string
  description?: string
  defaultExpanded?: boolean
  className?: string
  titleClassName?: string
  contentClassName?: string
  collapsible?: boolean
}

export interface PasswordValidationRules {
  minLength?: number
  requireUppercase?: boolean
  requireLowercase?: boolean
  requireNumber?: boolean
  requireSpecialChar?: boolean
  customRegex?: RegExp
  customErrorMessage?: string
  preventCommonPasswords?: boolean
  preventSequentialChars?: boolean
  preventRepeatingChars?: boolean
}

export interface CurrencyConfig {
  code: string
  symbol: string
  locale?: string
  decimals?: number
  allowNegative?: boolean
}

export interface DateValidation {
  minDate?: Date | string
  maxDate?: Date | string
  disabledDates?: Date[]
  disabledDaysOfWeek?: number[]
  excludePastDates?: boolean
  excludeFutureDates?: boolean
}

export interface FileUploadConfig {
  accept?: string
  multiple?: boolean
  maxSize?: number
  minSize?: number
  maxFiles?: number
  allowedTypes?: string[]
}

export interface ImageUploadConfig extends FileUploadConfig {
  aspectRatio?: number
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
}

export interface ValidationRules {
  required?: boolean | string
  minLength?: number | { value: number; message: string }
  maxLength?: number | { value: number; message: string }
  pattern?: RegExp | { value: RegExp; message: string }
  min?: number | { value: number; message: string }
  max?: number | { value: number; message: string }
  validate?: (value: any) => boolean | string
  passwordRules?: PasswordValidationRules
}

export interface FieldConfig<TFieldValues extends FieldValues = FieldValues> {
  name: Path<TFieldValues>
  type:
    | "text"
    | "password"
    | "password-input"
    | "email"
    | "number"
    | "select"
    | "multiselect"
    | "image"
    | "textarea"
    | "file"
    | "switch"
    | "currency"
    | "date"
    | "dateRange"
    | "checkbox"
    | "radio"
    | "phone"
    | "color"
    | "range"
    | "toggle"
    | "richtext"
    | "otp"
    | "custom"
  label: string
  placeholder?: string
  className?: string
  labelClassName?: string
  inputClassName?: string
  errorClassName?: string
  description?: string
  descriptionClassName?: string
  options?: SelectOption[]
  optionClassName?: string
  inlineOptions?: boolean
  defaultValue?: any
  defaultValues?: string[]
  showRequiredMarker?: boolean
  hidden?: boolean
  disabled?: boolean
  readOnly?: boolean
  autoFocus?: boolean
  autoComplete?: string
  validation?: ValidationRules
  required?: boolean | string
  section?: string
  span?: 1 | 2 | 3 | 4
  order?: number
  wrapperClassName?: string
  passwordConfig?: PasswordValidationRules
  currencyConfig?: CurrencyConfig
  dateConfig?: DateValidation
  fileConfig?: FileUploadConfig
  imageConfig?: ImageUploadConfig
  prefix?: string | React.ReactNode
  suffix?: string | React.ReactNode
  icon?: React.ReactNode
  helperText?: string
  tooltip?: string
  rows?: number
  step?: number
  min?: number
  max?: number
  showStrengthIndicator?: boolean
  otpLength?: number
  containerClassName?: string
  renderCondition?: (values: TFieldValues) => boolean
  enableCondition?: (values: TFieldValues) => boolean
  onChange?: (value: any) => void
  onBlur?: (value: any) => void
  onFocus?: (value: any) => void
  onComplete?: (value: string) => void
  customComponent?: React.ComponentType<{
    field: any
    fieldConfig: FieldConfig<TFieldValues>
  }>
}

export type DynamicFormType<TFieldValues extends FieldValues> =
  UseFormReturn<TFieldValues> &
    Partial<InertiaFormProps<TFieldValues>> & {
      processing?: boolean
    }

export interface DynamicFormProps<TFieldValues extends FieldValues> {
  form: DynamicFormType<TFieldValues>
  onSubmit: SubmitHandler<TFieldValues>
  fields: FieldConfig<TFieldValues>[]
  sections?: FormSection[]
  submitButtonTitle: string
  resetButtonTitle?: string
  className?: string
  disabled?: boolean
  submitButtonClassname?: string
  submitButtonTitleClassname?: string
  onReset?: () => void
  onCancel?: () => void
  isSignUp?: boolean
  isSignIn?: boolean
  isResetPassword?: boolean
  isOnEditAccount?: boolean
  isFloatingLabelInput?: boolean
  addCancelButton?: boolean
  twoColumnLayout?: boolean
  isUsingImagekit?: boolean
  gridColumns?: 1 | 2 | 3 | 4
  showSectionDividers?: boolean
  autoSave?: boolean
  autoSaveDelay?: number
  showLabels?: boolean
  size?: "sm" | "md" | "lg"
  preserveScroll?: boolean
  preserveState?: boolean
  resetOnSuccess?: boolean
}
