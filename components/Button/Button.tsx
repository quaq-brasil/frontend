type ButtonProps = {
  text: string;
  onClick: () => void;
  color: string;
};

export function Button(props: ButtonProps) {
  return (
    <button
      className={`flex relative justify-between items-center 
        p-[0.75rem] md:p-[1rem] lg:p-[1.5rem] min-w-[100%]
        rounded-[20px] lg:rounded-[30px] bg-${props.color}`}
    >
      <span className="lg:text-[1.1rem] text-white font-semibold text-center w-full">
        {props.text}
      </span>
    </button>
  );
}
