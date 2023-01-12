import { RedirectConfig } from "../templates/BlocksConfig/RedirectConfig/RedirectConfig";

export default function Home() {
  return (
    <div className="flex justify-center h-screen py-5 bg-slate-500">
      <RedirectConfig
        isOpen={true}
        setIsOpen={(e) => console.log()}
        size="sm"
      />
    </div>
  );
}
