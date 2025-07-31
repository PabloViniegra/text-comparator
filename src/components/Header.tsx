import { Logo } from '@/components/icons/Logo'

export function Header() {
  return (
    <header className="relative overflow-hidden text-center mb-8 md:mb-12 flex flex-col items-center pt-12 md:pt-16 pb-6 md:pb-8 px-4 sm:px-6">
      <div
        className="absolute inset-0 -z-10 opacity-10 dark:opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, var(--primary) 1px, transparent 1px)',
          backgroundSize: 'clamp(16px, 1.5vw, 24px) clamp(16px, 1.5vw, 24px)',
        }}
      />
      <div className="w-full max-w-4xl mx-auto">
        <div className="inline-flex items-center justify-center mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-background/80 backdrop-blur-sm border border-border/30 shadow-sm">
          <div className="flex items-baseline gap-2 sm:gap-3">
            <Logo className="size-6 sm:size-7 md:size-8 text-primary relative top-[0.15em]" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-display bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Text Comparator
            </h1>
          </div>
        </div>

        <p className="text-muted-foreground/90 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-sans tracking-wide px-2 sm:px-0">
          <span className="font-medium text-foreground/90">
            Compare two texts
          </span>{' '}
          and visualize the differences clearly and in detail. Perfect for
          reviewing changes in documents, code, or any text content.
        </p>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[calc(100%-2rem)] h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>
    </header>
  )
}
