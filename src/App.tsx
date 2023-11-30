import { useEffect } from 'react'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'

import { createClient } from '@supabase/supabase-js'

let supabase: any = null
const getSupabase = () => {
  if (!supabase) {
    supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)
  }
  return supabase
}
export default function App() {
  useEffect(() => {
    const removeCounter = setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
    return removeCounter
  }, [])
  const createAuthUser = async () => {
    const supabase = getSupabase();
    const { data, error } = await supabase.auth.signUp({
      email: 'example@email.com',
      password: 'example-password',
    })
    console.log('data', data)
    console.log('error', error)
  }
  return (
    <div>
      <button onClick={createAuthUser}>Create user</button>
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://www.typescriptlang.org/" target="_blank">
        <img src={typescriptLogo} className="logo vanilla" alt="TypeScript logo" />
      </a>
      <h1>Vite + TypeScript</h1>
      <div className="card">
        <button id="counter" type="button"></button>
      </div>
      <p className="read-the-docs">Click on the Vite and TypeScript logos to learn more</p>
    </div>
  )
}
