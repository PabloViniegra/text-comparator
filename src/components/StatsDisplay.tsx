import type { TextStats } from '@/types'

interface StatsDisplayProps {
  stats: TextStats
}

export function StatsDisplay({ stats }: StatsDisplayProps) {
  return (
    <div className="flex gap-4 mt-3 text-sm text-muted-foreground">
      <span className="inline-flex items-center gap-1">
        <span className="font-medium">{stats.characters}</span> characters
      </span>
      <span className="inline-flex items-center gap-1">
        <span className="font-medium">{stats.words}</span> words
      </span>
      <span className="inline-flex items-center gap-1">
        <span className="font-medium">{stats.lines}</span> lines
      </span>
    </div>
  )
}
