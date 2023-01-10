import { Example } from "../components/Example/Example";
import { Shortcut } from "../components/Shortcut/Shortcut";

export default function Home() {
  return (
    <div className="bg-slate-100 py-1 flex justify-center">
      <Shortcut title="example" size="small" img_url="https://images.unsplash.com/photo-1672970855890-e9bf29dd6ddb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"/>
    </div>
  );
}
