import { createRoute } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import { Button } from '../components/Button'
import { ArrowRight, VaultIcon, SparklesIcon, LockIcon, TagIcon, ShieldCheckIcon, MailIcon, CalculatorIcon } from '../components/Icons'
import { GradientBlobs } from '../components/GradientBlobs'
import { EmailToVaultDemo } from '../components/EmailToVaultDemo'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { Badge } from '../components/Badge'
import { StepCard } from '../components/StepCard'
import { FeatureItem } from '../components/FeatureItem'
import { Connector } from '../components/Connector'
import { SupabaseStatus } from '../components/SupabaseStatus'
import { FAQ } from '../components/FAQ'
// TaxDeadlineReminder is mounted globally in __root

function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <Section className="pt-12 sm:pt-16 pb-20 sm:pb-24">
        <GradientBlobs />
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <Reveal>
          <div className="space-y-6">
            <Badge><SparklesIcon className="size-3" /> New • Extractees</Badge>
            <div>
              <SupabaseStatus />
            </div>
            {/* Global pill moved to root layout to avoid pushing hero */}
            <h1 className="text-4xl/tight sm:text-6xl/tight font-extrabold tracking-tight">
              From Inbox to Tax-Ready in Minutes
            </h1>
            <p className="text-muted-foreground text-base sm:text-xl max-w-prose">
              Automate receipts and invoices from email, extract key data with OCR, and get a clean Personal Tax Summary — fast, accurate, and secure.
            </p>
              <div className="pt-2 sm:pt-3 space-y-3 sm:space-y-4">
                <div>
                  <a href="#steps">
                    <Button className="interactive-elevate interactive-glow interactive-scale w-full sm:w-auto">
                        Get My Unique Address <ArrowRight className="size-4" />
                      </Button>
                    </a>
                </div>
                {/* Trust badges */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-muted-foreground">
                  <div className="inline-flex items-center gap-2 rounded-[10px] border border-border bg-card px-3 py-1.5">
                    <LockIcon className="size-4 text-primary" /> Secure Vault
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-[10px] border border-border bg-card px-3 py-1.5">
                    <TagIcon className="size-4 text-primary" /> Automatic Categorization
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-[10px] border border-border bg-card px-3 py-1.5">
                    <ShieldCheckIcon className="size-4 text-primary" /> GDPR Compliant
                  </div>
                </div>
              </div>
          </div>
          </Reveal>
          <Reveal delayMs={120}>
            <div className="relative">
              <EmailToVaultDemo />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Removed separate reminder section; shown inline in hero */}

      {/* Animated Pipeline */}
      <Section className="py-12" title={<h2 id="pipeline" className="text-2xl sm:text-3xl font-semibold">Email → Vault → Extraction → Personal Tax Summary</h2>}>
        <Reveal>
            <div className="relative overflow-hidden rounded-[var(--radius)] border border-border bg-card p-6 interactive-elevate">
            <div className="grid items-center gap-6 text-sm text-muted-foreground md:grid-cols-[1fr_auto_1fr]">
              <div className="relative rounded-[12px] border border-border bg-background p-6 text-center shadow-sm transition-shadow"
                   style={{ animation: 'pipeline-slide 700ms ease-out 1 both', animationDelay: '0ms' }}>
                Email
              </div>
              <Connector />
              <div className="relative rounded-[12px] border border-border bg-background p-6 text-center shadow-sm transition-shadow flex items-center justify-center gap-2"
                   style={{ animation: 'pipeline-slide 700ms ease-out 1 both', animationDelay: '120ms' }}>
                <VaultIcon className="size-5 text-primary" /> Vault
              </div>
            </div>

            <div className="mt-6 grid items-center justify-center gap-6 text-sm text-muted-foreground md:grid-cols-[1fr_auto_1fr]">
              <div className="relative rounded-[12px] border border-border bg-background p-4 text-center shadow-sm transition-shadow"
                   style={{ animation: 'pipeline-slide 700ms ease-out 1 both', animationDelay: '240ms' }}>
                Extraction
              </div>
              <Connector />
              <div className="relative rounded-[12px] border border-border bg-background p-4 text-center shadow-sm transition-shadow"
                   style={{ animation: 'pipeline-slide 700ms ease-out 1 both', animationDelay: '360ms' }}>
                Personal Tax Summary
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
          </div>
        </Reveal>
        </Section>

        {/* Tax Summary Demo */}
        <Section className="py-14 sm:py-20" title="See It In Action: From Messy Email to Personal Tax Summary">
          <Reveal>
            <div className="grid md:grid-cols-2 gap-6 items-start">
              {/* Before: Messy Email */}
              <div className="rounded-[12px] border border-border bg-card p-4 shadow-sm interactive-elevate">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MailIcon className="size-4 text-primary" />
                  Before: Raw Email
                </div>
                <pre className="mt-3 max-h-64 overflow-auto whitespace-pre-wrap text-sm text-muted-foreground">
Store MY Sdn Bhd
Invoice #INV-2025-00123
Date: 04/11/2025
Item: Logitech MX Master 3S — RM289.00
Total: RM289.00
Payment: **** 4242
                </pre>
              </div>
              {/* After: Personal Tax Summary */}
              <div className="rounded-[12px] border border-border bg-card p-4 shadow-sm interactive-elevate">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalculatorIcon className="size-4 text-primary" />
                  After: Personal Tax Summary
                </div>
                <div className="mt-3 grid gap-3">
                  <div className="rounded-lg border border-border bg-background p-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Category</span>
                      <span className="font-medium">Office Equipment</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Amount</span>
                      <span className="font-semibold">RM289.00</span>
                    </div>
                  </div>
                  <div className="rounded-lg border border-border bg-background p-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Eligible Relief</span>
                      <span className="font-medium">Yes</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Relief Category</span>
                      <span className="font-semibold">Lifestyle</span>
                    </div>
                  </div>
                  <div className="rounded-lg border border-border bg-background p-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total</span>
                      <span className="font-semibold">RM289.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* Steps */}
      <Section id="steps" className="py-20 sm:py-28" title="From Email to Personal Tax Summary — In 3 Steps">
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <Reveal>
            <StepCard
              step={1}
              title="Sign up & get your unique address"
              description={<span>Choose a random ID or something memorable like <span className="font-mono">flower.extractees.com</span>.</span>}
            />
          </Reveal>
          <Reveal delayMs={100}>
            <StepCard
              step={2}
              title="Send invoices and receipts"
              description="OCR extracts amounts, dates, and vendor automatically."
            />
          </Reveal>
          <Reveal delayMs={200}>
            <StepCard
              step={3}
              title="Get your Personal Tax Summary"
              description="Auto-categorized, deductible-ready totals you can export."
            />
          </Reveal>
        </div>
        <div className="mt-10">
          <Button className="interactive-elevate interactive-glow interactive-scale">Start Free →</Button>
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section className="py-16 sm:py-24" title="Your Email, Your Data, Your Control">
        <Reveal>
          <ul className="mt-6 space-y-3">
            <FeatureItem>One address for everything — no more messy inbox searches.</FeatureItem>
            <FeatureItem>Automatic extraction — amounts, dates, and categories without manual typing.</FeatureItem>
            <FeatureItem>Secure vault — your data stays private & encrypted.</FeatureItem>
            <FeatureItem>Custom IDs — brand it your way: yourbiz.extractees.com.</FeatureItem>
          </ul>
          <div className="mt-10">
            <a href="#steps" className="interactive-elevate interactive-glow inline-flex items-center rounded-[var(--radius)] bg-primary text-primary-foreground px-4 py-2 text-sm font-medium">Get Started — It’s Free</a>
          </div>
        </Reveal>
      </Section>

      {/* Audience Targeting */}
      <Section className="py-16 sm:py-24" title="Built for Freelancers, Remote Workers, and Small Businesses">
        <Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <a href="#steps" className="group rounded-[14px] glass p-5 shadow-sm interactive-elevate interactive-scale">
              <div className="text-sm text-muted-foreground">Freelancers</div>
              <h3 className="mt-1 font-semibold">Track expenses from emailed receipts</h3>
              <p className="mt-2 text-sm text-muted-foreground">Auto-categorize software, gear, and subscriptions.</p>
            </a>
            <a href="#steps" className="group rounded-[14px] glass p-5 shadow-sm interactive-elevate interactive-scale">
              <div className="text-sm text-muted-foreground">Remote Workers</div>
              <h3 className="mt-1 font-semibold">Simplify home office deductions</h3>
              <p className="mt-2 text-sm text-muted-foreground">Summaries ready for annual filings.</p>
            </a>
            <a href="#steps" className="group rounded-[14px] glass p-5 shadow-sm interactive-elevate interactive-scale">
              <div className="text-sm text-muted-foreground">Small Businesses</div>
              <h3 className="mt-1 font-semibold">Track expense totals at a glance</h3>
              <p className="mt-2 text-sm text-muted-foreground">Export-ready Personal Tax Summary reports.</p>
            </a>
          </div>
        </Reveal>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="py-16 sm:py-24" title="Frequently Asked Questions" subtitle="Everything you need to know about Extractees for taxes.">
        <Reveal>
          <FAQ />
        </Reveal>
      </Section>
    </div>
  )
}

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/',
  component: Home,
})


