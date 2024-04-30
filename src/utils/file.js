import Papa from 'papaparse'
import store from '@/store'

export const processCsv = (content) => {
  try {
    const lines = Papa.parse(content, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true
    })
    const jsonData = lines.data
    store.dispatch('updateInputPoints', jsonData)
  } catch (error) {
    console.error('Error parsing CSV or JSON', error)
  }
}

export const processJson = (content) => {
  try {
    const jsonData = JSON.parse(content)
    store.dispatch('updateInputPoints', jsonData)
  } catch (error) {
    console.error('Error parsing JSON!', error)
  }
}
