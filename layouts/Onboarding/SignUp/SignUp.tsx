import useTranslation from "next-translate/useTranslation"
import { Header } from "../../../components/Header/Header"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { SignUpContent } from "./SignUpContent"

type SignUpProps = {
  headerImageUrl: string
}

export default function SignUp(props: SignUpProps) {
  const text = useTranslation().t

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("signup:tab1a")}
        onClick={() => console.log("tab1a")}
      />,
      <Tag
        key={2}
        variant="txt"
        text={text("signup:tab2")}
        onClick={() => console.log("tab2")}
      />,
    ]
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      <Header background_url={props.headerImageUrl}>
        <Tag variant="txt" text={text("signup:titletag")} />
      </Header>
      <SignUpContent />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  )
}
