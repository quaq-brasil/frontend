import { useEffect, useState } from "react"

type UseDebounceProps<T> = {
  value: T
  delay: number
}

export function useDebounce<T>({ value, delay }: UseDebounceProps<T>): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
