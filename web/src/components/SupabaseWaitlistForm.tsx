import { useCallback, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Button } from './Button'

function isValidEmail(email: string): boolean {
  return /.+@.+\..+/.test(email)
}

export function SupabaseWaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState<string>('')

  const onSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(async (e) => {
    e.preventDefault()
    setMessage('')
    if (!isValidEmail(email)) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }
    setStatus('loading')
    try {
      const { error } = await supabase
        .from('leads')
        .insert({ email, source: 'landing' })

      if (error) {
        setStatus('error')
        setMessage(error.message)
        return
      }

      setStatus('success')
      setMessage('You\'re on the list!')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Unexpected error')
    }
  }, [email])

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md items-center gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 rounded-[var(--radius)] border border-border bg-background px-3 py-2 text-sm"
        required
      />
      <Button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Joining…' : 'Join waitlist'}
      </Button>
      {status === 'success' && (
        <span className="text-xs text-green-600 dark:text-green-400">{message}</span>
      )}
      {status === 'error' && (
        <span className="text-xs text-red-600 dark:text-red-400">{message}</span>
      )}
    </form>
  )
}


