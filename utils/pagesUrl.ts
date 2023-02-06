import { useRouter } from "next/router"

const page = (pageSlug: string) => `/${pageSlug}`

type pageSettingsProps = {
  pageSlug?: string
  pageSettings?: string
}

const pageSettings = ({ pageSlug, pageSettings }: pageSettingsProps) => {
  if (pageSettings && pageSlug) {
    return `/adm/${pageSlug}/${pageSettings}`
  } else if (pageSlug) {
    return `/adm/${pageSlug}`
  } else {
    return `/adm`
  }
}

const createPage = () => `/create-page`

const template = (pageSlug: string, templateSlug: string) =>
  `/${pageSlug}/${templateSlug}`

type templateCentralProps = {
  pageSlug: string
  templateSlug: string
  settings: string
}

const templateCentral = ({
  pageSlug,
  templateSlug,
  settings,
}: templateCentralProps) => `/adm/${pageSlug}/${templateSlug}/${settings}`

const terms = () => `/terms`

const home = () => `/`

const meSettings = (settings?: string) => {
  if (settings) {
    return `/account/${settings}`
  } else {
    return `/account`
  }
}

type workspaceSettingsProps = {
  woskpaceSlug?: string
  settings?: string
}

const workspaceSettings = ({
  woskpaceSlug,
  settings,
}: workspaceSettingsProps) => {
  if (settings && woskpaceSlug) {
    return `/adm/ws/${woskpaceSlug}/${settings}`
  } else if (settings && !woskpaceSlug) {
    return `/adm/ws/${settings}`
  } else if (!settings && woskpaceSlug) {
    return `/adm/ws/${woskpaceSlug}`
  } else {
    return `/adm/ws`
  }
}

const login = () => {
  return `/account/login`
}

const Back = () => {
  const router = useRouter()

  return router.back()
}

const createTemplate = (pageSlug: string) => {
  return `/adm/${pageSlug}/new-template`
}

const adm = () => {
  return `/adm`
}

export const pageUrls = {
  page,
  pageSettings,
  template,
  templateCentral,
  terms,
  home,
  createPage,
  meSettings,
  workspaceSettings,
  login,
  Back,
  createTemplate,
  adm,
}
