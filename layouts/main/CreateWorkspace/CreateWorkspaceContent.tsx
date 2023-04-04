import { Button } from "components/Button/Button"
import { Card } from "components/Card/Card"
import { CardImageInput } from "components/Card/CardContentVariants/CardImageInput"
import { CardText } from "components/Card/CardContentVariants/CardText"
import { CardTextInput } from "components/Card/CardContentVariants/CardTextInput"
import { ImageSelector } from "components/ImageSelector/ImageSelector"
import { useValidation, validationRules } from "hooks/useValidation"
import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import { IUpdateWorkspace } from "types/Workspace.type"

type CreateWorkspaceContentProps = {
  isUpdating: boolean
  handleUpdateWorkspaceData: (data: IUpdateWorkspace) => void
  handleUpdateRunUpdate: (stat: boolean) => void
  handleUpdateIsUpdating: (stat: boolean) => void
  runUpdate: boolean
  handleCreateWorkspace: (data: IUpdateWorkspace) => void
}

export function CreateWorkspaceContent({
  isUpdating,
  handleUpdateWorkspaceData,
  handleUpdateRunUpdate,
  handleUpdateIsUpdating,
  runUpdate,
  handleCreateWorkspace,
}: CreateWorkspaceContentProps) {
  const text = useTranslation().t

  type LocalWorkspaceProps = {
    title?: string
    avatar_url?: string
  }

  const [
    localWorkspaceData,
    setLocalWorkspaceData,
    localWorkspaceDataErrors,
    isLocalWorkspaceDataValid,
  ] = useValidation<LocalWorkspaceProps>({
    title: {
      initialValue: "",
      validators: [validationRules.required(text("validation:required"))],
    },
    avatar_url: {
      initialValue: "",
      validators: [validationRules.required(text("validation:required"))],
    },
  })

  const [hasDataChanged, setHasDataChanged] = useState(false)

  function handleUpdateLocalPageData(newWorkspaceData: LocalWorkspaceProps) {
    setLocalWorkspaceData({ ...localWorkspaceData, ...newWorkspaceData })
  }

  useEffect(() => {
    if (isLocalWorkspaceDataValid || !hasDataChanged) {
      handleUpdateIsUpdating(true)
    } else {
      handleUpdateIsUpdating(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLocalWorkspaceDataValid])

  useEffect(() => {
    if (runUpdate && isUpdating) {
      if (isLocalWorkspaceDataValid) {
        handleCreateWorkspace({
          title: localWorkspaceData.title,
          avatar_url: localWorkspaceData.avatar_url,
        })
      } else {
        setHasDataChanged(true)
      }
      handleUpdateRunUpdate(false)
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
            <CardText label={text("createwspace:getwsname")} />
            <CardTextInput
              input={{
                label: text("createwspace:inputwsname"),
                onChange: (title) => {
                  handleUpdateLocalPageData({ title: title })
                },
                value: localWorkspaceData.title,
                errors: hasDataChanged ? localWorkspaceDataErrors.title : [],
              }}
            />
          </Card>
          <Card>
            <CardText label={text("createwspace:uploadimg")} />
            <CardImageInput
              imageSelector={
                <ImageSelector
                  onImageChange={(image) => {
                    handleUpdateLocalPageData({ avatar_url: image })
                  }}
                />
              }
              errors={hasDataChanged ? localWorkspaceDataErrors.avatar_url : []}
            />
          </Card>
          {isUpdating && (
            <div className="w-full h-fit hidden xl:block">
              <Button
                block={{
                  data: {
                    color: "bg-slate-900",
                    text: text("createwspace:confirm"),
                    onClick: () => handleUpdateRunUpdate(true),
                  },
                }}
                isEditable={false}
              />
            </div>
          )}
          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
