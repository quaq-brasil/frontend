import { useState } from "react"
import { Shortcut } from "../../../components/Shortcut/Shortcut"
import { ShortcutGrid } from "../../../components/ShortcutGrid/ShortcutGrid"

export function CreatorPageContent() {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  function handleSelection(id: string) {
    setSelectedId((stateId) => (id === stateId ? null : id))
    console.log("selectedId", id)
  }

  function loadTemplates() {
    return [
      <Shortcut
        key={1}
        img_url="https://source.unsplash.com/featured/"
        size="small"
        title="template 1"
        id="1"
        index={1}
        isCreator
        isSelected={selectedId === "1" ? true : false}
        onClick={() => handleSelection("1")}
      />,
      <Shortcut
        key={2}
        img_url="https://source.unsplash.com/featured/"
        size="small"
        title="template 2"
        id="2"
        index={2}
        isCreator
        isSelected={selectedId === "2" ? true : false}
        onClick={() => handleSelection("2")}
      />,
      <Shortcut
        key={3}
        img_url="https://source.unsplash.com/featured/"
        size="small"
        title="template 3"
        id="3"
        index={3}
        isCreator
        isSelected={selectedId === "3" ? true : false}
        onClick={() => handleSelection("3")}
      />,
      <Shortcut
        key={4}
        img_url="https://source.unsplash.com/featured/"
        size="large"
        title="template 4"
        id="4"
        index={4}
        isCreator
        isSelected={selectedId === "4" ? true : false}
        onClick={() => handleSelection("4")}
      />,
      <Shortcut
        key={5}
        img_url="https://source.unsplash.com/featured/"
        size="small"
        title="template 5"
        id="5"
        index={5}
        isCreator
        isSelected={selectedId === "5" ? true : false}
        onClick={() => handleSelection("5")}
      />,
      <Shortcut
        key={6}
        img_url="https://source.unsplash.com/featured/"
        size="large"
        title="template 6"
        id="7"
        index={7}
        isCreator
        isSelected={selectedId === "6" ? true : false}
        onClick={() => handleSelection("6")}
      />,
    ]
  }

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
        rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2 bg-slate-100
        lg:rounded-none lg:top-[156px]"
      >
        <ShortcutGrid onDrag={(e) => console.log(e)}>
          {loadTemplates()}
        </ShortcutGrid>
      </div>
    </div>
  )
}
