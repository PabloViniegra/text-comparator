import { FileText, Search, Sun, Moon, ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { useTheme } from '@/hooks/useTheme'
import { Logo } from './icons/Logo'
import { useNavigate } from 'react-router'

export default function Hero() {
  const { isDarkMode, toggleDarkMode } = useTheme()
  const navigate = useNavigate()

  return (
    <section className="relative py-12 md:py-20 overflow-hidden">
      <div className="absolute top-4 right-4 z-10">
        <Button
          onClick={toggleDarkMode}
          variant="ghost"
          size="icon"
          className="rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-colors"
          aria-label={
            isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
          }
        >
          {isDarkMode ? (
            <Sun className="size-5" />
          ) : (
            <Moon className="size-5" />
          )}
        </Button>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 w-24 h-24 md:w-32 md:h-32 relative">
            <Logo className="w-full h-full text-foreground" />
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Text Comparator
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 font-sans-serif tracking-tight">
            Compare, analyze, and find differences between texts with ease
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-5xl">
            {[
              {
                icon: <FileText className="size-8 text-primary" />,
                title: 'Text Comparison',
                description: 'Easily compare two texts side by side',
              },
              {
                icon: <Search className="size-8 text-primary" />,
                title: 'Smart Analysis',
                description: 'Find differences and similarities',
              },
              {
                icon: <ArrowRight className="size-8 text-primary" />,
                title: 'Quick Results',
                description: 'Get instant comparison results',
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group flex flex-col items-center p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="bg-primary/10 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold font-sans-serif">
                  {feature.title}
                </h3>
                <p className="text-center text-muted-foreground font-sans">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
          <Button
            className="group relative overflow-hidden px-8 py-6 text-md font-mono font-semibold tracking-wider bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl"
            size="lg"
            onClick={() => navigate('/home')}
          >
            <span className="relative z-10 flex items-center">
              Get Started
              <ArrowRight className="ml-3 h-5 w-5 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
            </span>
            <span className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/90 via-primary/80 to-primary/90 opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <span className="absolute top-0 left-0 w-full h-0.5 bg-white/30 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white/30 transform translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
          </Button>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden opacity-10 dark:opacity-5">
        <div className="absolute top-1/4 -left-10 w-40 h-40 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-1/2 -right-10 w-40 h-40 bg-secondary rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-40 h-40 bg-accent rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>
    </section>
  )
}
