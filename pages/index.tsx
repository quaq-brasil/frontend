import { ImageConfig } from "../templates/BlocksConfig/ImageConfig/ImageConfig";

export default function Home() {
  return (
    <div className="flex justify-center h-screen py-5 bg-slate-500">
      <ImageConfig isOpen={true} setIsOpen={(e) => console.log()} size="sm" />
    </div>
  );
}
