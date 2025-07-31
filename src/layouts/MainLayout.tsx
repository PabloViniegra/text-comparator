import { useTheme } from '@/hooks/useTheme'
import Footer from '@/components/Footer'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isDarkMode } = useTheme()

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="relative flex-1">
        <div
          className="fixed inset-0 -z-10 transition-colors duration-300"
          style={{
            background: isDarkMode
              ? 'radial-gradient(125% 125% at 50% 90%, #000000 40%, #0d1a36 100%)'
              : 'radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)',
          }}
        />
        <div className="relative z-50">{children}</div>
      </div>
      <Footer />
    </div>
  )
}
