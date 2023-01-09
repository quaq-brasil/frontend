import { TextBlock } from "../TextBlock/TextBlock";

type BlockReaderProps = {
  id: string;
  type: string;
  data: any;
};

export const BlockReader = ({ id, type, data }: BlockReaderProps) => {
  switch (type) {
    case "text":
      return <TextBlock id={id} content={data} />;
    default:
      return <></>;
  }
};
