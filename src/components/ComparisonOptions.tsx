import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

interface ComparisonOptionsProps {
  ignoreCaseAndWhitespace: boolean
  onToggleIgnoreCaseAndWhitespace: (checked: boolean) => void
  className?: string
}

export function ComparisonOptions({
  ignoreCaseAndWhitespace,
  onToggleIgnoreCaseAndWhitespace,
  className,
}: ComparisonOptionsProps) {
  return (
    <div className={`flex items-center space-x-2 ${className || ''}`}>
      <Checkbox
        id="ignore-formatting"
        checked={ignoreCaseAndWhitespace}
        onCheckedChange={onToggleIgnoreCaseAndWhitespace}
      />
      <Label
        htmlFor="ignore-formatting"
        className="text-sm font-medium font-sans-serif"
      >
        Ignorar mayúsculas y espacios en blanco
      </Label>
    </div>
  )
}
