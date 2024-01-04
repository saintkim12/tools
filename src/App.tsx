// import { useCallback, useState } from 'react'
import styled from 'styled-components'
import Uploader from './Uploader'

const Wrapper = styled.div`
  width: calc(100vw - 30px * 2);
  height: 100vh;
  background-color: #eee;
  padding: 30px;
  * {
    box-sizing: border-box;
  }
`

export default function App() {
  // useEffect(() => {
  //   const removeCounter = setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
  //   return removeCounter
  // }, [])
  // const createAuthUser = async () => {
  //   const supabase = getSupabase();
  //   const { data, error } = await supabase.auth.signUp({
  //     email: 'example@email.com',
  //     password: 'example-password',
  //   })
  //   console.log('data', data)
  //   console.log('error', error)
  // }
  // const [inputText, setInputText] = useState('')
  // const [logs, setTextLogs] = useState<{ text: string; timestamp: number }[]>([])
  // const addData = useCallback(() => {
  //   setTextLogs([...logs, { text: inputText, timestamp: Date.now() }])
  //   setInputText('')
  // }, [logs, inputText])
  return (
    <Wrapper>
      <Uploader />
      {/* <textarea value={inputText} onInput={(e) => setInputText(e.currentTarget.value)}></textarea>
      <button onClick={addData}>addData</button>

      <div>
        {logs.map(({ text, timestamp }, idx) => (
          <p key={idx}>
            {text} :: {new Date(timestamp).toISOString()}
          </p>
        ))}
      </div> */}
    </Wrapper>
  )
}
