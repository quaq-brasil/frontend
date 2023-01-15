type CardTxtProps = {
  text: string;
};

export function CardTxt({ text }: CardTxtProps) {
  return (
    <div className="py-3 px-3 lg:px-[1.125rem]  lg:py-[1.5rem]">
      <p className="lg:text-[1.25rem]">{text}</p>
    </div>
  );
}
