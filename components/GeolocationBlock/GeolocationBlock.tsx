import { useEffect, useState } from "react"
import { IBlock } from "types/Block.types"
import { IInteractionData } from "types/Interaction.type"

type IData = {
  description: string
}

type IGeolocationBlock = {
  data: IData
} & IBlock

type GeolocationBlockProps = {
  block: IGeolocationBlock
  handleUpdateInteractions?: (interaction: IInteractionData) => void
}

export const GeolocationBlock = ({
  block,
  handleUpdateInteractions,
}: GeolocationBlockProps) => {
  type IEvent = {
    displayedAt?: string
    lastInteractionAt?: string
    firstInteractionAt?: string
  }

  const [events, setEvents] = useState<IEvent>()

  function handleUpdateEvents(newEvent: IEvent) {
    setEvents((state) => {
      return {
        ...state,
        ...newEvent,
      } as IEvent
    })
  }

  const onInteraction = (geolocation: any) => {
    handleUpdateInteractions &&
      handleUpdateInteractions({
        id: block.id,
        config: {
          id: block.id,
          save_as: block.save_as,
          type: block.type,
          data: {
            description: block.data.description,
          },
        },
        output: {
          events: events,
          data: {
            geolocation: geolocation,
          },
        },
      })
  }

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          onInteraction({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
          handleUpdateEvents({
            firstInteractionAt: new Date().toString(),
            lastInteractionAt: new Date().toString(),
          })
        },
        function (error) {
          console.error("Erro ao obter localização: " + error.message)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      )
    } else {
      console.log("Geolocalização não é suportada neste navegador.")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <></>
}
