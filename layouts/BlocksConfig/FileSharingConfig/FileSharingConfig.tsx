import useTranslation from "next-translate/useTranslation"
import { BracketsCurly } from "phosphor-react"
import { useState } from "react"
import { Card } from "../../../components/Card/Card"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { Dialog } from "../../../components/Dialog/Dialog"
import { FileProps } from "../../../components/FileEntryBlock/FileEntryBlock"
import { FileManager } from "../../../components/FileManager/FileManager"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"

type FileSharingConfigProps = {
  isOpen: boolean
  setIsOpen: () => void
  size?: "sm" | "md" | "full"
}

export function FileSharingConfig(props: FileSharingConfigProps) {
  const text = useTranslation().t

  const [files, setFiles] = useState<FileProps[]>([])

  function handleAddFile({ file, name }: FileProps) {
    setFiles([
      ...files,
      {
        name: name,
        file: file,
      },
    ])
  }

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("filesharingconfig:tab1")}
        onClick={() => props.setIsOpen()}
      />,
    ]
  }

  return (
    <>
      <Dialog
        height={props.size}
        isOpen={props.isOpen}
        title={text("filesharingconfig:toptitle")}
        onClose={() => console.log("closed")}
      >
        <div className="flex flex-col items-center gap-3 lg:gap-6">
          <Card>
            <CardText label={text("filesharingconfig:title")} />
            <CardTextInput
              input={{
                label: text("filesharingconfig:label"),
                onChange: () => console.log(),
              }}
              indicator={{ icon: BracketsCurly, onClick: () => console.log() }}
            />
          </Card>
          <Card>
            <CardText label={text("filesharingconfig:files")} />
            <CardLine />
            <FileManager files={files} onFileChange={handleAddFile} />
            <CardLine />
          </Card>
          <Card>
            <CardText label={text("filesharingconfig:saveas")} />
            <CardTextInput
              input={{
                label: text("filesharingconfig:label2"),
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
                {text("filesharingconfig:savebutton")}
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
