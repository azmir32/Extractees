import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { IconUpload } from '@tabler/icons-react'

type Props = {
  value: { q: string; status: string; from?: string; to?: string; vendorId?: string; categoryId?: string; tags?: string }
  onChange: (v: { q: string; status: string; from?: string; to?: string; vendorId?: string; categoryId?: string; tags?: string }) => void
  onUploadClick: () => void
  vendors?: Array<{ id: string; name: string }>
  categories?: Array<{ id: string; name: string }>
}

export function VaultToolbar({ value, onChange, onUploadClick, vendors = [], categories = [] }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex-1">
        <Input
          placeholder="Search invoices, vendors, amounts…"
          value={value.q}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...value, q: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
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
        <Input type="date" value={value.from ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...value, from: e.target.value })} />
        <Input type="date" value={value.to ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...value, to: e.target.value })} />
        <Select value={value.vendorId ?? 'all'} onValueChange={(v) => onChange({ ...value, vendorId: v === 'all' ? undefined : v })}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All vendors" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All vendors</SelectItem>
            {vendors.map((v) => (
              <SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={value.categoryId ?? 'all'} onValueChange={(v) => onChange({ ...value, categoryId: v === 'all' ? undefined : v })}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input placeholder="tags e.g. travel, food" value={value.tags ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...value, tags: e.target.value })} />
        <Button onClick={onUploadClick} className="interactive-elevate">
          <IconUpload className="size-4" />
          Upload
        </Button>
      </div>
    </div>
  )
}


