import { TextBlock } from "../TextBlock/TextBlock"

export type BlockProps = {
  id: string
  type: string
  data: any
}

export const BlockReader = ({ id, type, data }: BlockProps) => {
  switch (type) {
    case "text":
      return <TextBlock id={id} content={data} />
    default:
      return (
        <>
          <h1>um bloco</h1>
        </>
      )
  }
}
