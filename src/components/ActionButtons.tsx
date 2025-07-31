import { Button } from '@/components/ui/button'
import { RotateCcw, Loader2 } from 'lucide-react'

interface ActionButtonsProps {
  onCompare: () => void
  onReset: () => void
  isCompareDisabled: boolean
  isLoading?: boolean
}

export function ActionButtons({ onCompare, onReset, isCompareDisabled, isLoading = false }: ActionButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10 px-4">
      <Button
        onClick={onCompare}
        disabled={isCompareDisabled || isLoading}
        size="lg"
        className="px-8 h-12 text-base font-medium bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-md hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-0.5 w-full sm:w-auto font-sans relative overflow-hidden"
      >
        <span className={`relative z-10 flex items-center gap-2 font-sans transition-opacity duration-200 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          Compare Texts
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-git-compare"
          >
            <circle cx="18" cy="18" r="3" />
            <circle cx="6" cy="6" r="3" />
            <path d="M13 6h3a2 2 0 0 1 2 2v7" />
            <path d="M11 18H8a2 2 0 0 1-2-2V9" />
          </svg>
        </span>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-white" />
          </div>
        )}
      </Button>
      <Button
        variant="outline"
        onClick={onReset}
        size="lg"
        className="h-12 px-6 border-border/50 hover:border-destructive/30 hover:bg-destructive/5 hover:text-destructive transition-colors duration-200 w-full sm:w-auto font-sans"
      >
        <RotateCcw className="h-4 w-4 mr-2" />
        Clear All
      </Button>
    </div>
  )
}
