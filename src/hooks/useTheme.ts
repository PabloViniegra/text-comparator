import { useState, useEffect } from 'react'

export function useTheme() {
  const [darkMode, setDarkMode] = useState(false)

  // Check for dark mode preference on initial load
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setDarkMode(isDark)

    // Set up a mutation observer to detect theme changes from other components
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isNowDark = document.documentElement.classList.contains('dark')
          setDarkMode(isNowDark)
        }
      })
    })

    // Start observing the document element for attribute changes
    observer.observe(document.documentElement, { attributes: true })

    // Clean up the observer when the component unmounts
    return () => observer.disconnect()
  }, [])

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
    } else {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
    }
    setDarkMode(!darkMode)
  }

  return {
    isDarkMode: darkMode,
    toggleDarkMode,
  }
}

export default useTheme
