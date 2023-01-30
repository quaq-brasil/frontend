const page = (pageSlug: string) => `/${pageSlug}`

const pageSettings = (pageSlug: string, pageSettings: string) =>
  `/${pageSlug}/settings/${pageSettings}`

const createPage = () => `/create-page`

const template = (pageSlug: string, templateSlug: string) =>
  `/${pageSlug}/${templateSlug}`

const templateCentralTrackers = (pageSlug: string, templateSlug: string) =>
  `/${pageSlug}/${templateSlug}/trackers`

const terms = () => `/terms`

const home = () => `/`

const explorer = () => `/explorer`

export const pageUrls = {
  page,
  pageSettings,
  template,
  templateCentralTrackers,
  terms,
  home,
  explorer,
  createPage,
}
