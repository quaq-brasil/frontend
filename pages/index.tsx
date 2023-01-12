import { SwitchConfig } from "../templates/BlocksConfig/SwitchConfig/SwitchConfig";

export default function Home() {
  return (
    <div className="flex justify-center h-screen py-5 bg-slate-500">
      <SwitchConfig isOpen={true} setIsOpen={(e) => console.log()} size="sm" />
    </div>
  );
}
