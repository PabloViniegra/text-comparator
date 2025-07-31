import type { Difference, TextStats } from '@/types'
import { useState } from 'react'

export default function useCompare() {
  const [text1, setText1] = useState<string>('')
  const [text2, setText2] = useState<string>('')
  const [differences, setDifferences] = useState<Difference[]>([])
  const [hasCompared, setHasCompared] = useState<boolean>(false)
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [ignoreFormatting, setIgnoreFormatting] = useState<boolean>(false)

  const getTextStats = (text: string): TextStats => {
    return {
      characters: text.length,
      words: text.trim() === '' ? 0 : text.trim().split(/\s+/).length,
      lines: text.split('\n').length,
    }
  }

  const compareTexts = () => {
    const words1 = text1.split(/(\s+)/)
    const words2 = text2.split(/(\s+)/)
    const result: Difference[] = []

    const normalizedText1 = ignoreFormatting
      ? text1.replace(/\s+/g, '').toLowerCase()
      : text1
    const normalizedText2 = ignoreFormatting
      ? text2.replace(/\s+/g, '').toLowerCase()
      : text2

    if (ignoreFormatting) {
      const maxLength = Math.max(normalizedText1.length, normalizedText2.length)

      for (let i = 0; i < maxLength; i++) {
        const char1 = normalizedText1[i] || ''
        const char2 = normalizedText2[i] || ''

        if (char1 === char2) {
          if (char1) {
            const displayChar = text1[i] || text2[i] || ''
            result.push({ type: 'unchanged', text: displayChar })
          }
        } else {
          if (char1) {
            result.push({ type: 'removed', text: text1[i] || char1 })
          }
          if (char2) {
            result.push({ type: 'added', text: text2[i] || char2 })
          }
        }
      }
    } else {
      const maxLength = Math.max(words1.length, words2.length)

      for (let i = 0; i < maxLength; i++) {
        const word1 = words1[i] || ''
        const word2 = words2[i] || ''

        if (word1 === word2) {
          if (word1) {
            result.push({ type: 'unchanged', text: word1 })
          }
        } else {
          if (word1 && !word2) {
            result.push({ type: 'removed', text: word1 })
          } else if (!word1 && word2) {
            result.push({ type: 'added', text: word2 })
          } else if (word1 && word2) {
            result.push({ type: 'removed', text: word1 })
            result.push({ type: 'added', text: word2 })
          }
        }
      }
    }

    setDifferences(result)
    setHasCompared(true)
  }

  const resetComparison = () => {
    setText1('')
    setText2('')
    setDifferences([])
    setHasCompared(false)
  }

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(label)
      setTimeout(() => setCopiedText(null), 2000)
    } catch (err) {
      console.error('Error copying to clipboard:', err)
    }
  }

  return {
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
  }
}
