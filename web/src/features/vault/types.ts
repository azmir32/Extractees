export type DocumentStatus = 'pending' | 'parsed' | 'needs_review' | 'saved'

export interface Vendor {
  id: string
  name: string
}

export interface Category {
  id: string
  name: string
  taxReliefKey?: string
}

export interface ParsedItem {
  description: string
  quantity?: number
  unitPrice?: number
  total: number
}

export interface ParsedFields {
  merchant?: string
  invoiceNo?: string
  amount?: number
  currency?: string
  date?: string
  items?: ParsedItem[]
}

export interface DocumentRecord {
  id: string
  filename: string
  mimeType: string
  size: number
  uploadedAt: string
  vendorId?: string
  amount?: number
  currency?: string
  txnDate?: string
  status: DocumentStatus
  deductible?: boolean
  categoryId?: string
  tags: string[]
  url?: string
  thumbnailUrl?: string
  parsed?: ParsedFields
}

export interface QueryParams {
  q?: string
  status?: DocumentStatus | 'all'
  vendorId?: string
  categoryId?: string
}


