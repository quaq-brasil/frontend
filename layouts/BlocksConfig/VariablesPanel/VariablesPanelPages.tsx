import useTranslation from "next-translate/useTranslation"
import { ArrowRight } from "phosphor-react"
import { useEffect, useState } from "react"
import { Card } from "../../../components/Card/Card"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { CardLog } from "../../../components/Card/CardContentVariants/CardLog"
import { Dialog } from "../../../components/Dialog/Dialog"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { useUserAuth } from "../../../contexts/userAuth"
import { useMutatePagesByWorkspaceId } from "../../../services/hooks/usePage/useMutatePagesByWorkspaceId"
import { useMutateGetAllWorkspacesByUserId } from "../../../services/hooks/useWorkspace/useMutateGetAllWorkspacesByUserId"
import { IPage } from "../../../types/Page.type"
import { ConnectTemplatesProps } from "./VariablesPanelSources"
import { VariablesPanelTemplates } from "./VariablesPanelTemplates"

type VariablesPanelPagesProps = {
  isOpen: boolean
  onClose: () => void
  handleUpdateConnectedTemplates: (data: ConnectTemplatesProps) => void
}

export const VariablesPanelPages = ({
  isOpen,
  onClose,
  handleUpdateConnectedTemplates,
}: VariablesPanelPagesProps) => {
  const text = useTranslation().t

  const { user } = useUserAuth()

  const getAllWorkspaces = useMutateGetAllWorkspacesByUserId()

  const getPagesByWorkspaces = useMutatePagesByWorkspaceId()

  type IData = {
    pages: IPage[]
    workspaceName: string
    workspaceId: string
  }

  const [content, setContent] = useState<IData[]>()

  useEffect(() => {
    if (user) {
      getAllWorkspaces.mutate(
        {
          id: user.id as string,
        },
        {
          onSuccess: (data) => {
            data.map((workspaceData) => {
              getPagesByWorkspaces.mutate(
                {
                  id: workspaceData.id as string,
                },
                {
                  onSuccess: (data) => {
                    if (content) {
                      setContent([
                        ...content,
                        {
                          pages: data as IPage[],
                          workspaceId: workspaceData.id as string,
                          workspaceName: workspaceData.name as string,
                        },
                      ])
                    } else {
                      setContent([
                        {
                          pages: data as IPage[],
                          workspaceId: workspaceData.id as string,
                          workspaceName: workspaceData.name as string,
                        },
                      ])
                    }
                  },
                }
              )
            })
          },
        }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const tabbarPages = [
    <Tag
      key={1}
      variant="txt"
      text={text("variablespanel:back")}
      onClick={onClose}
    />,
  ]

  type ISelectedSource = {
    workspaceData: {
      workspaceId: string
      workspaceName: string
    }
    pageData: {
      pageId: string
      pageName: string
    }
  }

  const [selectedSource, setSelectedSource] = useState<ISelectedSource>()
  const [openTemplates, setOpenTemplates] = useState(false)

  function handleUpdateOpenTemplate({
    pageData,
    workspaceData,
  }: ISelectedSource) {
    setSelectedSource({ pageData, workspaceData })
    setOpenTemplates(true)
  }

  return (
    <Dialog
      isOpen={isOpen}
      title={text("variablespanel:newsource")}
      onClose={onClose}
    >
      <Card>
        <>
          {content &&
            content.map((data, index) => {
              if (data) {
                return (
                  <>
                    <p className="w-full text-center lg:text-[1.1rem]">
                      {data.workspaceName}
                    </p>
                    <div className="w-full h-fit" key={index}>
                      <>
                        {data.pages &&
                          data.pages.map((page, index) => {
                            return (
                              <>
                                <CardLog
                                  key={index}
                                  img_url={page.avatar_url}
                                  name={page.name}
                                  date={`quaq.me/${page.url}`}
                                  icon={ArrowRight}
                                  onClick={() =>
                                    handleUpdateOpenTemplate({
                                      pageData: {
                                        pageId: page.id as string,
                                        pageName: page.name as string,
                                      },
                                      workspaceData: {
                                        workspaceId: data.workspaceId,
                                        workspaceName: data.workspaceName,
                                      },
                                    })
                                  }
                                />
                                <CardLine />
                              </>
                            )
                          })}
                      </>
                    </div>
                  </>
                )
              }
            })}
        </>
      </Card>
      {openTemplates && (
        <VariablesPanelTemplates
          isOpen={openTemplates}
          initialData={selectedSource as ISelectedSource}
          handleUpdateConnectedTemplates={handleUpdateConnectedTemplates}
          onClose={() => setOpenTemplates(false)}
        />
      )}
      <TabBar shiftLayoutOnXl={false} tags={tabbarPages} />
    </Dialog>
  )
}
