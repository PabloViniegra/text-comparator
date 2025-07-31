import useTheme from '@/hooks/useTheme'
import { Button } from '@/components/ui/button'
import { Sun, Moon } from 'lucide-react'
import ComparationPanel from '@/components/ComparationPanel'

export default function ComparationPage() {
  const { isDarkMode, toggleDarkMode } = useTheme()

  return (
    <>
      <div className="absolute top-4 right-4">
        <Button
          onClick={toggleDarkMode}
          variant="ghost"
          size="icon"
          className="rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-colors"
          aria-label={
            isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
          }
        >
          {isDarkMode ? (
            <Sun className="size-5" />
          ) : (
            <Moon className="size-5" />
          )}
        </Button>
      </div>
      <ComparationPanel />
    </>
  )
}
