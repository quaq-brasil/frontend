import useTranslation from "next-translate/useTranslation"
import { useState } from "react"
import { validateEmail, validateNumber, validateUrl } from "utils/validations"

type TextEntryProps = {
  type: string
  placeholder?: string
  onChange?: (value: string) => void
}

export function TextEntry({ placeholder, type, onChange }: TextEntryProps) {
  const [value, setValue] = useState<string | number | undefined>(undefined)
  const [valid, setValid] = useState(true)
  const [error, setError] = useState("")

  const text = useTranslation().t

  const handleChange = (e: any) => {
    setValue(e.target.value)
    onChange && onChange(e.target.value)
    switch (type) {
      case "email":
        const emailValid = validateEmail(e.target.value)
        if (!emailValid) {
          setError(text("textentryblock:invalid_email"))
          setValid(false)
        } else {
          setError("")
          setValid(true)
        }
        break
      case "number":
        const numberValid = validateNumber(e.target.value)
        if (!numberValid) {
          setError(text("textentryblock:invalid_number"))
          setValid(false)
        } else {
          setError("")
          setValid(true)
        }
        break
      case "url":
        const urlValid = validateUrl(e.target.value)
        if (!urlValid) {
          setError(text("textentryblock:invalid_url"))
          setValid(false)
        } else {
          setError("")
          setValid(true)
        }
        break
      default:
        setError("")
        setValid(true)
    }
  }

  switch (type) {
    case "text":
      return (
        <div>
          <input
            type="text"
            className={`w-full bg-slate-50 p-3 placeholder:text-slate-500 focus:outline-none text-[1rem] md:text-[1.125rem]`}
            placeholder={placeholder || text("textentryblock:placeholder")}
            value={value}
            onChange={handleChange}
          />
          {!valid && (
            <p className="text-red-500 w-full text-center text-[1rem] md:text-[1.125rem]">
              {error}
            </p>
          )}
        </div>
      )
    case "long-text":
      return (
        <div>
          <textarea
            className={`w-full bg-slate-50 p-3 placeholder:text-slate-500 focus:outline-none text-[1rem] md:text-[1.125rem]`}
            placeholder={placeholder || text("textentryblock:placeholder")}
            value={value}
            onChange={handleChange}
          />
          {!valid && (
            <p className="text-red-500 w-full text-center text-[1rem] md:text-[1.125rem]">
              {error}
            </p>
          )}
        </div>
      )
    case "number":
      return (
        <div>
          <input
            type="number"
            className="w-full bg-slate-50 p-3 placeholder:text-slate-500 focus:outline-none text-[1rem] md:text-[1.125rem]"
            placeholder={placeholder || text("textentryblock:placeholder")}
            value={value}
            onChange={handleChange}
          />
          {!valid && (
            <p className="text-red-500 w-full text-center text-[1rem] md:text-[1.125rem]">
              {error}
            </p>
          )}
        </div>
      )
    case "email":
      return (
        <div>
          <input
            type="email"
            className="w-full bg-slate-50 p-3 placeholder:text-slate-500 focus:outline-none text-[1rem] md:text-[1.125rem]"
            placeholder={placeholder || text("textentryblock:placeholder")}
            value={value}
            onChange={handleChange}
          />
          {!valid && (
            <p className="text-red-500 w-full text-center text-[1rem] md:text-[1.125rem]">
              {error}
            </p>
          )}
        </div>
      )
    case "password":
      return (
        <div>
          <input
            type="password"
            className="w-full bg-slate-50 p-3 placeholder:text-slate-500 focus:outline-none text-[1rem] md:text-[1.125rem]"
            placeholder={placeholder || text("textentryblock:placeholder")}
            value={value}
            onChange={handleChange}
          />
          {!valid && (
            <p className="text-red-500 w-full text-center text-[1rem] md:text-[1.125rem]">
              {error}
            </p>
          )}
        </div>
      )
    case "url":
      return (
        <div>
          <input
            type="url"
            className={`w-full bg-slate-50 p-3 placeholder:text-slate-500 focus:outline-none text-[1rem] md:text-[1.125rem]`}
            placeholder={placeholder || text("textentryblock:placeholder")}
            value={value}
            onChange={handleChange}
          />
          {!valid && (
            <p className="text-red-500 w-full text-center text-[1rem] md:text-[1.125rem]">
              {error}
            </p>
          )}
        </div>
      )
    default:
      return null
  }
}
