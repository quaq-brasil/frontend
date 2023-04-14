export const saveData = (key: string, data: any) => {
  try {
    const serializedData = JSON.stringify(data)
    localStorage.setItem(key, serializedData)
  } catch (error) {
    console.error("Error saving data to localStorage:", error)
  }
}

export const loadData = (key: string) => {
  try {
    const serializedData = localStorage.getItem(key)
    return serializedData ? JSON.parse(serializedData) : null
  } catch (error) {
    console.error("Error loading data from localStorage:", error)
    return null
  }
}
