import useTranslation from "next-translate/useTranslation"
import { useState } from "react"

type ValidationFunction = (value: string) => string | null

export function useValidation() {
  const text = useTranslation().t

  const [errors, setErrors] = useState<string[]>([])

  const validateRequiredField: ValidationFunction = (value) => {
    if (!value) {
      return text("validation:required")
    }
    return null
  }

  const validateEmailField: ValidationFunction = (value) => {
    if (!value) {
      return text("validation:required")
    }
    const isValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)
    if (!isValid) {
      return text("validation:validemail")
    }
    return null
  }

  const validatePasswordField: ValidationFunction = (value) => {
    if (!value) {
      return text("validation:required")
    }
    const isValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
      value
    )
    if (!isValid) {
      return text("validation:validpassword")
    }
    return null
  }

  const validateNameField: ValidationFunction = (value) => {
    if (!value) {
      return text("validation:required")
    }
    if (value.length < 2) {
      return text("validation:validname")
    }
    return null
  }

  const validateField = (value: string, validators: ValidationFunction[]) => {
    const errorMessages = validators
      .map((validator) => validator(value))
      .filter((errorMessage) => errorMessage !== null) as string[]
    setErrors(errorMessages)
  }

  return {
    errors,
    validateField,
    validators: {
      required: validateRequiredField,
      email: validateEmailField,
      password: validatePasswordField,
      name: validateNameField,
    },
  }
}
