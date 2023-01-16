type CardImageInputProps = {
  imageSelector: React.ReactNode;
};

export function CardImageInput(props: CardImageInputProps) {
  return (
    <div className="flex flex-row justify-between items-center bg-slate-50 my-2 px-3 lg:px-[1.125rem] py-3">
      {props.imageSelector}
    </div>
  );
}
