import axios from "axios"
import { pageUrls } from "./pagesUrl"

export type redirectNotFoundVerifyProps = {
  ctx: any
  cookies: any
  payload: any
}

type RedirectNotFoundVerifyProps = {
  func: any
  ctx: any
  cookies?: any
  payload?: any
  isStatic?: boolean
}

export async function RedirectNotFoundVerify({
  func,
  ctx,
  cookies,
  payload,
  isStatic,
}: RedirectNotFoundVerifyProps) {
  try {
    const data = await func({ ctx, cookies, payload })

    if (isStatic) {
      return { props: { ...data }, revalidate: 1 }
    }

    return { props: { ...data } }
  } catch (err: any) {
    if (
      axios.isAxiosError(err) &&
      (err.response?.status === 401 ||
        err.response?.status === 403 ||
        err.response?.status === 404)
    ) {
      return {
        redirect: {
          permanent: false,
          destination: pageUrls.pageNotFound(),
        },
      }
    }

    return {
      redirect: {
        permanent: false,
        destination: pageUrls.pageInternalServerError(),
      },
    }
  }
}
