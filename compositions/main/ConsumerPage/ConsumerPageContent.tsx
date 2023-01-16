import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Shortcut } from "../../../components/Shortcut/Shortcut";
import { ShortcutGrid } from "../../../components/ShortcutGrid/ShortcutGrid";

const QuickIn = dynamic(() => import("../../../components/QuickIn/QuickIn"), {
  ssr: false,
});

export function ConsumerPageContent() {
  const text = useTranslation().t;

  const [finished, setFinished] = useState(false);

  function handleFinishSignUp() {
    setFinished(true);
  }

  const templates = [
    <Shortcut
      key={1}
      img_url="https://source.unsplash.com/featured/"
      size="small"
      title="template 1"
    />,
    <Shortcut
      key={2}
      img_url="https://source.unsplash.com/featured/"
      size="small"
      title="template 2"
    />,
    <Shortcut
      key={3}
      img_url="https://source.unsplash.com/featured/"
      size="small"
      title="template 3"
    />,
    <Shortcut
      key={4}
      img_url="https://source.unsplash.com/featured/"
      size="large"
      title="template 4"
    />,
    <Shortcut
      key={5}
      img_url="https://source.unsplash.com/featured/"
      size="small"
      title="template 5"
    />,
    <Shortcut
      key={6}
      img_url="https://source.unsplash.com/featured/"
      size="large"
      title="template 6"
    />,
  ];

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:pt-[1.5rem]"
      >
        <ShortcutGrid onDrag={(e) => console.log(e)}>{templates}</ShortcutGrid>
      </div>
    </div>
  );
}
