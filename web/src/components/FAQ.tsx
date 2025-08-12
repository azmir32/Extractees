import type { ReactNode } from 'react'

interface FAQItem {
  q: string
  a: ReactNode
}

const faqs: FAQItem[] = [
  {
    q: 'How does Extractees capture emails?',
    a: 'We give you a unique @extractees.com address. Forward or BCC receipts and invoices to it, and we handle the rest.',
  },
  {
    q: 'Do you support OCR for images and PDFs?',
    a: 'Yes. Our OCR parses PDFs and image-based receipts to extract totals, dates, and vendor names for Malaysian tax needs.',
  },
  {
    q: 'What is the Personal Tax Summary?',
    a: 'A clean, export-ready view of categories and totals aligned to Malaysia personal income tax (Form BE/B).',
  },
  {
    q: 'Is my data secure?',
    a: 'Data is encrypted at rest and in transit. You control access, and we follow GDPR best practices.',
  },
  {
    q: 'When is the Malaysia tax deadline for individuals?',
    a: 'For individuals without business income (Form BE), e‑Filing is due 15 May the following year. For individuals with business income (Form B), e‑Filing is due 15 July.',
  },
]

export function FAQ() {
  return (
    <div className="divide-y divide-border rounded-[12px] border border-border bg-card">
      {faqs.map((item, idx) => (
        <details key={idx} className="group [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5">
            <h3 className="text-base font-medium">{item.q}</h3>
            <div className="size-5 shrink-0 rounded-full border border-border text-muted-foreground grid place-items-center group-open:rotate-45 transition">
              +
            </div>
          </summary>
          <div className="px-4 pb-4 text-sm text-muted-foreground sm:px-6 sm:pb-5">{item.a}</div>
        </details>
      ))}
    </div>
  )
}


