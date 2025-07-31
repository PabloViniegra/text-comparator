import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Copy, Check, Upload } from 'lucide-react'
import { StatsDisplay } from './StatsDisplay'
import type { TextStats } from '@/types'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface TextInputCardProps {
  title: string
  description: string
  value: string
  onChange: (value: string) => void
  onCopy: () => void
  copiedText: string | null
  copyId: string
  placeholder: string
  stats: TextStats
  hasFile?: boolean
}

export function TextInputCard({
  title,
  description,
  value,
  onChange,
  onCopy,
  copiedText,
  copyId,
  placeholder,
  stats,
  hasFile = false,
}: TextInputCardProps) {
  const [isDragging, setIsDragging] = useState(false)
  const handleFileInputClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    document.getElementById(`file-input-${copyId}`)?.click()
  }

  return (
    <div className="border-border/50 bg-card/50 backdrop-blur-sm rounded-lg p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
      <div className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-sans font-semibold text-foreground">
              {title}
            </h2>
            <p className="text-muted-foreground font-sans-serif">
              {description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleFileInputClick}
              className="h-8 w-8 rounded-full hover:bg-accent/50"
              title="Upload file"
            >
              <Upload className="h-4 w-4 text-muted-foreground" />
            </Button>
            <input
              type="file"
              id={`file-input-${copyId}`}
              className="hidden"
              accept=".txt,.pdf,.docx"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (file) {
                  const content = await file.text()
                  onChange(
                    JSON.stringify({
                      fileName: `[${file.name}]`,
                      fileContent: content,
                    })
                  )
                }
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={onCopy}
              disabled={!value}
              className="h-8 w-8 rounded-full hover:bg-accent/50"
              title="Copy to clipboard"
            >
              {copiedText === copyId ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>
      </div>
      <div
        className={cn(
          'mt-4 border-2 border-dashed rounded-lg p-4 transition-all duration-200',
          'border-border/50 hover:border-primary/50',
          'min-h-[250px] flex flex-col relative',
          'group hover:bg-accent/5',
          isDragging && 'border-primary/70 bg-accent/10 ring-2 ring-primary/20'
        )}
        onDragOver={(e) => {
          e.preventDefault()
          e.stopPropagation()
          if (!isDragging) setIsDragging(true)
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsDragging(false)
        }}
        onDrop={async (e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsDragging(false)
          const file = e.dataTransfer.files?.[0]
          if (file) {
            const content = await file.text()
            onChange(
              JSON.stringify({
                fileName: `[${file.name}]`,
                fileContent: content,
              })
            )
          }
        }}
      >
        <div className="flex-1">
          <Textarea
            value={value}
            onChange={(e) => !hasFile && onChange(e.target.value)}
            className={cn(
              'min-h-[200px] w-full font-mono text-sm bg-background/50 border-border/50 focus-visible:ring-primary/50 resize-none',
              hasFile && 'bg-muted/50 cursor-not-allowed'
            )}
            placeholder={placeholder}
            readOnly={hasFile}
          />
        </div>
        <div
          className={cn(
            'mt-2 text-xs text-muted-foreground text-center',
            'transition-opacity duration-200',
            isDragging ? 'opacity-0' : 'opacity-100'
          )}
        >
          {value
            ? 'Edit text or drag a file to replace'
            : 'Drag and drop a file here, or click the upload button above'}
        </div>
        <div
          className={cn(
            'text-xs text-muted-foreground text-center',
            'transition-opacity duration-200',
            isDragging ? 'opacity-0' : 'opacity-100'
          )}
        >
          Supported formats: .txt, .pdf, .docx
        </div>
        {isDragging && (
          <div className="absolute inset-0 flex items-center justify-center bg-accent/10 rounded-lg pointer-events-none">
            <div className="text-center p-4 bg-background/80 rounded-lg border border-primary/30 shadow-lg">
              <Upload className="h-8 w-8 mx-auto text-primary mb-2" />
              <p className="text-sm font-medium text-foreground">
                Drop file to upload
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Supports: .txt, .pdf, .docx
              </p>
            </div>
          </div>
        )}
        <StatsDisplay stats={stats} />
      </div>
    </div>
  )
}
