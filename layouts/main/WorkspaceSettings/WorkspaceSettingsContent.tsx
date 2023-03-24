import { Button } from "components/Button/Button"
import { Card } from "components/Card/Card"
import { CardImageInput } from "components/Card/CardContentVariants/CardImageInput"
import { CardLine } from "components/Card/CardContentVariants/CardLine"
import { CardText } from "components/Card/CardContentVariants/CardText"
import { CardTextInput } from "components/Card/CardContentVariants/CardTextInput"
import { ImageSelector } from "components/ImageSelector/ImageSelector"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { ArrowRight } from "phosphor-react"
import { useEffect, useState } from "react"
import { IUpdateWorkspace } from "types/Workspace.type"
import { pageUrls } from "utils/pagesUrl"

type WorkspaceSettingsContentProps = {
  handleUpdateWorkspaceData: (data: IUpdateWorkspace) => void
  handleUpdateRunUpdate: (stat: boolean) => void
  handleUpdateIsUpdating: (stat: boolean) => void
  workspaceData: IUpdateWorkspace | undefined
  isUpdating: boolean
}

export function WorkspaceSettingsContent({
  handleUpdateWorkspaceData,
  handleUpdateRunUpdate,
  handleUpdateIsUpdating,
  isUpdating,
  workspaceData,
}: WorkspaceSettingsContentProps) {
  const text = useTranslation().t
  const router = useRouter()

  type FormDataProps = {
    title?: {
      valid?: boolean
    }
    image?: {
      valid?: boolean
    }
  }

  const [formData, setFormData] = useState<FormDataProps>({
    image: { valid: false },
    title: { valid: false },
  })
  const [isChanging, setIsChanging] = useState(false)
  const [localWorkspaceData, setLocalWorkspaceData] =
    useState<IUpdateWorkspace | null>()

  function handleUpdateIsChanging(stat: boolean) {
    setIsChanging(stat)
  }

  function handleUpdateFormData(newData: FormDataProps) {
    setFormData((state) => {
      return {
        ...state,
        ...newData,
      } as FormDataProps
    })
  }

  useEffect(() => {
    if (workspaceData && !localWorkspaceData) {
      setLocalWorkspaceData(workspaceData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceData])

  useEffect(() => {
    if (workspaceData && localWorkspaceData) {
      let isDifferent = false

      for (const key in workspaceData) {
        if ((workspaceData as any)[key] !== (localWorkspaceData as any)[key]) {
          isDifferent = true
          break
        }
      }

      if (isDifferent) {
        handleUpdateIsChanging(true)
      } else {
        handleUpdateIsChanging(false)
      }
    }
  }, [workspaceData, localWorkspaceData])

  useEffect(() => {
    if (workspaceData?.title.length > 1) {
      handleUpdateFormData({ title: { valid: true } })
    } else {
      handleUpdateFormData({ title: { valid: false } })
    }
    if (workspaceData.avatar_url) {
      handleUpdateFormData({ image: { valid: true } })
    } else {
      handleUpdateFormData({ image: { valid: false } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceData])

  useEffect(() => {
    if (formData.image.valid && formData.title.valid && isChanging) {
      handleUpdateIsUpdating(true)
    } else {
      handleUpdateIsUpdating(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, isChanging])

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:pt-[2rem]"
      >
        <div className="flex flex-col gap-2 md:gap-4 items-center">
          <Card>
            <CardText label={text("wssettings:title")} />
            <CardTextInput
              input={{
                label: text("wssettings:titlelabel"),
                onChange: (title) => {
                  handleUpdateWorkspaceData({ title: title })
                },
                type: "title",
                inputValue: workspaceData?.title || "",
              }}
            />
          </Card>
          <Card>
            <CardText label={text("wssettings:image")} />
            <CardImageInput
              imageSelector={
                <ImageSelector
                  onImageChange={(image) => {
                    handleUpdateWorkspaceData({ avatar_url: image })
                  }}
                  url={workspaceData?.avatar_url || ""}
                />
              }
            />
          </Card>
          {isUpdating && (
            <div className="w-full h-fit hidden xl:block">
              <Button
                block={{
                  data: {
                    color: "bg-black",
                    text: text("wssettings:confirm"),
                    onClick: () => handleUpdateRunUpdate(true),
                  },
                }}
                isEditable={false}
              />
            </div>
          )}
          <Card>
            <CardText label={text("wssettings:options")} />
            <CardText
              label={text("wssettings:members")}
              indicator={{ icon: ArrowRight }}
              onClick={() =>
                router.push(
                  pageUrls.workspaceSettings({
                    settings: "members",
                    workspaceSlug: workspaceData?.slug,
                  })
                )
              }
            />
            <CardLine />
            <CardText
              label={text("wssettings:terms")}
              indicator={{ icon: ArrowRight }}
              onClick={() => router.push(pageUrls.terms())}
            />
            <CardLine />
            <CardText
              label={text("wssettings:advanced")}
              indicator={{ icon: ArrowRight }}
              onClick={() =>
                router.push(
                  pageUrls.workspaceSettings({
                    settings: "advanced",
                    workspaceSlug: workspaceData?.slug,
                  })
                )
              }
            />
          </Card>
          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
