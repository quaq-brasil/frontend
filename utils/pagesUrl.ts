const page = (pageSlug: string) => `/${pageSlug}`

type pageSettingsProps = {
  pageSlug: string
  pageSettings?: string
}

const pageSettings = ({ pageSlug, pageSettings }: pageSettingsProps) => {
  if (pageSettings) {
    return `/adm/${pageSlug}/${pageSettings}`
  } else {
    return `/adm/${pageSlug}`
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
    return `/me/${settings}`
  } else {
    return `/me`
  }
}

type workspageSettingsProps = {
  woskpaceSlug?: string
  settings?: string
}

const workspageSettings = ({
  woskpaceSlug,
  settings,
}: workspageSettingsProps) => {
  if (settings && woskpaceSlug) {
    return `/ws/${woskpaceSlug}/${settings}`
  } else if (settings && !woskpaceSlug) {
    return `/ws/${settings}`
  } else if (!settings && woskpaceSlug) {
    return `/ws/${woskpaceSlug}`
  } else {
    return `/ws`
  }
}

const login = () => {
  return `/me/login`
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
  workspageSettings,
  login,
}
