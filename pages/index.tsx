import { ReviewConfig } from "../layouts/BlocksConfig/ReviewConfig/ReviewConfig";

export default function Home() {
  return (
    <div className="flex justify-center h-screen py-5 bg-slate-500">
      <ReviewConfig
        isOpen={true}
        setIsOpen={(e) => console.log()}
        size="full"
      />
    </div>
  );
}
