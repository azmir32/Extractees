import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { IconUpload } from '@tabler/icons-react'

type Props = {
  value: { q: string; status: string }
  onChange: (v: { q: string; status: string }) => void
  onUploadClick: () => void
}

export function VaultToolbar({ value, onChange, onUploadClick }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="flex-1">
        <Input
          placeholder="Search invoices, vendors, amounts…"
          value={value.q}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...value, q: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-[160px_auto] gap-3">
        <Select value={value.status} onValueChange={(v) => onChange({ ...value, status: v })}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="parsed">Parsed</SelectItem>
            <SelectItem value="needs_review">Needs review</SelectItem>
            <SelectItem value="saved">Saved</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={onUploadClick} className="interactive-elevate">
          <IconUpload className="size-4" />
          Upload
        </Button>
      </div>
    </div>
  )
}


