import { Card } from "../components/Card/Card"
import { CardTextInput } from "../components/Card/CardContentVariants/CardTextInput"

export default function TestPage() {
  return (
    <div className="w-full flex flex-col gap-3 bg-slate-500 py-3">
      <Card>
        <CardTextInput input={{ onChange: console.log, type: "email" }} />
      </Card>
    </div>
  )
}
