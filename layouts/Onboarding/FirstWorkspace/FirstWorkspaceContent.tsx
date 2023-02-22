import useTranslation from "next-translate/useTranslation"
import { useState } from "react"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardImageInput } from "../../../components/Card/CardContentVariants/CardImageInput"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { ImageSelector } from "../../../components/ImageSelector/ImageSelector"
import { IUpdateWorkspace } from "../../../types/Workspace.type"

type FirstWorkspaceContentProps = {
  isUpdating: boolean
  handleUpdateWorkspaceData: (data: IUpdateWorkspace) => void
  handleUpdateRunUpdate: (stat: boolean) => void
  handleUpdateIsUpdating: (stat: boolean) => void
}

export function FirstWorkspaceContent({
  handleUpdateIsUpdating,
  handleUpdateRunUpdate,
  handleUpdateWorkspaceData,
  isUpdating,
}: FirstWorkspaceContentProps) {
  const text = useTranslation().t

  type FormDataProps = {
    title?: {
      valid?: boolean
    }
    avatar?: {
      valid?: boolean
    }
  }

  const [formData, setFormData] = useState<FormDataProps>({
    title: {
      valid: false,
    },
    avatar: {
      valid: false,
    },
  })

  function handleUpdateFormData(newData: FormDataProps) {
    setFormData((state) => {
      return {
        ...state,
        ...newData,
      } as FormDataProps
    })
    if (formData.avatar?.valid && formData.title?.valid) {
      handleUpdateIsUpdating(true)
    }
  }

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:p-[2rem]"
      >
        <div className="flex flex-col gap-2 md:gap-4 items-center">
          <Card>
            <CardText label={text("wssetup:firstmessage")} />
          </Card>
          <Card>
            <CardText label={text("wssetup:getwsname")} />
            <CardTextInput
              input={{
                label: text("wssetup:inputwsname"),
                onChange: (title) =>
                  handleUpdateWorkspaceData({ title: title }),
                type: "title",
                setValid: () =>
                  handleUpdateFormData({ title: { valid: true } }),
              }}
            />
          </Card>
          <Card>
            <CardText label={text("wssetup:uploadimg")} />
            <CardImageInput
              imageSelector={
                <ImageSelector
                  onImageChange={(image) => {
                    handleUpdateWorkspaceData({ avatar_url: image })
                    handleUpdateFormData({ avatar: { valid: true } })
                  }}
                />
              }
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
