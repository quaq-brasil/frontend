const page = (pageSlug: string) => `/${pageSlug}`

const templateCentralTrackers = (pageSlug: string, templateSlug: string) =>
  `/${pageSlug}/${templateSlug}/trackers`

const terms = () => `/terms`

const home = () => `/`

export const pageUrls = {
  page,
  templateCentralTrackers,
  terms,
  home,
}
