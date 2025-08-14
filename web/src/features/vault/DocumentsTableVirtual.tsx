import * as React from 'react'
import type { DocumentRecord } from './types'
import { useVirtualizer } from '@tanstack/react-virtual'

type Props = {
  documents: DocumentRecord[]
  onOpen: (doc: DocumentRecord) => void
  height?: number
}

export function DocumentsTableVirtual({ documents, onOpen, height = 480 }: Props) {
  const parentRef = React.useRef<HTMLDivElement | null>(null)
  const rowVirtualizer = useVirtualizer({
    count: documents.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    overscan: 12,
  })

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="bg-muted/50 px-4 py-3 text-sm font-medium">Documents</div>
      <div ref={parentRef} style={{ height }} className="relative overflow-auto">
        <div style={{ height: rowVirtualizer.getTotalSize(), width: '100%', position: 'relative' }}>
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const doc = documents[virtualRow.index]
            return (
              <div
                key={virtualRow.key}
                className="border-b border-border px-4 py-2 text-sm hover:bg-muted/40 cursor-pointer"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', transform: `translateY(${virtualRow.start}px)` }}
                onClick={() => onOpen(doc)}
              >
                <div className="grid grid-cols-[1fr_1fr_120px_120px_100px] gap-2">
                  <div>{doc.filename}</div>
                  <div className="text-muted-foreground">{doc.parsed?.merchant ?? '—'}</div>
                  <div>{doc.amount ? `${doc.currency ?? 'MYR'} ${doc.amount.toFixed(2)}` : '—'}</div>
                  <div>{doc.txnDate ?? '—'}</div>
                  <div><span className="rounded bg-secondary px-2 py-0.5 text-xs">{doc.status}</span></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}


