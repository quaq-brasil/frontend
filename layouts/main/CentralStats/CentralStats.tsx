import useTranslation from "next-translate/useTranslation";
import { Header } from "../../../components/Header/Header";
import { TabBar } from "../../../components/TabBar/TabBar";
import { Tag } from "../../../components/Tag/Tag";
import { CentralStatsContent } from "./CentralStatsContent";

export default function CentralStats() {
  const text = useTranslation().t;

  function handleTabBar() {
    return [
      <Tag
        key={1}
        variant="txt"
        text={text("centralstats:back")}
        onClick={() => console.log()}
      />,
      <Tag
        key={2}
        variant="txt"
        text={text("centralstats:options")}
        onClick={() => console.log()}
      />,
      <Tag
        key={3}
        variant="txt"
        text={text("centralstats:logs")}
        onClick={() => console.log()}
      />,
      <Tag
        key={4}
        variant="txt"
        text={text("centralstats:stats")}
        onClick={() => console.log()}
        isSelected
      />,
    ];
  }

  function loadHeader() {
    return (
      <Header
        background_url={
          "https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80"
        }
      >
        <Tag
          variant="img-txt"
          text="page title"
          img_url="https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80"
        />
        <Tag
          variant="img-txt"
          text="template title"
          img_url="https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80"
        />
      </Header>
    );
  }

  return (
    <div className="bg-slate-100 fixed inset-0">
      {loadHeader()}
      <CentralStatsContent />
      <TabBar isHidden={false} tags={handleTabBar()} />
    </div>
  );
}
