import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import { Card } from "../../../components/Card/Card"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { CardLog } from "../../../components/Card/CardContentVariants/CardLog"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { Dialog } from "../../../components/Dialog/Dialog"
import { TabBar } from "../../../components/TabBar/TabBar"
import { Tag } from "../../../components/Tag/Tag"
import { useMutatePublicationsByTemplateId } from "../../../services/hooks/usePublication/useMutatePublicationsByTemplateId"
import { IPublication } from "../../../types/Publication.type"
import { ConnectTemplatesProps } from "./VariablesPanelSources"

type VariablesPanelPublicationsProps = {
  isOpen: boolean
  onClose: () => void
  initialData: {
    workspaceData: {
      workspaceId: string
      workspaceName: string
    }
    pageData: {
      pageId: string
      pageName: string
    }
    templateData: {
      templateId: string
      templateName: string
    }
  }
  handleUpdateConnectedTemplates: (data: ConnectTemplatesProps) => void
  onBack: () => void
  connectedTemplates: ConnectTemplatesProps[]
}

export const VariablesPanelPublications = ({
  isOpen,
  onClose,
  initialData,
  handleUpdateConnectedTemplates,
  onBack,
  connectedTemplates,
}: VariablesPanelPublicationsProps) => {
  const text = useTranslation().t

  const [publications, setPublications] = useState<IPublication[]>()

  const getPublications = useMutatePublicationsByTemplateId()

  useEffect(() => {
    if (initialData) {
      getPublications.mutate(
        {
          id: initialData.templateData.templateId,
        },
        {
          onSuccess: (data) => {
            const newPublications = data.map((publication) => {
              let filter = false
              connectedTemplates.map((connectedPublication) => {
                if (publication.id === connectedPublication.publicationId) {
                  filter = true
                }
              })
              if (!filter) {
                return publication
              }
            })
            if (newPublications) {
              setPublications(newPublications as IPublication[])
            }
          },
        }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData])

  const tabbarPages = [
    <Tag
      key={1}
      variant="txt"
      text={text("variablespanel:back")}
      onClick={onBack}
    />,
  ]

  return (
    <Dialog
      isOpen={isOpen}
      title={initialData.templateData.templateName}
      onClose={onClose}
    >
      <Card>
        <CardText label={text("variablespanel:allpublications")} />
        <>
          {publications &&
            publications.map((publication, index) => {
              if (publication) {
                return (
                  <>
                    <CardLog
                      key={index}
                      name={publication.title}
                      onClick={() => {
                        handleUpdateConnectedTemplates({
                          workspaceId: initialData.workspaceData
                            .workspaceId as string,
                          workspaceName: initialData.workspaceData
                            .workspaceName as string,
                          pageId: initialData.pageData.pageId as string,
                          pageName: initialData.pageData.pageName as string,
                          templateId: initialData.templateData
                            .templateId as string,
                          templateName: initialData.templateData
                            .templateName as string,
                          publicationId: publication.id as string,
                          publicationName: publication.title as string,
                        })
                        onClose()
                      }}
                    />
                    <CardLine full={true} />
                  </>
                )
              }
            })}
        </>
      </Card>
      <TabBar shiftLayoutOnXl={false} tags={tabbarPages} />
    </Dialog>
  )
}
