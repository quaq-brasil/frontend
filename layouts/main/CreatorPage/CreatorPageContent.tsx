import { useEffect, useState } from "react"
import { Shortcut } from "../../../components/Shortcut/Shortcut"
import { ShortcutGrid } from "../../../components/ShortcutGrid/ShortcutGrid"
import { ITemplate } from "../../../types/Template.type"

type CreatorPageContentProps = {
  templatesData: ITemplate[] | undefined
}

export function CreatorPageContent({ templatesData }: CreatorPageContentProps) {
  const [selectedId, setSelectedId] = useState<number>()

  function handleSelection(id: number) {
    setSelectedId(id)
    console.log(id)
  }

  const [shortcuts, setShortcuts] = useState<JSX.Element[]>([])

  function loadShortcuts() {
    if (templatesData) {
      const data = templatesData.map((template, index) => {
        return (
          <Shortcut
            key={index}
            id={template.id || ""}
            img_url={template.shortcut_image}
            index={index}
            size={template.shortcut_size}
            title={template.name}
            isCreator={true}
            isSelected={selectedId == index}
            onClick={() => handleSelection(index)}
          />
        )
      })
      setShortcuts(data)
    }
  }

  useEffect(() => {
    loadShortcuts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templatesData])

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
        rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2 bg-slate-100
        lg:rounded-none lg:top-[156px]"
      >
        <ShortcutGrid onDrag={(e) => console.log(e)}>{shortcuts}</ShortcutGrid>
      </div>
    </div>
  )
}
