import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { IUpdateUser } from "../../../types/User.type"
import { pageUrls } from "../../../utils/pagesUrl"
import { SignupContent } from "./SignupContent"

type SignUpProps = {
  handleCreateUser: (data: IUpdateUser) => void
}

export default function SignUp({ handleCreateUser }: SignUpProps) {
  const text = useTranslation().t

  const [userData, setUserData] = useState<IUpdateUser>()
  const [isUpdating, setIsUpdating] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)

  function handleUpdateIsUpdating(stat: boolean) {
    setIsUpdating(stat)
  }

  function handleUpdateRunUpdate(stat: boolean) {
    setRunUpdate(stat)
  }

  function handleUpdateUserData(newData: IUpdateUser) {
    setUserData((state) => {
      return {
        ...state,
        ...newData,
      } as IUpdateUser
    })
    handleUpdateIsUpdating(true)
  }

  useEffect(() => {
    if (userData) {
      handleCreateUser(userData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

  function handleTabBar() {
    if (isUpdating) {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("signup:back")}
          onClick={() => pageUrls.Back()}
        />,
        <div key={2} className="w-fit h-fit xl:hidden">
          <Tag
            variant="txt"
            text={text("signup:signup")}
            onClick={() => handleUpdateRunUpdate(true)}
          />
        </div>,
      ]
    } else {
      return [
        <Tag
          key={1}
          variant="txt"
          text={text("signup:back")}
          onClick={() => pageUrls.Back()}
        />,
      ]
    }
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      <Header
        background_url={
          "https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80"
        }
      >
        <Tag variant="txt" text={text("signup:titletag")} />
      </Header>
      <SignupContent
        handleUpdateUserData={handleUpdateUserData}
        handleUpdateIsUpdating={handleUpdateIsUpdating}
        handleUpdateRunUpdate={handleUpdateRunUpdate}
        isUpdating={isUpdating}
        runUpdate={runUpdate}
      />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
