import useTranslation from "next-translate/useTranslation"
import { BracketsCurly, Check } from "phosphor-react"
import { useState } from "react"
import { Card } from "../../../components/Card/Card"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { Dialog } from "../../../components/Dialog/Dialog"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"

type FileEntryConfigProps = {
  isOpen: boolean
  setIsOpen: () => void
  size?: "sm" | "md" | "full"
}

export function FileEntryConfig(props: FileEntryConfigProps) {
  const text = useTranslation().t

  const [types, setTypes] = useState<String[]>([])

  function handleChangeType(newType: string) {
    if (types.includes(newType)) {
      setTypes(types.filter((type) => type !== newType))
    } else {
      setTypes([...types, newType])
    }
  }

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("fileentryconfig:tab1")}
        onClick={() => props.setIsOpen()}
      />,
    ]
  }

  return (
    <>
      <Dialog
        height={props.size}
        isOpen={props.isOpen}
        title={text("fileentryconfig:toptitle")}
        onClose={() => console.log("closed")}
      >
        <div className="flex flex-col items-center gap-3 lg:gap-6">
          <Card>
            <CardText label={text("fileentryconfig:title")} />
            <CardTextInput
              input={{
                label: text("fileentryconfig:label"),
                onChange: () => console.log(),
              }}
              indicator={{ icon: BracketsCurly, onClick: () => console.log() }}
            />
          </Card>
          <Card>
            <CardText label={text("fileentryconfig:title2")} />
            <CardTextInput
              input={{
                label: text("fileentryconfig:label2"),
                onChange: () => console.log(),
              }}
              indicator={{ icon: BracketsCurly, onClick: () => console.log() }}
            />
          </Card>

          <Card>
            <CardText label={text("fileentryconfig:type")} />
            <CardText
              label={text("fileentryconfig:pdf")}
              indicator={{
                icon: Check,
                onClick: () => handleChangeType("pdf"),
                isVisible: types.includes("pdf") ? false : true,
              }}
            />
            <CardText
              label={text("fileentryconfig:image")}
              indicator={{
                icon: Check,
                onClick: () => handleChangeType("image"),
                isVisible: types.includes("image") ? false : true,
              }}
            />
            <CardText
              label={text("fileentryconfig:csv")}
              indicator={{
                icon: Check,
                onClick: () => handleChangeType("csv"),
                isVisible: types.includes("csv") ? false : true,
              }}
            />
            <CardText
              label={text("fileentryconfig:mp4")}
              indicator={{
                icon: Check,
                onClick: () => handleChangeType("mp4"),
                isVisible: types.includes("mp4") ? false : true,
              }}
            />
          </Card>

          <Card>
            <CardText label={text("fileentryconfig:saveas")} />
            <CardTextInput
              input={{
                label: text("fileentryconfig:labelsave"),
                onChange: () => console.log(),
              }}
              indicator={{ icon: BracketsCurly, onClick: () => console.log() }}
            />
          </Card>
          {props.size === "sm" && (
            <button
              className="flex flex-col gap-[0.3125rem] w-[23.375rem] justify-center bg-white
            rounded-[20px] lg:w-[35.25rem] lg:rounded-[30px]"
            >
              <p className="w-full p-3 lg:text-[1.1rem] lg:p-[1.125rem]">
                {text("fileentryconfig:savebutton")}
              </p>
            </button>
          )}
        </div>
        <TabBar
          isHidden={props.size === "sm" ? true : false}
          tags={handleTabBar()}
        />
      </Dialog>
    </>
  )
}
