import {
  Variable,
  VariablesPanel,
} from "../layouts/BlocksConfig/VariablesPanel/VariablesPanel"

const variables: Variable[] = [
  {
    key: "name",
    name: "Name",
    type: "string",
    value: "John Doe",
  },
  {
    key: "age",
    name: "Age",
    type: "number",
    value: 30,
    data: [
      {
        key: "age",
        name: "Age",
        type: "number",
        value: 30,
      },
      {
        key: "age2",
        name: "Age2",
        type: "number",
        value: 30,
      },
    ],
  },
  {
    key: "isMarried",
    name: "Is Married",
    type: "boolean",
    value: true,
  },
]

export default function Home() {
  return (
    <div className="bg-black h-screen">
      <VariablesPanel
        variables={variables}
        isOpen={true}
        setIsOpen={function (): void {
          throw new Error("Function not implemented.")
        }}
        isMultiPages={true}
        isAbleToAddDefaultVariable={true}
      />
    </div>
  )
}
