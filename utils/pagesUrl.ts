const page = (pageSlug: string) => `/${pageSlug}`

type pageSettingsProps = {
  pageSlug?: string
  pageSettings?: string
}

const pageSettings = ({ pageSlug, pageSettings }: pageSettingsProps) => {
  if (pageSettings && pageSlug) {
    return `/adm/${pageSlug}/config/${pageSettings}`
  } else if (pageSlug) {
    return `/adm/${pageSlug}`
  } else {
    return `/adm`
  }
}

const createPage = (wsSlug: string) => `/adm/ws/${wsSlug}/new-page`

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
  workspaceSlug?: string
  settings?: string
}

const workspaceSettings = ({
  workspaceSlug,
  settings,
}: workspaceSettingsProps) => {
  if (settings && workspaceSlug) {
    return `/adm/ws/${workspaceSlug}/${settings}`
  } else if (settings && !workspaceSlug) {
    return `/adm/ws/${settings}`
  } else if (!settings && workspaceSlug) {
    return `/adm/ws/${workspaceSlug}`
  } else {
    return `/adm/ws`
  }
}

const pageNotFound = () => {
  return "/404"
}

const login = () => {
  return `/login`
}

const createTemplate = (pageSlug: string) => {
  return `/adm/${pageSlug}/new-template`
}

const adm = () => {
  return `/adm`
}

const pageInternalServerError = () => {
  return "500"
}

const signup = () => {
  return "signup"
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
  createTemplate,
  adm,
  pageNotFound,
  pageInternalServerError,
  signup,
}
