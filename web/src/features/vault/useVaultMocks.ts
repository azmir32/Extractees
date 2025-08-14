import * as React from 'react'
import type { DocumentRecord } from './types'

let idCounter = 1000

export function useMockDocuments(initial: DocumentRecord[]) {
  const [docs, setDocs] = React.useState<DocumentRecord[]>(initial)

  const addOptimisticFiles = React.useCallback((files: File[]) => {
    const now = new Date().toISOString()
    const optimistic = files.map((f) => ({
      id: `tmp_${idCounter++}`,
      filename: f.name,
      mimeType: f.type || 'application/octet-stream',
      size: f.size,
      uploadedAt: now,
      status: 'pending' as const,
      tags: [],
    }))
    setDocs((d) => [...optimistic, ...d])
    // Simulate server processing
    optimistic.forEach((o, idx) => {
      setTimeout(() => {
        setDocs((current) => current.map((c) => c.id === o.id ? { ...c, status: 'parsed', parsed: { merchant: 'Unknown', amount: Math.round(Math.random()*200)+10, currency: 'MYR', date: now.slice(0,10) }, amount: Math.round(Math.random()*200)+10, currency: 'MYR', txnDate: now.slice(0,10) } : c))
      }, 800 + idx*200)
      setTimeout(() => {
        setDocs((current) => current.map((c) => c.id === o.id ? { ...c, id: `${Date.now()}_${idx}`, status: 'saved' } : c))
      }, 1800 + idx*250)
    })
  }, [])

  return { docs, setDocs, addOptimisticFiles }
}


