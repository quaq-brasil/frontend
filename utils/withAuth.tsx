import { GetServerSidePropsContext, PreviewData } from "next/types"
import { ParsedUrlQuery } from "querystring"
import { getPayload, isTokenExpired } from "./auth"
import { appParseCookies } from "./cookies"
import { pageUrls } from "./pagesUrl"

export function withAuth(func: any) {
  return async (
    ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
  ) => {
    const cookies = appParseCookies(ctx.req)

    if (!cookies.token || isTokenExpired(cookies.token)) {
      return {
        redirect: {
          permanent: false,
          destination: pageUrls.login(),
        },
      }
    }

    const payload = getPayload(cookies.token)

    const result = await func(ctx, cookies, payload)

    if ("props" in result) {
      result.props = {
        ...result.props,
        payload,
      }
    }

    return result
  }
}
