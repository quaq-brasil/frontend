const page = (pageSlug: string) => `/${pageSlug}`

const pageSettings = (pageSlug: string, pageSettings?: string) => {
  if (pageSettings) {
    return `/adm/${pageSlug}/${pageSettings}`
  } else {
    return `/adm/${pageSlug}`
  }
}

const createPage = () => `/create-page`

const template = (pageSlug: string, templateSlug: string) =>
  `/${pageSlug}/${templateSlug}`

const templateCentralTrackers = (pageSlug: string, templateSlug: string) =>
  `/${pageSlug}/${templateSlug}/trackers`

const terms = () => `/terms`

const home = () => `/`

const explorer = () => `/explorer`

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

export const pageUrls = {
  page,
  pageSettings,
  template,
  templateCentralTrackers,
  terms,
  home,
  explorer,
  createPage,
  meSettings,
  workspageSettings,
}
