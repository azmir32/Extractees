//
import type { DocumentRecord } from './types'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
  document?: DocumentRecord
}

export function DetailDrawer({ open, onOpenChange, document }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{document?.filename ?? 'Document'}</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          <div className="rounded-lg border border-border bg-card p-4 text-sm">
            <div className="font-medium mb-2">Preview</div>
            <div className="h-64 bg-muted rounded" />
          </div>
          <Separator />
          <div className="grid gap-2 text-sm">
            <div className="text-muted-foreground">Merchant</div>
            <div>{document?.parsed?.merchant ?? '—'}</div>
            <div className="text-muted-foreground mt-2">Amount</div>
            <div>{document?.amount ? `${document.currency ?? 'MYR'} ${document.amount.toFixed(2)}` : '—'}</div>
            <div className="text-muted-foreground mt-2">Date</div>
            <div>{document?.txnDate ?? '—'}</div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}


