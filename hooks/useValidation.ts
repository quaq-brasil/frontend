import { useCallback, useEffect, useMemo, useState } from "react"

type Validator<T> = (value: T, ...args: any[]) => string | null

type ValidationRule<T> =
  | Validator<T>
  | { validator: Validator<T>; args?: any[] }

type InitialValuesAndValidators<T> = {
  [K in keyof T]: {
    initialValue: T[K]
    validators?: Array<ValidationRule<T[K]>>
  }
}

export function useValidation<T>(
  initialValuesAndValidators: InitialValuesAndValidators<T>
): [
  T,
  (value: Partial<T>) => void,
  Partial<{ [K in keyof T]: string[] | null }>,
  boolean
] {
  const initialValues = useMemo(() => {
    const values: Partial<T> = {}
    for (const key in initialValuesAndValidators) {
      values[key] = initialValuesAndValidators[key].initialValue
    }
    return values as T
  }, [initialValuesAndValidators])

  const validators = useMemo(() => {
    const val: { [K in keyof T]?: Array<ValidationRule<T[K]>> } = {}
    for (const key in initialValuesAndValidators) {
      val[key] = initialValuesAndValidators[key].validators || []
    }
    return val
  }, [initialValuesAndValidators])

  const [value, setValue] = useState(initialValues)
  const [errors, setErrors] = useState<{ [K in keyof T]?: string[] | null }>({})

  const fieldValidators = useMemo(() => {
    const fieldVal: { [K in keyof T]?: Validator<T[K]>[] } = {}

    for (const field in validators) {
      const key = field as keyof T
      fieldVal[key] =
        validators[key]?.map((rule) => createValidator(rule)) || []
    }

    return fieldVal
  }, [validators])

  const validate = useCallback(() => {
    const newErrors: { [K in keyof T]?: string[] | null } = {}

    for (const field in fieldValidators) {
      const key = field as keyof T
      const fieldValidatorsList = fieldValidators[key]
      const fieldErrors = fieldValidatorsList
        .map((validator) => validator(value[key]))
        .filter(Boolean) as string[]
      newErrors[key] = fieldErrors.length > 0 ? fieldErrors : null
    }

    setErrors((prevErrors) => {
      const shouldUpdate =
        JSON.stringify(prevErrors) !== JSON.stringify(newErrors)
      return shouldUpdate ? newErrors : prevErrors
    })
  }, [value, fieldValidators])

  useEffect(() => {
    validate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const isValid = Object.values(errors).every((error) => error === null)

  const updateValue = (newValue: Partial<T>) => {
    setValue((prevValue) => ({ ...prevValue, ...newValue }))
  }

  return [value, updateValue, errors, isValid]
}

function createValidator<T>(rule: ValidationRule<T>): Validator<T> {
  if (typeof rule === "function") {
    return rule
  }

  const { validator, args } = rule
  return (value: T) => validator(value, ...(args || []))
}

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const strongPasswordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/
const urlPattern =
  /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)*([a-z\d]([a-z\d-]*[a-z\d])*)\.[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i

export const validationRules = {
  required:
    (errorMessage: string): Validator<any> =>
    (value: any) => {
      return value === null ||
        value === undefined ||
        (typeof value === "string" && !value.trim())
        ? errorMessage
        : null
    },
  minLength:
    (minLength: number, errorMessage: string): Validator<string> =>
    (value: string) => {
      return value.length < minLength ? errorMessage : null
    },
  email:
    (errorMessage: string): Validator<string> =>
    (value: string) => {
      return !emailPattern.test(value) ? errorMessage : null
    },
  passwordConfirmation:
    (errorMessage: string, getPasswordValue: () => any): Validator<string> =>
    (value: string) => {
      return value != getPasswordValue() ? errorMessage : null
    },
  strongPassword:
    (errorMessage: string): Validator<string> =>
    (value: string) => {
      return !strongPasswordPattern.test(value) ? errorMessage : null
    },
  custom:
    <T>(
      errorMessage: string,
      customValidator: (value: T, ...args: any[]) => boolean,
      args?: any[]
    ): Validator<T> =>
    (value: T) => {
      return !customValidator(value, ...(args || [])) ? errorMessage : null
    },
  url:
    (errorMessage: string): Validator<string> =>
    (value: string) => {
      return !urlPattern.test(value) ? errorMessage : null
    },
}
