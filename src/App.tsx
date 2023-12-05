import { useCallback, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

let supabase: any = null
const getSupabase = () => {
  if (!supabase) {
    supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)
  }
  return supabase
}
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
  const [inputText, setInputText] = useState('')
  const [logs, setTextLogs] = useState<{ text: string; timestamp: number }[]>([])
  const addData = useCallback(() => {
    setTextLogs([...logs, { text: inputText, timestamp: Date.now() }])
    setInputText('')
  }, [logs, inputText])
  return (
    <div>
      <textarea value={inputText} onInput={(e) => setInputText(e.currentTarget.value)}></textarea>
      <button onClick={addData}>addData</button>

      <div>
        {logs.map(({ text, timestamp }, idx) => (
          <p key={idx}>
            {text} :: {new Date(timestamp).toISOString()}
          </p>
        ))}
      </div>
    </div>
  )
}
