import { EyeSlash, PencilSimple } from "phosphor-react";

type Spec = {
  title: string;
  description: string;
};

type TechBlockProps = {
  description: string;
  specs: Spec[];
  isEditable: boolean;
  isVisible: boolean;
};

export const TechBlock = (props: TechBlockProps) => {
  return (
    <>
      {props.isEditable === false && (
        <>
          <div
            className={`flex flex-col gap-[0.3125rem] justify-center
            w-[23.5rem] md:w-[35rem] lg:w-[45rem] bg-white 
            p-[0.75rem] rounded-[20px] lg:rounded-[30px] ${
              props.isVisible ? "" : "hidden"
            }`}
          >
            <div className="flex flex-row gap-3 items-center  mb-[0.5rem]">
              {!props.isVisible && (
                <div className="w-[1.25rem] h-[1.25rem] lg:w-[1.75rem] lg:h-[1.75rem]">
                  <EyeSlash className="w-[1.25rem] h-[1.25rem] lg:w-[1.75rem] lg:h-[1.75rem]" />
                </div>
              )}
              <p className="lg:text-[1.1rem] inline-block w-auto">
                {props.description}
              </p>
            </div>
            <span className="w-full p-[0.5px] bg-slate-100 mb-[0.5rem]"></span>
            {props.specs.map((spec) => (
              <div className="mb-[0.5rem]" key={spec.description}>
                <p className="lg:text-[1.1rem] font-semibold">{spec.title}</p>
                <p className="lg:text-[1.1rem]">{spec.description}</p>
              </div>
            ))}
          </div>
        </>
      )}
      {props.isEditable === true && (
        <div className="flex flex-row relative justify-end w-[23.5rem] md:w-[35rem] lg:w-[45rem]">
          <div className="z-10 absolute flex content-center rounded-full bg-white">
            <PencilSimple className="w-[1rem] h-[1rem] m-[5px] lg:w-[1.25rem] lg:h-[1.25rem] drop-shadow-md" />
          </div>
          <div
            className={`flex flex-col gap-[0.3125rem] justify-center
            w-[23.5rem] md:w-[35rem] lg:w-[45rem] bg-white 
            p-[0.75rem] rounded-[20px] lg:rounded-[30px]`}
          >
            <div className="flex flex-row gap-3 items-center  mb-[0.5rem]">
              {!props.isVisible && (
                <div className="w-[1.25rem] h-[1.25rem] lg:w-[1.75rem] lg:h-[1.75rem]">
                  <EyeSlash className="w-[1.25rem] h-[1.25rem] lg:w-[1.75rem] lg:h-[1.75rem]" />
                </div>
              )}
              <p className="lg:text-[1.1rem] inline-block w-auto">
                {props.description}
              </p>
            </div>
            <span className="w-full p-[0.5px] bg-slate-100 mb-[0.5rem]"></span>
            {props.specs.map((spec) => (
              <div className="mb-[0.5rem]" key={spec.description}>
                <p className="lg:text-[1.1rem] font-semibold">{spec.title}</p>
                <p className="lg:text-[1.1rem]">{spec.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
