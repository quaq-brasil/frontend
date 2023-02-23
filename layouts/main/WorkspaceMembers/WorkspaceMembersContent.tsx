import useTranslation from "next-translate/useTranslation"
import { X } from "phosphor-react"
import { useEffect, useState } from "react"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { IUpdateWorkspace } from "../../../types/Workspace.type"

type WorkspaceMembersContentProps = {
  handleUpdateWorkspaceData: (data: IUpdateWorkspace) => void
  workspaceData: IUpdateWorkspace | undefined
}

export function WorkspaceMembersContent({
  handleUpdateWorkspaceData,
  workspaceData,
}: WorkspaceMembersContentProps) {
  const text = useTranslation().t

  type IMember = {
    email: string
    roles: string[]
  }

  const [members, setMembers] = useState<IMember[]>()
  const [isAddingMember, setIsAddingMember] = useState(false)
  const [newMemberEmail, setNewMemberEmail] = useState<string>()
  const [isNewMemberEmailCorrect, setIsNewMemberEmailCorrect] = useState(false)
  const [runUpdate, setRunUpdate] = useState(false)

  useEffect(() => {
    if (workspaceData?.members) {
      const newMembers = workspaceData.members.map((member) => {
        return {
          email: member.email,
          roles: member.roles,
        } as IMember
      })
      setMembers([...newMembers])
    }
  }, [workspaceData])

  return (
    <div className="w-full h-screen bg-slate-100">
      <div
        className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:pt-[2rem]"
      >
        <div className="flex flex-col gap-2 md:gap-4 items-center">
          {members?.map((member) => {
            return (
              <Card key={member.email}>
                <CardText key={member.email} label={member.email} />
                <CardLine />
              </Card>
            )
          })}

          {!isAddingMember && (
            <Button
              block={{
                data: {
                  color: "bg-white",
                  text: text("wssettings:addmember"),
                  onClick: () => setIsAddingMember(true),
                },
              }}
              isEditable={false}
            />
          )}
          {isAddingMember && (
            <Card>
              <CardText
                label={text("wssettings:newmember")}
                indicator={{
                  icon: X,
                  onClick: () => {
                    setIsAddingMember(false)
                    setIsNewMemberEmailCorrect(false)
                    setNewMemberEmail("")
                  },
                }}
              />
              <CardTextInput
                input={{
                  label: text("wssettings:memberexample"),
                  onChange: (email) => {
                    setNewMemberEmail(email)
                  },
                  type: "email",
                  setValid: () => setIsNewMemberEmailCorrect(true),
                  setInvalid: () => setIsNewMemberEmailCorrect(false),
                }}
              />
            </Card>
          )}
          {isNewMemberEmailCorrect && (
            <Button
              block={{
                data: {
                  color: "bg-black",
                  text: text("wssettings:add"),
                  onClick: () => setRunUpdate(true),
                },
              }}
              isEditable={false}
            />
          )}
          <span className="w-full h-[4rem]"></span>
        </div>
      </div>
    </div>
  )
}
