import useTranslation from "next-translate/useTranslation"
import { useCallback, useMemo, useState } from "react"

type ValidationFunction = (value: string) => string | null

export function useValidation() {
  const text = useTranslation().t

  const [errors, setErrors] = useState<string[]>([])

  const validateRequiredField = useMemo<ValidationFunction>(() => {
    return (value) => {
      if (!value) {
        return text("validation:required")
      }
      return null
    }
  }, [text])

  const validateEmailField = useMemo<ValidationFunction>(() => {
    return (value) => {
      if (!value) {
        return text("validation:required")
      }
      const isValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)
      if (!isValid) {
        return text("validation:validemail")
      }
      return null
    }
  }, [text])

  const validatePasswordField = useMemo<ValidationFunction>(() => {
    return (value) => {
      if (!value) {
        return text("validation:required")
      }
      const isValid =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value)
      if (!isValid) {
        return text("validation:validpassword")
      }
      return null
    }
  }, [text])

  const validateNameField = useMemo<ValidationFunction>(() => {
    return (value) => {
      if (!value) {
        return text("validation:required")
      }
      if (value.length < 2) {
        return text("validation:validname")
      }
      return null
    }
  }, [text])

  const validateTitleField = useMemo<ValidationFunction>(() => {
    return (value) => {
      if (!value) {
        return text("validation:required")
      }
      if (value.length < 2) {
        return text("validation:validtitle")
      }
      return null
    }
  }, [text])

  const validateField = useCallback(
    (value: string, validators: ValidationFunction[]) => {
      const errorMessages = validators
        .map((validator) => validator(value))
        .filter((errorMessage) => errorMessage !== null)
      setErrors(errorMessages)
    },
    []
  )

  return {
    errors,
    validateField,
    validators: {
      required: validateRequiredField,
      email: validateEmailField,
      password: validatePasswordField,
      name: validateNameField,
      title: validateTitleField,
    },
  }
}
