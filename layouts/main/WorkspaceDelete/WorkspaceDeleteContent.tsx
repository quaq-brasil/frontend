import useTranslation from "next-translate/useTranslation"
import { useEffect } from "react"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"

type WorkspaceDeleteContentProps = {
  isUpdating: boolean
  runUpdate: boolean
  handleUpdateIsUpdating: (stat: boolean) => void
  handleUpdateRunUpdate: (stat: boolean) => void
  handleDeleteWorkspace: () => void
}

export function WorkspaceDeleteContent({
  isUpdating,
  runUpdate,
  handleUpdateIsUpdating,
  handleUpdateRunUpdate,
}: WorkspaceDeleteContentProps) {
  const text = useTranslation().t

  function handleDeleteWorkspace() {
    handleUpdateRunUpdate(false)
    handleUpdateIsUpdating(false)
  }

  useEffect(() => {
    if (runUpdate) {
      handleDeleteWorkspace()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:p-[2rem]"
      >
        <div className="flex flex-col gap-2 md:gap-4 items-center">
          <Card>
            <CardText label={text("wsdelete:title")} />
            <CardLine />
            <CardText label={text("wsdelete:largetext")} />
            <CardLine />
          </Card>
          <Card>
            <CardText label={text("wsdelete:title2")} />
            <CardTextInput
              input={{
                label: text("wsdelete:input"),
                onChange: () => console.log(),
              }}
            />
          </Card>
          {isUpdating && (
            <div className="w-full h-fit hidden xl:block">
              <Button
                color="black"
                onClick={() => handleUpdateRunUpdate(true)}
                text={text("generalsettings:confirm")}
              />
            </div>
          )}
          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
