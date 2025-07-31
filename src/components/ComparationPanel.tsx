import { useState } from 'react'
import useCompare from '@/hooks/useCompare'
import { useCompareFiles } from '@/hooks/useCompareFiles'
import { Header } from './Header'
import { TextInputCard } from './TextInputCard'
import { ActionButtons } from './ActionButtons'
import { ComparisonResult } from './ComparisonResult'
import { ComparisonOptions } from './ComparisonOptions'
import { motion } from 'motion/react'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

export default function ComparationPanel() {
  const [activeFileInput, setActiveFileInput] = useState<
    'text1' | 'text2' | null
  >(null)
  const [isComparing, setIsComparing] = useState(false)

  const { file1, file2, setFile1, setFile2 } = useCompareFiles()

  const {
    text1,
    text2,
    setText1,
    setText2,
    differences,
    hasCompared,
    copiedText,
    getTextStats,
    compareTexts,
    resetComparison,
    copyToClipboard,
    ignoreFormatting,
    setIgnoreFormatting,
  } = useCompare()

  interface TextFile extends File {
    text: () => Promise<string>
  }

  const isTextFile = (file: unknown): file is TextFile => {
    return (
      file instanceof File &&
      'text' in file &&
      typeof (file as { text?: unknown }).text === 'function'
    )
  }

  const getDisplayText = (text: string) => {
    try {
      const data = JSON.parse(text)
      return data.fileName || text
    } catch {
      return text
    }
  }

  const displayText1 = getDisplayText(text1)
  const displayText2 = getDisplayText(text2)

  const getFileExtension = (filename: string) => {
    const match = filename.match(/\.([a-zA-Z0-9]+)$/)
    return match ? match[1].toLowerCase() : ''
  }

  const getFileExtensionFromText = (text: string) => {
    try {
      const data = JSON.parse(text)
      if (
        data.fileName &&
        data.fileName.startsWith('[') &&
        data.fileName.endsWith(']')
      ) {
        const fileName = data.fileName.slice(1, -1)
        return getFileExtension(fileName)
      }
      return ''
    } catch {
      return ''
    }
  }

  const handleCompare = async () => {
    try {
      if (file1 || file2 || text1.includes('[') || text2.includes('[')) {
        let ext1 = ''
        let ext2 = ''

        if (file1) {
          ext1 = getFileExtension(file1.name)
        } else if (text1.includes('[')) {
          ext1 = getFileExtensionFromText(text1)
        }

        if (file2) {
          ext2 = getFileExtension(file2.name)
        } else if (text2.includes('[')) {
          ext2 = getFileExtensionFromText(text2)
        }

        if (ext1 && ext2 && ext1 !== ext2) {
          toast.error('No se pueden comparar archivos de diferentes tipos')
          return
        }
      }

      if ((!file1 && !text1.trim()) || (!file2 && !text2.trim())) {
        toast.error('Por favor, ingresa texto o carga archivos para comparar')
        return
      }

      setIsComparing(true)

      let content1 = text1
      let content2 = text2

      try {
        if (file1 && isTextFile(file1)) {
          content1 = await file1.text()
        } else if (content1.includes('[')) {
          try {
            const data = JSON.parse(content1)
            if (
              data.fileName &&
              data.fileName.startsWith('[') &&
              data.fileName.endsWith(']')
            ) {
              const fileName = data.fileName.slice(1, -1)
              if (file1 && isTextFile(file1) && file1.name === fileName) {
                content1 = await file1.text()
              }
            }
          } catch (error) {
            console.error('Error reading file content:', error)
          }
        }

        if (file2 && isTextFile(file2)) {
          content2 = await file2.text()
        } else if (content2.includes('[')) {
          try {
            const data = JSON.parse(content2)
            if (
              data.fileName &&
              data.fileName.startsWith('[') &&
              data.fileName.endsWith(']')
            ) {
              const fileName = data.fileName.slice(1, -1)
              if (file2 && isTextFile(file2) && file2.name === fileName) {
                content2 = await file2.text()
              }
            }
          } catch (error) {
            console.error('Error reading file content:', error)
          }
        }
      } catch (error) {
        console.error('Error reading file content:', error)
        toast.error('Error al leer el contenido de los archivos')
        setIsComparing(false)
        return
      }

      const originalText1 = text1
      const originalText2 = text2

      setText1(content1)
      setText2(content2)

      await new Promise((resolve) => setTimeout(resolve, 0))

      compareTexts()

      setText1(originalText1)
      setText2(originalText2)
    } catch (error) {
      console.error('Error durante la comparación:', error)
      toast.error('Ocurrió un error al comparar los textos')
    } finally {
      setIsComparing(false)
    }
  }

  const handleReset = () => {
    resetComparison()
    setActiveFileInput(null)
  }

  getTextStats(text1)
  getTextStats(text2)

  const handleDragOverWrapper = (
    e: React.DragEvent<HTMLDivElement>,
    inputId: 'text1' | 'text2'
  ) => {
    e.preventDefault()
    setActiveFileInput(inputId)
  }

  return (
    <div className="min-h-screen bg-transparent p-4 md:p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <Header />

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div
            onDragOver={(e) => handleDragOverWrapper(e, 'text1')}
            onDragLeave={() => setActiveFileInput(null)}
            onDrop={async (e) => {
              e.preventDefault()
              const file = e.dataTransfer.files?.[0]
              if (file) {
                const content = await file.text()
                setText1(
                  JSON.stringify({
                    fileName: `[${file.name}]`,
                    fileContent: content,
                  })
                )
                setFile1(file)
              }
              setActiveFileInput(null)
            }}
            className={
              activeFileInput === 'text1'
                ? 'ring-2 ring-primary rounded-lg'
                : ''
            }
          >
            <TextInputCard
              title="Original Text"
              description={
                file1
                  ? `Archivo: ${file1.name}`
                  : 'Drop a file or click the upload button above'
              }
              value={displayText1}
              onChange={setText1}
              onCopy={() => copyToClipboard(text1, 'text1')}
              copiedText={copiedText}
              copyId="text1"
              placeholder="Drop a file or click the upload button above"
              stats={getTextStats(text1)}
              hasFile={!!file1}
            />
          </div>

          <div
            onDragOver={(e) => handleDragOverWrapper(e, 'text2')}
            onDragLeave={() => setActiveFileInput(null)}
            onDrop={async (e) => {
              e.preventDefault()
              const file = e.dataTransfer.files?.[0]
              if (file) {
                const content = await file.text()
                setText2(
                  JSON.stringify({
                    fileName: `[${file.name}]`,
                    fileContent: content,
                  })
                )
                setFile2(file)
              }
              setActiveFileInput(null)
            }}
            className={
              activeFileInput === 'text2'
                ? 'ring-2 ring-primary rounded-lg'
                : ''
            }
          >
            <TextInputCard
              title="Modified Text"
              description={
                file2
                  ? `Archivo: ${file2.name}`
                  : 'Drop a file or click the upload button above'
              }
              value={displayText2}
              onChange={setText2}
              onCopy={() => copyToClipboard(text2, 'text2')}
              copiedText={copiedText}
              copyId="text2"
              placeholder="Drop a file or click the upload button above"
              stats={getTextStats(text2)}
              hasFile={!!file2}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <ComparisonOptions
            ignoreCaseAndWhitespace={ignoreFormatting}
            onToggleIgnoreCaseAndWhitespace={setIgnoreFormatting}
            className="mb-4 sm:mb-0"
          />
          <ActionButtons
            onCompare={handleCompare}
            onReset={handleReset}
            isCompareDisabled={
              (!file1 && !text1.trim()) || (!file2 && !text2.trim())
            }
            isLoading={isComparing}
          />
        </div>

        {hasCompared && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold font-sans text-foreground">
                  Comparison Result
                </h2>
                <p className="text-muted-foreground mt-1">
                  Highlighted differences between the compared texts
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="destructive" className="text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-destructive mr-1.5"></span>
                  Removed
                </Badge>
                <Badge
                  variant="outline"
                  className="text-xs font-mono bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20"
                >
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
                  Added
                </Badge>
                <Badge variant="secondary" className="text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/50 mr-1.5"></span>
                  Unchanged
                </Badge>
              </div>
            </div>
            <ComparisonResult differences={differences} />
          </motion.div>
        )}
      </div>
    </div>
  )
}
