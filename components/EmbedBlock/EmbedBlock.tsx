import { PencilSimple } from "phosphor-react"

type EmbedBlockProps = {
  url: string;
  isEditable: boolean
}

export const EmbedBlock = (props: EmbedBlockProps) => {

  function test(url: string) {
    // Sanitize the URL
    let sanitizedUrl = url;
    try {
      const parsedUrl = new URL(url);
      sanitizedUrl = parsedUrl.href;
    } catch {
      return <div>Invalid link</div>;
    }

    // Verify if link is safe to embed
    const origin = window.location.origin;
    const linkOrigin = new URL(sanitizedUrl).origin;
    if (origin !== linkOrigin) {
      return <div>Invalid link</div>;
    }

    // Properly format link for embedding
    const formattedUrl = `${sanitizedUrl}?embed=true`;

    return <iframe src={formattedUrl} />;
  }

  return (
    <>
        {(props.isEditable === false) &&
        <>
          <div className="flex w-[23.375rem] justify-between items-center bg-white 
          p-[0.75rem] rounded-[20px] lg:w-[35.25rem]">
            {test(props.url)}
          </div>
        </>
        }
        {(props.isEditable === true) &&
        <div className="flex relative w-[23.375rem] justify-end content-center lg:w-[35.25rem]">
          <div className="z-10 absolute flex justify-start content-center rounded-full bg-white border border-slate-100">
              <PencilSimple className="w-[1rem] h-[1rem] m-[0.3125rem] lg:w-[1.25rem] lg:h-[1.25rem]"/>
          </div>
          <div className="flex w-[23.375rem] justify-between items-center bg-white 
          p-[0.75rem] rounded-[20px] lg:w-[35.25rem]">
          </div>
        </div>
        }
    </>
  )
}
