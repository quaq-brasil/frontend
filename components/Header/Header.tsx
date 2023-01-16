import Image from "next/image";

type HeaderProps = {
  background_url: string;
  children: React.ReactNode;
  reightContent?: React.ReactNode;
};

export const Header = ({
  background_url,
  children,
  reightContent,
}: HeaderProps) => {
  return (
    <header
      className={`flex fixed z-10 top-0 left-0 right-0 bg-image
      justify-between min-h-[6.875rem] px-4 pb-[2rem] max-w-[1024px]
      lg:rounded-[2.5rem] mx-auto lg:min-h-[2.5rem] lg:px-10 
      lg:py-10 text-white lg:mt-[1.5rem]`}
    >
      <div className="z-10 flex space-x-3">{children}</div>
      <div className="z-10 flex space-x-3">{reightContent}</div>

      <Image
        src={background_url}
        className="lg:rounded-[2.5rem]"
        fill
        style={{ objectFit: "cover" }}
        alt={""}
      />
    </header>
  );
};
