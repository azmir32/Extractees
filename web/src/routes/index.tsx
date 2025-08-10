import { createRoute } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import { Button } from '../components/Button'
import { ArrowRight, VaultIcon, SparklesIcon } from '../components/Icons'
import { GradientBlobs } from '../components/GradientBlobs'
import { EmailToVaultDemo } from '../components/EmailToVaultDemo'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { Badge } from '../components/Badge'
import { StepCard } from '../components/StepCard'
import { FeatureItem } from '../components/FeatureItem'
import { Connector } from '../components/Connector'

function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <Section className="py-16 sm:py-24">
        <GradientBlobs />
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
          <div className="space-y-6">
            <Badge><SparklesIcon className="size-3" /> New • Extractees</Badge>
            <h1 className="text-4xl/tight sm:text-5xl/tight font-semibold tracking-tight">
              Your Inbox, Now Smarter.
            </h1>
            <p className="text-muted-foreground text-lg">
              Turn any email into organized, ready-to-use data — instantly. Just send it to your unique address, and we’ll handle the rest.
            </p>
            <div className="pt-2">
              <a href="#steps">
                <Button>
                  Get My Unique Address <ArrowRight className="size-4" />
                </Button>
              </a>
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

      {/* Animated Pipeline */}
      <Section className="py-10" title={<h2 id="pipeline" className="text-xl font-semibold">Email → Vault → Extraction → Summary</h2>}>
        <Reveal>
          <div className="relative overflow-hidden rounded-[var(--radius)] border border-border bg-card p-6">
            <div className="grid items-center gap-6 text-sm text-muted-foreground md:grid-cols-[1fr_auto_1fr]">
              <div className="rounded-[12px] border border-border bg-background p-6 text-center shadow-sm hover:shadow transition-shadow">Email</div>
              <Connector />
              <div className="rounded-[12px] border border-border bg-background p-6 text-center shadow-sm hover:shadow transition-shadow flex items-center justify-center gap-2">
                <VaultIcon className="size-5" /> Vault
              </div>
            </div>

            <div className="mt-6 grid items-center justify-center gap-6 text-sm text-muted-foreground md:grid-cols-[1fr_auto_1fr]">
              <div className="rounded-[12px] border border-border bg-background p-4 text-center shadow-sm hover:shadow transition-shadow">Extraction</div>
              <Connector />
              <div className="rounded-[12px] border border-border bg-background p-4 text-center shadow-sm hover:shadow transition-shadow">Summary</div>
            </div>

            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
          </div>
        </Reveal>
      </Section>

      {/* Steps */}
      <Section id="steps" className="py-20 sm:py-28" title="From Email to Insights — In 3 Steps">
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <Reveal>
            <StepCard
              step={1}
              title="Sign up & get your unique address"
              description={<span>Choose a random ID or something memorable like <span className="font-mono">flower.cynco.io</span>.</span>}
            />
          </Reveal>
          <Reveal delayMs={100}>
            <StepCard
              step={2}
              title="Send anything to your address"
              description="Invoices, receipts, contracts — just email them."
            />
          </Reveal>
          <Reveal delayMs={200}>
            <StepCard
              step={3}
              title="We organize & extract for you"
              description="Files are stored securely, processed with OCR, and turned into structured summaries you can actually use."
            />
          </Reveal>
        </div>
        <div className="mt-10">
          <Button>Start Free →</Button>
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section className="py-16 sm:py-24" title="Your Email, Your Data, Your Control">
        <Reveal>
          <ul className="mt-6 space-y-3">
            <FeatureItem>One address for everything — no more messy inbox searches.</FeatureItem>
            <FeatureItem>Automatic extraction — key info ready without manual typing.</FeatureItem>
            <FeatureItem>Secure vault — your data stays private & encrypted.</FeatureItem>
            <FeatureItem>Custom IDs — brand it your way: yourbiz.cynco.io.</FeatureItem>
          </ul>
          <div className="mt-10">
            <a href="#steps" className="inline-flex items-center rounded-[var(--radius)] bg-primary text-primary-foreground px-4 py-2 text-sm font-medium">Get Started — It’s Free</a>
          </div>
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


