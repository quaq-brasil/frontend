import { Shortcut } from "components/Shortcut/Shortcut"
import { ShortcutGrid } from "components/ShortcutGrid/ShortcutGrid"
import { useEffect, useState } from "react"
import { IPage } from "types/Page.type"
import { ITemplate } from "types/Template.type"

type CreatorPageContentProps = {
  templatesData: ITemplate[] | undefined
  pageData: IPage | undefined
  handleUpdateTemplates: (newTemplates: ITemplate[]) => void
}

export function CreatorPageContent({
  templatesData,
  pageData,
  handleUpdateTemplates,
}: CreatorPageContentProps) {
  const [selectedId, setSelectedId] = useState<string | null>()

  function handleSelection(id: string) {
    if (selectedId == id) {
      setSelectedId(null)
    } else {
      setSelectedId(id)
    }
  }

  const [shortcuts, setShortcuts] = useState<JSX.Element[]>([])

  function handleChangeInShortcutPosition(
    dragIndex: number,
    hoverIndex: number
  ) {
    const newTemplates = [...templatesData]

    const draggedTemplate = newTemplates[dragIndex]

    newTemplates.splice(dragIndex, 1)
    newTemplates.splice(hoverIndex, 0, draggedTemplate)

    handleUpdateTemplates([...newTemplates])
  }

  function loadShortcuts() {
    if (templatesData) {
      const data = templatesData.map((template, index) => {
        return (
          <Shortcut
            key={template.id}
            id={template.id || ""}
            img_url={template.shortcut_image}
            index={index}
            size={template.shortcut_size}
            title={template.title}
            isCreator={true}
            isSelected={selectedId == template.id}
            onClick={() => handleSelection(template.id)}
            templateData={template}
            pageData={pageData}
            onMove={handleChangeInShortcutPosition}
          />
        )
      })
      setShortcuts(data)
    }
  }

  useEffect(() => {
    loadShortcuts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templatesData, selectedId])

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
        rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2 bg-slate-100
        lg:rounded-none lg:top-[156px]"
      >
        <ShortcutGrid onDrag={(e) => {}}>{shortcuts}</ShortcutGrid>
      </div>
    </div>
  )
}
