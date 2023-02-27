import axios from "axios"
import { pageUrls } from "./pagesUrl"

export type redirectNotFoundVerifyProps = {
  ctx: any
  cookies: any
  payload: any
}

export async function RedirectNotFoundVerify(
  func: any,
  ctx: any,
  cookies: any,
  payload: any
) {
  try {
    const data = await func({ ctx, cookies, payload })

    return { props: data }
  } catch (err: any) {
    console.log("err.response", err.response)

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
