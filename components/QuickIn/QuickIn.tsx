import { Tag } from "components/Tag/Tag"
import { GetServerSideProps } from "next"
import { getSession, signIn } from "next-auth/react"
import useTranslation from "next-translate/useTranslation"

type QuickInProps = {
  currentUrl: (currentUrl: string) => void
  isHidden?: boolean
}

export default function QuickIn(props: QuickInProps) {
  const text = useTranslation().t

  function handleClick(provider: string) {
    props.currentUrl(window.location.href)
    signIn(provider)
  }

  return (
    <div
      className={`flex flex-col justify-between items-center min-w-[100%]
        py-[1rem] rounded-[20px] lg:rounded-[30px] bg-white ${
          props.isHidden ? "hidden" : ""
        }`}
    >
      <p className="w-full px-3 pb-3 text-left lg:text-[1.1rem] lg:px-[1.125rem] lg:pb-[1.125rem]">
        {text("common:quickin")}
      </p>
      <div className="w-full">
        <div className="flex flex-row justify-start overflow-x-auto overflow-y-clip scrollbar-hide pr-3">
          <button
            className="ml-3 h-[2.625rem] lg:h-[3.375rem] rounded-full border border-slate-200"
            onClick={() => handleClick("facebook")}
          >
            <Tag
              variant="img-txt"
              text="facebook"
              img_url="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
            />
          </button>
          <button
            className="ml-3 h-[2.625rem] lg:h-[3.375rem] rounded-full border border-slate-200"
            onClick={() => handleClick("google")}
          >
            <Tag
              variant="img-txt"
              text="gmail"
              img_url="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/480px-Google_%22G%22_Logo.svg.png"
            />
          </button>
          <button
            className="ml-3 h-[2.625rem] lg:h-[3.375rem] rounded-full border border-slate-200"
            onClick={() => handleClick("github")}
          >
            <Tag
              variant="img-txt"
              text="github"
              img_url="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/480px-Octicons-mark-github.svg.png"
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (conect) => {
  const session = await getSession(conect)

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}
