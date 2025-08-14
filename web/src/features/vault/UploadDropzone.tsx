import * as React from 'react'
import { Button } from '@/components/ui/button'

type Props = {
  onFiles: (files: File[]) => void
}

export function UploadDropzone({ onFiles }: Props) {
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [isDragging, setDragging] = React.useState(false)

  const onDrop = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
    const files = Array.from(e.dataTransfer.files || [])
    if (files.length) onFiles(files)
  }, [onFiles])

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      className={
        `rounded-xl border border-dashed ${isDragging ? 'border-primary bg-primary/5' : 'border-border'} p-6 text-sm text-muted-foreground flex flex-col items-center justify-center gap-3`
      }
      role="region"
      aria-label="Upload files"
    >
      <div>Drag & drop PDFs or images here</div>
      <div>or</div>
      <Button onClick={() => inputRef.current?.click()}>Browse files</Button>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".pdf,image/*"
        className="hidden"
        onChange={(e) => {
          const files = e.currentTarget.files ? Array.from(e.currentTarget.files) : []
          if (files.length) onFiles(files)
          e.currentTarget.value = ''
        }}
      />
    </div>
  )
}


