import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import type { Difference } from '@/types'

interface ComparisonResultProps {
  differences: Difference[]
}

export function ComparisonResult({ differences }: ComparisonResultProps) {
  if (!differences.length) return null

  const countChanges = (type: 'added' | 'removed') =>
    differences.filter((diff) => diff.type === type).length

  const addedCount = countChanges('added')
  const removedCount = countChanges('removed')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Comparison Results
        </h2>
        <div className="flex gap-3">
          <Badge variant="destructive" className="px-3 py-1.5 text-sm">
            {removedCount} {removedCount === 1 ? 'removal' : 'removals'}
          </Badge>
          <Badge variant="secondary" className="px-3 py-1.5 text-sm">
            {addedCount} {addedCount === 1 ? 'addition' : 'additions'}
          </Badge>
        </div>
      </div>

      <div className="bg-card border border-border/50 rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="font-mono text-sm leading-relaxed whitespace-pre-wrap">
            <div className="mb-1">
              {differences.map((diff, index) => {
                const isAdded = diff.type === 'added'
                const isRemoved = diff.type === 'removed'

                return (
                  <span
                    key={index}
                    className={`inline-block px-0.5 rounded-sm ${
                      isAdded
                        ? 'bg-green-500/20 text-green-600 dark:text-green-400'
                        : isRemoved
                        ? 'bg-red-500/20 text-red-600 dark:text-red-400 line-through'
                        : 'text-foreground/80'
                    }`}
                  >
                    {isAdded ? (
                      <Badge
                        variant="secondary"
                        className="text-xs font-mono bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20"
                      >
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
                        {diff.text}
                      </Badge>
                    ) : (
                      diff.text
                    )}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
