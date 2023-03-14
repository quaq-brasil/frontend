import { Card } from "components/Card/Card"
import { CardLine } from "components/Card/CardContentVariants/CardLine"
import { CardLog } from "components/Card/CardContentVariants/CardLog"
import { CardText } from "components/Card/CardContentVariants/CardText"
import { Dialog } from "components/Dialog/Dialog"
import { TabBar } from "components/TabBar/TabBar"
import { Tag } from "components/Tag/Tag"
import useTranslation from "next-translate/useTranslation"
import { ArrowRight } from "phosphor-react"

type CreationsConfigPagesProps = {
  isOpen: boolean
  onClose: () => void
  size?: "sm" | "md" | "full"
}

export function CreationsConfigPages(props: CreationsConfigPagesProps) {
  const text = useTranslation().t

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("creationsconfig:back")}
        onClick={() => props.onClose()}
      />,
    ]
  }

  function loadContent() {
    return (
      <>
        <CardText label="workspace" />
        <CardLog
          date="quaq.me/pagetitle"
          name="Page Title"
          icon={ArrowRight}
          img_url="https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80"
        />
        <CardLine />
        <CardLog
          date="quaq.me/pagetitle"
          name="Page Title"
          icon={ArrowRight}
          img_url="https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80"
        />
        <CardLine />
        <CardLog
          date="quaq.me/pagetitle"
          name="Page Title"
          icon={ArrowRight}
          img_url="https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80"
        />
        <CardLine />
        <CardLog
          date="quaq.me/pagetitle"
          name="Page Title"
          icon={ArrowRight}
          img_url="https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80"
        />
        <CardLine />
        <CardText label="workspace" />
        <CardLog
          date="quaq.me/pagetitle"
          name="Page Title"
          icon={ArrowRight}
          img_url="https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80"
        />
        <CardLine />
        <CardLog
          date="quaq.me/pagetitle"
          name="Page Title"
          icon={ArrowRight}
          img_url="https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80"
        />
        <CardLine />
        <CardLog
          date="quaq.me/pagetitle"
          name="Page Title"
          icon={ArrowRight}
          img_url="https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80"
        />
        <CardLine />
        <CardLog
          date="quaq.me/pagetitle"
          name="Page Title"
          icon={ArrowRight}
          img_url="https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80"
        />
        <CardLine />
      </>
    )
  }

  return (
    <>
      <Dialog
        height={props.size}
        isOpen={props.isOpen}
        title={text("creationsconfig:toptitle")}
      >
        <div className="flex flex-col items-center gap-3 lg:gap-6">
          <Card>{loadContent()}</Card>
        </div>
        <TabBar
          isHidden={props.size === "sm" ? true : false}
          tags={handleTabBar()}
        />
      </Dialog>
    </>
  )
}
