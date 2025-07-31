import { useState, useRef } from 'react'

type FileContent = {
  file: File
  name: string
}

export function useCompareFiles() {
  const [file1, setFile1] = useState<FileContent | null>(null)
  const [file2, setFile2] = useState<FileContent | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState<number | null>(null)
  const [fileContent1, setFileContent1] = useState<string>('')
  const [fileContent2, setFileContent2] = useState<string>('')
  const fileInputRef1 = useRef<HTMLInputElement>(null)
  const fileInputRef2 = useRef<HTMLInputElement>(null)


  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>, 
    setFile: (file: FileContent | null) => void, 
    setContent: (content: string) => void
  ) => {
    const file = e.target.files?.[0] || null
    if (!file) return

    const fileType = file.name.split('.').pop()?.toLowerCase()
    if (!fileType || !['txt', 'pdf', 'docx'].includes(fileType)) {
      setError('Solo se permiten archivos .txt, .pdf o .docx')
      return
    }

    try {
      // Solo guardamos la referencia al archivo y mostramos su nombre
      setFile({ file, name: file.name })
      setContent(`[${file.name}]`)
      setError(null)
    } catch (err) {
      setError('Error al procesar el archivo')
      console.error('Error processing file:', err)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault()
    e.stopPropagation()
    if (isDragging !== index) setIsDragging(index)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(null)
  }

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>, setFile: (file: FileContent | null) => void, setContent: (content: string) => void) => {
    e.preventDefault()
    setIsDragging(null)
    
    const file = e.dataTransfer.files?.[0] || null
    if (!file) return

    const fileType = file.name.split('.').pop()?.toLowerCase()
    if (!fileType || !['txt', 'pdf', 'docx'].includes(fileType)) {
      setError('Solo se permiten archivos .txt, .pdf o .docx')
      return
    }

    try {
      // Solo guardamos la referencia al archivo y mostramos su nombre
      setFile({ file, name: file.name })
      setContent(`[${file.name}]`)
      setError(null)
    } catch (err) {
      setError('Error al procesar el archivo')
      console.error('Error processing file:', err)
    }
  }

  const triggerFileInput = (index: number) => {
    if (index === 0) {
      fileInputRef1.current?.click()
    } else {
      fileInputRef2.current?.click()
    }
  }

  const clearFile = (index: number) => {
    if (index === 0) {
      setFile1(null)
      if (fileInputRef1.current) {
        fileInputRef1.current.value = ''
      }
    } else {
      setFile2(null)
      if (fileInputRef2.current) {
        fileInputRef2.current.value = ''
      }
    }
  }

  const validateFileTypes = (): boolean => {
    if (file1 && file2 && file1.file.type !== file2.file.type) {
      setError('Cannot compare files of different types')
      return false
    }
    return true
  }

  // Funciones para actualizar los estados de los archivos
  const updateFile1 = (file: File | null) => {
    if (!file) {
      setFile1(null)
      setFileContent1('')
    } else {
      setFile1({ file, name: file.name })
      setFileContent1('')
    }
  }

  const updateFile2 = (file: File | null) => {
    if (!file) {
      setFile2(null)
      setFileContent2('')
    } else {
      setFile2({ file, name: file.name })
      setFileContent2('')
    }
  }

  return {
    file1,
    file2,
    fileContent1,
    fileContent2,
    error,
    isDragging,
    handleFileChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    setFileContent1,
    setFileContent2,
    triggerFileInput,
    clearFile,
    validateFileTypes,
    setFile1: updateFile1,
    setFile2: updateFile2
  }
}
