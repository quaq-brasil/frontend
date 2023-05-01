interface IDataSet {
  label: string
  data: any[]
  borderColor: string
  backgroundColor: string
}

interface IDataSet2 {
  label: string
  data: any[]
  borderColor: string[]
  backgroundColor: string[]
  borderWidth: number
}
interface IDataSet3 {
  label: string
  data: number[][]
  backgroundColor: string
}

interface IData {
  labels?: string[]
  dataset?: IDataSet[] | IDataSet2[] | IDataSet3[]
}

function getRandomColor(): string {
  const letters = "0123456789ABCDEF"
  let color = "#"
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function verifyNumbers(arr: any[]): number[] | undefined {
  const newArr: number[] = []

  for (let i = 0; i < arr.length; i++) {
    const num = Number(arr[i])
    if (isNaN(num)) {
      return undefined
    }
    newArr.push(num)
  }

  return newArr
}

function getLargestLength(arr: any[][]): number {
  let maxLength = 0

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length > maxLength) {
      maxLength = arr[i].length
    }
  }

  return maxLength
}

export function createChartData(data: any, type?: string): IData | undefined {
  if (typeof data === "object") {
    if (Array.isArray(data)) {
      if (data.length > 0) {
        let dimensions = 0
        let nextLevel = data
        while (Array.isArray(nextLevel)) {
          dimensions++
          nextLevel = nextLevel[0]
        }
        if (dimensions == 1) {
          const verifiedData = verifyNumbers(data)

          if (!verifiedData) {
            return undefined
          }

          const labels = verifiedData.map((item, index) => {
            return index.toString()
          })
          const color = getRandomColor()

          let finalData = {}

          if (type === "scatter") {
            const scatterData = Array.from(
              { length: verifiedData.length },
              (_, index) => {
                return {
                  x: index,
                  y: verifiedData[index],
                }
              }
            )

            finalData = {
              dataset: [
                {
                  label: "data 1",
                  data: scatterData,
                  backgroundColor: color,
                },
              ],
            }
          } else if (type === "pie") {
            const colors = Array.from({ length: verifiedData.length }, () => {
              return getRandomColor()
            })
            finalData = {
              labels: labels,
              dataset: [
                {
                  label: "data 1",
                  data: verifiedData,
                  borderColor: colors,
                  backgroundColor: colors,
                  borderWidth: 1,
                },
              ],
            }
          } else {
            finalData = {
              labels: labels,
              dataset: [
                {
                  label: "data 1",
                  data: verifiedData,
                  borderColor: color,
                  backgroundColor: color,
                },
              ],
            }
          }

          return finalData as IData
        } else if (dimensions == 2) {
          let problematicData = false

          const verifiedData = data.map((array) => {
            const verifiedArray = verifyNumbers(array)
            if (!verifiedArray) {
              problematicData = true
            } else {
              return verifiedArray
            }
          })

          if (!problematicData) {
            const maxLength = getLargestLength(verifiedData)

            const labels = Array.from({ length: maxLength }, (_, i) =>
              (i + 1).toString()
            )

            const colors = Array.from({ length: verifiedData.length }, () => {
              return getRandomColor()
            })

            const datasets = verifiedData.map((dataset, index) => {
              if (type == "scatter") {
                const scatterData = Array.from(
                  { length: dataset.length },
                  (_, index) => {
                    return {
                      x: index,
                      y: dataset[index],
                    }
                  }
                )
                return {
                  label: `data ${index + 1}`,
                  data: scatterData,
                  backgroundColor: colors[index],
                }
              } else if (type == "pie") {
                const colorsForPie = Array.from(
                  { length: dataset.length },
                  () => {
                    return getRandomColor()
                  }
                )
                return {
                  label: `data ${index + 1}`,
                  data: dataset,
                  borderColor: colorsForPie,
                  backgroundColor: colorsForPie,
                  borderWidth: 1,
                }
              } else {
                return {
                  label: `data ${index + 1}`,
                  data: dataset,
                  borderColor: colors[index],
                  backgroundColor: colors[index],
                }
              }
            })

            let finalData = {}

            if (type === "scatter") {
              finalData = {
                dataset: datasets,
              }
            } else {
              finalData = {
                labels: labels,
                dataset: datasets,
              }
            }

            return finalData as IData
          } else {
            return undefined
          }
        } else {
        }
      } else {
      }
    } else {
      let dataFormat = {
        labels: type === "scatter" ? true : false,
        dataset: false,
      }

      let verifiedData = {}

      Object.keys(data).forEach(function (key, index) {
        if (key === "labels") {
          const tempLabels = data[key]

          const isStringArray =
            Array.isArray(tempLabels) &&
            tempLabels.every((item) => typeof item === "string")

          if (!isStringArray) {
            return undefined
          }

          verifiedData = {
            ...verifiedData,
            labels: tempLabels,
          }

          dataFormat.labels = true
        } else if (key === "dataset") {
          const tempDatasets = data[key]

          if (tempDatasets.length < 1) {
            return undefined
          }

          const verifiedTempDatasets = createChartData(tempDatasets, type)

          const verifiedDatasets = verifiedTempDatasets.dataset.map(
            (dataset) => {
              if (type === "scatter") {
                return {
                  label: dataset.label,
                  data: dataset.data,
                  backgroundColor: dataset.backgroundColor,
                }
              } else if (type === "pie") {
                return {
                  label: dataset.label,
                  data: dataset.data,
                  borderColor: dataset.backgroundColor,
                  backgroundColor: dataset.backgroundColor,
                  borderWidth: 1,
                }
              } else {
                return {
                  label: dataset.label,
                  data: dataset.data,
                  borderColor: dataset.backgroundColor,
                  backgroundColor: dataset.backgroundColor,
                }
              }
            }
          )

          verifiedData = {
            ...verifiedData,
            dataset: verifiedDatasets,
          }

          dataFormat.dataset = true
        }
      })

      if (dataFormat.dataset && dataFormat.labels) {
        return verifiedData
      }
    }
  } else if (typeof data === "string") {
  } else {
  }
}
