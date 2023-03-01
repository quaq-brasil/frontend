import useTranslation from "next-translate/useTranslation"
import { X } from "phosphor-react"
import { useEffect, useState } from "react"
import { Button } from "../../../components/Button/Button"
import { Card } from "../../../components/Card/Card"
import { CardLine } from "../../../components/Card/CardContentVariants/CardLine"
import { CardLog } from "../../../components/Card/CardContentVariants/CardLog"
import { CardText } from "../../../components/Card/CardContentVariants/CardText"
import { CardTextInput } from "../../../components/Card/CardContentVariants/CardTextInput"
import { Popover } from "../../../components/Popover/Popover"
import { useDebounce } from "../../../hooks/useDebouce"
import { useAddNewWorkspaceMember } from "../../../services/hooks/useWorkspace/useAddNewWorkspaceMember"
import { useRemoveWorkspaceMember } from "../../../services/hooks/useWorkspace/useRemoveWorkspaceMember"
import { IUpdateWorkspace } from "../../../types/Workspace.type"

type WorkspaceMembersContentProps = {
  workspaceData: IUpdateWorkspace | undefined
  handleUpdateWorkspaceData: (newData: IUpdateWorkspace) => void
}

export function WorkspaceMembersContent({
  workspaceData,
  handleUpdateWorkspaceData,
}: WorkspaceMembersContentProps) {
  const text = useTranslation().t

  const addNewMember = useAddNewWorkspaceMember()
  const removeMember = useRemoveWorkspaceMember()

  type IMember = {
    id: string
    email: string
    name: string
    profilePicture: string
  }

  const [runUpdate, setRunUpdate] = useState(false)
  const [members, setMembers] = useState<IMember[]>()
  const [newMemberEmail, setNewMemberEmail] = useState<string>()
  const [tempNewMemberEmail, setTempNewMemberEmail] = useState<string>()
  const [errorMessage, setErrorMessage] = useState<string | null>()
  const [isAddingMember, setIsAddingMember] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isPopOverOpen, setIsPopOverOpen] = useState(false)
  const [memberToBeRemoved, setMemberToBeRemoved] = useState<IMember | null>()
  const [runRemoveMember, setRunRemoveMember] = useState(false)

  useEffect(() => {
    if (workspaceData?.members) {
      const newMembers = workspaceData.members.map((member) => {
        return {
          id: member.id,
          email: member.user.email,
          name: member.user.name,
          profilePicture: member.user.avatar_url,
        } as IMember
      })
      setMembers([...newMembers])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceData])

  const debouncedNewMemberEmail = useDebounce({
    value: tempNewMemberEmail,
    delay: 500,
  })

  function checkNewMemberEmail(email: string) {
    const isEmailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)

    if (!isEmailValid) {
      setErrorMessage(text("wssettings:emailnotvalid"))
    } else {
      let isEmailUnique = true

      members.forEach((member) => {
        if (member.email === email) {
          isEmailUnique = false
        }
      })

      if (!isEmailUnique) {
        setErrorMessage(text("wssettings:emailinuse"))
        return
      } else {
        setNewMemberEmail(email)
        setIsEmailValid(true)
        setErrorMessage(null)
      }
    }
  }

  useEffect(() => {
    if (debouncedNewMemberEmail) {
      checkNewMemberEmail(debouncedNewMemberEmail)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedNewMemberEmail])

  useEffect(() => {
    if (runUpdate && newMemberEmail) {
      addNewMember.mutate(
        {
          workspaceId: workspaceData.id,
          newMemberEmail: newMemberEmail,
        },
        {
          onSuccess: (data) => {
            handleUpdateWorkspaceData(data)
            setIsAddingMember(false)
            setTempNewMemberEmail("")
            setNewMemberEmail("")
            setIsEmailValid(false)
            setRunUpdate(false)
            setErrorMessage(null)
          },
        }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdate])

  useEffect(() => {
    if (memberToBeRemoved && runRemoveMember) {
      removeMember.mutate(
        { memberId: memberToBeRemoved.id, workspaceId: workspaceData.id },
        {
          onSuccess: (data) => {
            handleUpdateWorkspaceData(data)
            setMemberToBeRemoved(null)
            setRunRemoveMember(false)
          },
        }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runRemoveMember])

  return (
    <>
      <div className="w-full h-screen bg-slate-100">
        <div
          className="fixed z-20 bottom-0 left-0 right-0 top-[76px] max-w-[1024px] mx-auto
      bg-slate-100 rounded-t-[25px] overflow-y-scroll scrollbar-hide pt-2 px-2
      md:pt-4 md:px-4 lg:z-0 lg:rounded-none lg:top-[148px] lg:pt-[1.5rem]"
        >
          <div className="flex flex-col gap-2 md:gap-4 items-center">
            <Card>
              <CardText label={text("wssettings:members")} />
              {members?.map((member) => {
                return (
                  <>
                    <CardLog
                      key={member.email}
                      name={member.name}
                      date={member.email}
                      icon={X}
                      img_url={member.profilePicture}
                      onClick={() => {
                        setMemberToBeRemoved(member)
                        setIsPopOverOpen(true)
                      }}
                    />
                    <CardLine />
                  </>
                )
              })}
            </Card>

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
                      setTempNewMemberEmail("")
                      setNewMemberEmail("")
                      setIsEmailValid(false)
                      setRunUpdate(false)
                      setErrorMessage(null)
                    },
                  }}
                />
                <CardTextInput
                  input={{
                    label: text("wssettings:memberexample"),
                    onChange: (email) => {
                      setTempNewMemberEmail(email)
                    },
                    type: "text",
                  }}
                />
                {errorMessage && (
                  <p className="w-full text-center lg:text-[1.1rem] text-red-500">
                    {errorMessage}
                  </p>
                )}
              </Card>
            )}
            {!errorMessage &&
              newMemberEmail &&
              isEmailValid &&
              isAddingMember && (
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
      <Popover
        isOpen={isPopOverOpen}
        description={text("wssettings:removememberdescription")}
        title={text("wssettings:removemember")}
        acceptButton={text("wssettings:remove")}
        declineButton={text("wssettings:cancel")}
        acceptFunc={() => {
          setIsPopOverOpen(false)
          setRunRemoveMember(true)
        }}
        declineFunc={() => {
          setIsPopOverOpen(false)
          setMemberToBeRemoved(null)
        }}
      />
    </>
  )
}
