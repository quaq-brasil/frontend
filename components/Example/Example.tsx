import useTranslation from "next-translate/useTranslation";

export const Example = () => {
  const text = useTranslation().t;

  return (
    <>
      <h1 className="text-red-900">{text("example:hello")}</h1>
    </>
  );
};
