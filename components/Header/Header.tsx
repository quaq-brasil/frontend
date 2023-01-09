import Image from "next/image";

type HeaderProps = {
  background_url: string;
  children: React.ReactNode;
  leftContent?: React.ReactNode;
};

export const Header = ({
  background_url,
  children,
  leftContent,
}: HeaderProps) => {
  return (
    <header
      className={`flex relative bg-black bg-image justify-between min-h-[6.875rem] p-4 max-w-4xl
      lg:rounded-[2.5rem] mx-auto lg:my-8 lg:min-h-[2.5rem] lg:px-10 lg:py-12 text-white`}
    >
      <div className="z-10 flex space-x-3">{children}</div>
      <div className="z-10 flex space-x-3">{leftContent}</div>

      <Image src={background_url} layout="fill" objectFit="cover" alt={""} />
    </header>
  );
};
