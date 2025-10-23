import { useEffect } from 'preact/hooks'

// Simple hook to set the page title while the component is mounted
// Restores the previous title on unmount
export const usePageTitle = (title: string) => {
  useEffect(() => {
    const previous = document.title
    document.title = title
    return () => {
      // Restore the original title on unmount
      document.title = previous
    }
  }, [title])
}

