
import dynamic from "next/dynamic";
import { Example } from "../components/Example/Example";
const Embed = dynamic(() => import('react-embed'), {
  ssr: false
});

export default function Home() {
  return (
    <div className="flex justify-center py-5 bg-slate-100 h-[100rem]">
      <div className="h-[7rem] w-[50rem]">
        <Embed url='https://www.youtube.com/watch?v=soICQ3B2kEk'/>
      </div>
    </div>
  );
}