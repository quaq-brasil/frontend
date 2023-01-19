import dynamic from "next/dynamic";
import { PencilSimple } from "phosphor-react";
import { Card } from "../Card/Card";

const ReactJson = dynamic(() => import("react-json-view"), {
  ssr: false,
});

type JsonBlockProps = {
  isEditable: boolean;
  isJsonEditable: boolean;
  name: string;
  json: object;
};

export const JsonBlock = (props: JsonBlockProps) => {
  return (
    <div className="w-full h-fit relative">
      {props.isEditable === true && (
        <div className="z-10 absolute right-0 top-0 rounded-full bg-white border border-slate-100">
          <PencilSimple className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]" />
        </div>
      )}
      <Card>
        <div className="py-2 px-3">
          {props.isJsonEditable ? (
            <ReactJson
              src={props.json}
              theme={"bright:inverted"}
              enableClipboard={true}
              onAdd={(e) => console.log(e)}
              onEdit={(e) => console.log(e)}
              onDelete={(e) => console.log(e)}
              onSelect={(e) => console.log(e)}
              name={props.name}
              style={{ fontSize: "1rem" }}
            />
          ) : (
            <ReactJson
              src={props.json}
              theme={"bright:inverted"}
              name={props.name}
              style={{ fontSize: "1rem" }}
            />
          )}
        </div>
      </Card>
    </div>
  );
};
