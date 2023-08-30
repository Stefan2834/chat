import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

export default function App() {
  console.log(data)
  return (
    <Picker data={data} onEmojiSelect={console.log} />
  )
}