import { TextEntryConfig } from "../components/compositions/BlocksConfig/TextEntryConfig/TextEntryConfig";

export default function Home() {
  return (
    <div className="bg-slate-500 flex flex-col gap-5 justify-center py-5 h-screen">
      <TextEntryConfig isOpen setIsOpen={(e) => console.log(e)} />
    </div>
  );
}
