import { useCallback, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Button } from './Button'
import { Badge } from './Badge'

export function SupabaseQueryDemo() {
  const [tableName, setTableName] = useState<string>('')
  const [rows, setRows] = useState<unknown[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const runQuery = useCallback(async () => {
    setError(null)
    setRows(null)
    if (!tableName.trim()) {
      setError('Enter a table name to query')
      return
    }
    setLoading(true)
    try {
      const { data, error: qErr } = await supabase.from(tableName.trim()).select('*').limit(5)
      if (qErr) {
        setError(qErr.message)
      } else {
        setRows(data ?? [])
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [tableName])

  return (
    <div className="rounded-[var(--radius)] border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-medium">Supabase Query Demo</h3>
        <Badge variant="outline">Try: profiles, todos, messages…</Badge>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <input
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          placeholder="Enter table name (e.g. profiles)"
          className="w-full rounded-[var(--radius)] border border-border bg-background px-3 py-2 text-sm"
        />
        <Button onClick={runQuery} disabled={loading}>
          {loading ? 'Querying…' : 'Fetch 5 rows'}
        </Button>
      </div>
      {error && (
        <div className="mt-3 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:bg-
red-950/30 dark:border-red-900">
          {error}
        </div>
      )}
      {rows && (
        <pre className="mt-3 max-h-64 overflow-auto rounded-md border border-border bg-background p-3 text-xs">
{JSON.stringify(rows, null, 2)}
        </pre>
      )}
    </div>
  )
}


