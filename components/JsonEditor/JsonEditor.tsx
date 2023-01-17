import dynamic from "next/dynamic";

const ReactJson = dynamic(() => import("react-json-view"), {
  ssr: false,
});

type JsonEditorProps = {
  json: Object;
  name: string;
};

export function JsonEditor(props: JsonEditorProps) {
  return (
    <div className="py-2">
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
    </div>
  );
}
