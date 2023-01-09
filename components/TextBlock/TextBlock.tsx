import { ReactNode } from "react";

type TextBlockProps = {
  id: string;
  content: ReactNode;
};

export const TextBlock = ({ id, content }: TextBlockProps) => {
  return (
    <>
      <div className="prose">{content}</div>
    </>
  );
};
