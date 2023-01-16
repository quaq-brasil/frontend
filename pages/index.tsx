import { ImageSelector } from "../components/parts/ImageSelector/ImageSelector";

export default function Home() {
  return (
    <div className="bg-slate-100 min-h-screen">
      <ImageSelector
        // url="https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg"
        onImageChange={() => console.log("ok")}
      />
    </div>
  );
}
