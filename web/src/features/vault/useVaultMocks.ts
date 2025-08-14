import * as React from 'react'
import type { DocumentRecord } from './types'

let idCounter = 1000

export function useMockDocuments(initial: DocumentRecord[]) {
  const [docs, setDocs] = React.useState<DocumentRecord[]>(initial)
  const [progress, setProgress] = React.useState<Record<string, number>>({})

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
      setProgress((p) => ({ ...p, [o.id]: 0 }))
      const interval = setInterval(() => {
        setProgress((p) => ({ ...p, [o.id]: Math.min(100, (p[o.id] ?? 0) + 12) }))
      }, 180)
      const toParsed = setTimeout(() => {
        setDocs((current) => current.map((c) => c.id === o.id ? { ...c, status: 'parsed', parsed: { merchant: 'Unknown', amount: Math.round(Math.random()*200)+10, currency: 'MYR', date: now.slice(0,10) }, amount: Math.round(Math.random()*200)+10, currency: 'MYR', txnDate: now.slice(0,10) } : c))
      }, 1200 + idx*200)
      const toSaved = setTimeout(() => {
        clearInterval(interval)
        setProgress((p) => ({ ...p, [o.id]: 100 }))
        setDocs((current) => current.map((c) => c.id === o.id ? { ...c, id: `${Date.now()}_${idx}`, status: 'saved' } : c))
      }, 2200 + idx*250)
      ;(o as unknown as { __timers?: { interval: number; toParsed: number; toSaved: number } }).__timers = { interval: interval as unknown as number, toParsed: toParsed as unknown as number, toSaved: toSaved as unknown as number }
    })
  }, [])

  const cancelUpload = React.useCallback((tempId: string) => {
    setDocs((d) => d.filter((doc) => doc.id !== tempId))
    setProgress((p) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [tempId]: _omitted, ...rest } = p
      return rest
    })
  }, [])

  const retryUpload = React.useCallback((tempId: string) => {
    const now = new Date().toISOString()
    setProgress((p) => ({ ...p, [tempId]: 0 }))
    const interval = setInterval(() => {
      setProgress((p) => ({ ...p, [tempId]: Math.min(100, (p[tempId] ?? 0) + 12) }))
    }, 180)
    const toParsed = setTimeout(() => {
      setDocs((current) => current.map((c) => c.id === tempId ? { ...c, status: 'parsed', parsed: { merchant: 'Unknown', amount: Math.round(Math.random()*200)+10, currency: 'MYR', date: now.slice(0,10) }, amount: Math.round(Math.random()*200)+10, currency: 'MYR', txnDate: now.slice(0,10) } : c))
    }, 1000)
    const toSaved = setTimeout(() => {
      clearInterval(interval)
      setProgress((p) => ({ ...p, [tempId]: 100 }))
      setDocs((current) => current.map((c, idx) => c.id === tempId ? { ...c, id: `${Date.now()}_${idx}`, status: 'saved' } : c))
    }, 2000)
    void toParsed; void toSaved
  }, [])

  return { docs, setDocs, addOptimisticFiles, progress, cancelUpload, retryUpload }
}


