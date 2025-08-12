import { useEffect, useState } from 'react'
import { Badge } from './Badge'

type StatusState = 'idle' | 'ok' | 'error'

export function SupabaseStatus() {
  const [status, setStatus] = useState<StatusState>('idle')
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

    if (!url || !key) {
      setStatus('error')
      setMessage('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY')
      return
    }

    const controller = new AbortController()
    const ping = async () => {
      try {
        const res = await fetch(`${url}/rest/v1/`, {
          method: 'GET',
          headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
          },
          signal: controller.signal,
        })
        // Any response means we can reach the instance; 200/404 are both fine for this root path
        if (res.ok || res.status === 404) {
          setStatus('ok')
          setMessage('Connected')
        } else {
          setStatus('error')
          setMessage(`HTTP ${res.status}`)
        }
      } catch (err) {
        setStatus('error')
        setMessage(err instanceof Error ? err.message : 'Network error')
      }
    }
    void ping()
    return () => controller.abort()
  }, [])

  if (status === 'ok') {
    return (
      <Badge>
        <span className="inline-flex h-2 w-2 rounded-full bg-green-500" />
        Supabase: Connected
      </Badge>
    )
  }

  if (status === 'error') {
    return (
      <Badge variant="outline">
        <span className="inline-flex h-2 w-2 rounded-full bg-red-500" />
        Supabase: {message}
      </Badge>
    )
  }

  return (
    <Badge variant="outline">
      <span className="inline-flex h-2 w-2 rounded-full bg-amber-500" />
      Supabase: Checking...
    </Badge>
  )
}


