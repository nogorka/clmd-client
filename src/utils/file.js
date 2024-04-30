import Papa from 'papaparse'

export const processCsv = (content) => {
  try {
    const lines = Papa.parse(content, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true
    })
    const jsonData = lines.data
    console.log(jsonData)
  } catch (error) {
    console.error('Error parsing CSV or JSON', error)
  }
}

export const processJson = (content) => {
  try {
    const jsonData = JSON.parse(content)
    console.log(jsonData)
  } catch (error) {
    console.error('Error parsing JSON!', error)
  }
}