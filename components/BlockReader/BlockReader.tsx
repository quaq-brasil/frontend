import { TextBlock } from "../TextBlock/TextBlock"

export type BlockProps = {
  id?: string
  type: string
  data: any
  savaAs?: string
}

export const BlockReader = ({ id, type, data, savaAs }: BlockProps) => {
  switch (type) {
    case "text":
      return <TextBlock id={id as string} content={data} />
    default:
      return (
        <>
          <h1>um bloco</h1>
        </>
      )
  }
}
