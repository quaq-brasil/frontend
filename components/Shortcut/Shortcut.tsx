import Image from "next/image";

type ShortcutProps = {
  title: string;
  img_url: string;
  size: "small" | "large";
};

export const Shortcut = (props: ShortcutProps) => {
  return (
    <>
      <li
        className={`flex relative min-w-[100%] rounded-[20px] h-[13.0625rem] justify-center content-center lg:h-[19rem] lg:rounded-[30px] ${
          props.size === "large"
            ? "col-span-2  max-w-[35.25rem]"
            : "col-span-1  max-w-[16.5625rem]"
        }`}
      >
        <div
          className="z-10 absolute flex row justify-center bg-white ml-auto mr-auto left-[0.375rem]
      right-[0.375rem] rounded-[15px] bottom-[6px] px-[6px] lg:pt-[0.8rem] lg:pb-[0.82rem] lg:rounded-[25px]"
        >
          <p className="inline-block py-[0.625rem] text-center lg:text-[1.25rem]">
            {props.title}
          </p>
        </div>
        <Image
          className="rounded-[20px] lg:rounded-[30px]"
          src={props.img_url}
          fill
          style={{ objectFit: "cover" }}
          alt={""}
        />
      </li>
    </>
  );
};
