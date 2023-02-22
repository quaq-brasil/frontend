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
import { useMutateGetAllWorkspacesByUserId } from "../../../services/hooks/useWorkspace/useMutateGetAllWorkspacesByUserId"
import { IPage } from "../../../types/Page.type"
import { ConnectedTemplatesProps } from "./VariablesPanelDialog"
import { VariablesPanelTemplates } from "./VariablesPanelTemplates"

type VariablesPanelPagesProps = {
  isOpen: boolean
  onClose: () => void
  handleAddConnectedTemplate: (data: ConnectedTemplatesProps) => void
  connectedTemplates: ConnectedTemplatesProps[]
}

export const VariablesPanelPages = ({
  isOpen,
  onClose,
  handleAddConnectedTemplate,
  connectedTemplates,
}: VariablesPanelPagesProps) => {
  const text = useTranslation().t

  const { user } = useUserAuth()

  const getAllWorkspaces = useMutateGetAllWorkspacesByUserId()

  type IData = {
    pages?: IPage[]
    workspaceName?: string
    workspaceId?: string
  }

  const [options, setOptions] = useState<IData[]>()

  useEffect(() => {
    if (user) {
      getAllWorkspaces.mutate(
        {
          id: user.id as string,
        },
        {
          onSuccess: (data) => {
            const newOptions = data.map((workspace) => {
              return {
                pages: workspace.Page,
                workspaceName: workspace.title,
                workspaceId: workspace.id,
              }
            })
            if (newOptions && newOptions.length > 0) {
              setOptions([...newOptions])
            }
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
          {options &&
            options.map((data) => {
              if (data) {
                return (
                  <>
                    <p className="w-full text-center lg:text-[1.1rem]">
                      {data.workspaceName}
                    </p>
                    <div className="w-full h-fit" key={data.workspaceId}>
                      <>
                        {data.pages &&
                          data.pages.map((page) => {
                            return (
                              <>
                                <CardLog
                                  key={page.id}
                                  img_url={page.avatar_url}
                                  name={page.title}
                                  date={`quaq.me/${page.slug}`}
                                  icon={ArrowRight}
                                  onClick={() =>
                                    handleUpdateOpenTemplate({
                                      pageData: {
                                        pageId: page.id as string,
                                        pageName: page.title,
                                      },
                                      workspaceData: {
                                        workspaceId: data.workspaceId as string,
                                        workspaceName:
                                          data.workspaceName as string,
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
          handleAddConnectedTemplate={handleAddConnectedTemplate}
          onClose={() => {
            setOpenTemplates(false)
            onClose()
          }}
          onBack={() => setOpenTemplates(false)}
          connectedTemplates={connectedTemplates}
        />
      )}
      <TabBar shiftLayoutOnXl={false} tags={tabbarPages} />
    </Dialog>
  )
}
