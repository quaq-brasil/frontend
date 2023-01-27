import { Shortcut } from "../../../components/Shortcut/Shortcut"
import { ShortcutGrid } from "../../../components/ShortcutGrid/ShortcutGrid"

export function ConsumerPageContent() {
  function loadTemplates() {
    return [
      <Shortcut
        key={1}
        img_url="https://source.unsplash.com/featured/"
        size="small"
        title="template 1"
        index={0}
        id={""}
      />,
      <Shortcut
        key={2}
        img_url="https://source.unsplash.com/featured/"
        size="small"
        title="template 2"
        index={0}
        id={""}
      />,
      <Shortcut
        key={3}
        img_url="https://source.unsplash.com/featured/"
        size="small"
        title="template 3"
        index={0}
        id={""}
      />,
      <Shortcut
        key={4}
        img_url="https://source.unsplash.com/featured/"
        size="large"
        title="template 4"
        index={0}
        id={""}
      />,
      <Shortcut
        key={5}
        img_url="https://source.unsplash.com/featured/"
        size="small"
        title="template 5"
        index={0}
        id={""}
      />,
      <Shortcut
        key={6}
        img_url="https://source.unsplash.com/featured/"
        size="large"
        title="template 6"
        index={0}
        id={""}
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
