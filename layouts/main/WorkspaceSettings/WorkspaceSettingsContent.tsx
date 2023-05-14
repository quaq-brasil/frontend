import { Button } from "components/Button/Button"
import { Card } from "components/Card/Card"
import { CardFileInput } from "components/Card/CardContentVariants/CardImageInput"
import { CardLine } from "components/Card/CardContentVariants/CardLine"
import { CardText } from "components/Card/CardContentVariants/CardText"
import { CardTextInput } from "components/Card/CardContentVariants/CardTextInput"
import { FileSelector } from "components/FileSelector/FileSelector"
import { useValidation, validationRules } from "hooks/useValidation"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { ArrowRight } from "phosphor-react"
import { useEffect } from "react"
import { IUpdateWorkspace } from "types/Workspace.type"
import { pageUrls } from "utils/pagesUrl"

type WorkspaceSettingsContentProps = {
  handleUpdateWorkspaceData: (data: IUpdateWorkspace) => void
  handleUpdateRunUpdate: (stat: boolean) => void
  handleUpdateIsUpdating: (stat: boolean) => void
  workspaceData: IUpdateWorkspace | undefined
  isUpdating: boolean
  runUpdate: boolean
  handleUpdateWorkspace: (data: IUpdateWorkspace) => void
}

export function WorkspaceSettingsContent({
  handleUpdateWorkspaceData,
  handleUpdateRunUpdate,
  handleUpdateIsUpdating,
  isUpdating,
  workspaceData,
  handleUpdateWorkspace,
  runUpdate,
}: WorkspaceSettingsContentProps) {
  const text = useTranslation().t
  const router = useRouter()

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
    avatar_url: {
      initialValue: workspaceData?.avatar_url || "",
      validators: [validationRules.required(text("validation:required"))],
    },
    title: {
      initialValue: workspaceData?.title || "",
      validators: [validationRules.required(text("validation:required"))],
    },
  })

  function handleUpdateLocalWorkspaceData(
    newWorkspaceData: LocalWorkspaceProps
  ) {
    setLocalWorkspaceData({ ...localWorkspaceData, ...newWorkspaceData })
  }

  function isWorkspaceDataDifferent(
    workspaceData: IUpdateWorkspace | undefined,
    localWorkspaceData: LocalWorkspaceProps
  ) {
    if (!workspaceData) {
      return false
    }
    return (
      workspaceData.title !== localWorkspaceData.title ||
      workspaceData.avatar_url !== localWorkspaceData.avatar_url
    )
  }

  useEffect(() => {
    if (workspaceData) {
      setLocalWorkspaceData(workspaceData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceData])

  useEffect(() => {
    if (
      isLocalWorkspaceDataValid &&
      isWorkspaceDataDifferent(workspaceData, localWorkspaceData)
    ) {
      handleUpdateIsUpdating(true)
    } else {
      handleUpdateIsUpdating(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLocalWorkspaceDataValid, localWorkspaceData])

  useEffect(() => {
    if (runUpdate) {
      handleUpdateWorkspace({
        title: localWorkspaceData.title,
        avatar_url: localWorkspaceData.avatar_url,
      })
      handleUpdateWorkspaceData({
        title: localWorkspaceData.title,
        avatar_url: localWorkspaceData.avatar_url,
      })
      handleUpdateIsUpdating(false)
      handleUpdateRunUpdate(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

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
                  handleUpdateLocalWorkspaceData({ title: title })
                },
                value: localWorkspaceData.title,
                errors: localWorkspaceDataErrors.title,
              }}
            />
          </Card>
          <Card>
            <CardText label={text("wssettings:image")} />
            <CardFileInput
              fileSelector={
                <FileSelector
                  onImageChange={(image) => {
                    handleUpdateLocalWorkspaceData({ avatar_url: image })
                  }}
                  url={workspaceData?.avatar_url || ""}
                />
              }
              errors={localWorkspaceDataErrors.avatar_url}
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
              label={text("wssettings:services")}
              indicator={{ icon: ArrowRight }}
              onClick={() =>
                router.push(
                  pageUrls.workspaceSettings({
                    settings: "services",
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
