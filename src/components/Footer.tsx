import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const Footer = () => {
  const [openTerms, setOpenTerms] = useState(false)
  const [openPrivacy, setOpenPrivacy] = useState(false)

  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
      <div className="mx-auto max-w-7xl w-full flex flex-col items-center justify-between gap-4 py-6 md:py-4 md:h-16 md:flex-row">
        <p className="text-sm text-muted-foreground font-code tracking-wide font-medium text-balance">
          &copy; {new Date().getFullYear()} Text Comparator. All rights
          reserved.
        </p>
        <div className="flex items-center gap-6">
          <Dialog open={openTerms} onOpenChange={setOpenTerms}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3 text-muted-foreground hover:text-foreground font-sans-serif tracking-wide transition-colors"
              >
                Terms & Conditions
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Terms & Conditions</DialogTitle>
              </DialogHeader>
              <div className="prose dark:prose-invert max-w-none text-balance">
                <h3>1. Acceptance of Terms</h3>
                <p>
                  By accessing and using this service, you accept and agree to
                  be bound by the terms and conditions outlined here.
                </p>

                <h3>2. Description of Service</h3>
                <p>
                  This service provides text comparison functionality to users.
                  We reserve the right to modify or discontinue the service at
                  any time.
                </p>

                <h3>3. User Responsibilities</h3>
                <p>
                  Users are responsible for the content they submit for
                  comparison. Do not submit sensitive or confidential
                  information.
                </p>

                <h3>4. Limitation of Liability</h3>
                <p>
                  We are not liable for any damages resulting from the use or
                  inability to use the service.
                </p>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={openPrivacy} onOpenChange={setOpenPrivacy}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3 text-muted-foreground hover:text-foreground font-sans-serif tracking-wide transition-colors"
              >
                Privacy Policy
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Privacy Policy</DialogTitle>
              </DialogHeader>
              <div className="prose dark:prose-invert max-w-none text-balance">
                <h3>1. Information We Collect</h3>
                <p>
                  We collect information that you provide directly to us, such
                  as when you use our text comparison service.
                </p>

                <h3>2. How We Use Your Information</h3>
                <p>
                  We use the information we collect to provide, maintain, and
                  improve our services, and to develop new ones.
                </p>

                <h3>3. Information Sharing</h3>
                <p>
                  We do not share your personal information with third parties
                  except as described in this Privacy Policy.
                </p>

                <h3>4. Data Security</h3>
                <p>
                  We implement appropriate security measures to protect against
                  unauthorized access to or unauthorized alteration, disclosure,
                  or destruction of data.
                </p>

                <h3>5. Changes to This Policy</h3>
                <p>
                  We may update this Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </footer>
  )
}

export default Footer
