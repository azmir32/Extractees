//
import type { DocumentRecord } from './types'
import { cn } from '@/lib/utils'

type Props = {
  documents: DocumentRecord[]
  onOpen: (doc: DocumentRecord) => void
  loading?: boolean
}

export function DocumentsTable({ documents, onOpen, loading }: Props) {
  if (loading) {
    return (
      <div className="rounded-xl border border-border p-4">
        <div className="h-6 w-1/3 bg-muted animate-pulse rounded" />
        <div className="mt-4 space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 bg-muted/60 rounded animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (!documents.length) {
    return (
      <div className="rounded-xl border border-border p-8 text-center text-sm text-muted-foreground">
        No documents yet.
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr className="text-left">
            <th className="px-4 py-3 font-medium">File</th>
            <th className="px-4 py-3 font-medium">Vendor</th>
            <th className="px-4 py-3 font-medium">Amount</th>
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((d) => (
            <tr
              key={d.id}
              className={cn('border-t border-border hover:bg-muted/40 cursor-pointer')}
              onMouseEnter={() => {/* prefetch hook placeholder */}}
              onFocus={() => {/* prefetch hook placeholder */}}
              onClick={() => onOpen(d)}
            >
              <td className="px-4 py-3">{d.filename}</td>
              <td className="px-4 py-3">{d.parsed?.merchant ?? '—'}</td>
              <td className="px-4 py-3">{d.amount ? `${d.currency ?? 'MYR'} ${d.amount.toFixed(2)}` : '—'}</td>
              <td className="px-4 py-3">{d.txnDate ?? '—'}</td>
              <td className="px-4 py-3"><span className="rounded bg-secondary px-2 py-0.5 text-xs">{d.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


