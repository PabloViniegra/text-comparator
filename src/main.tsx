import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
// @ts-expect-error fontsource-variable
import '@fontsource-variable/montserrat'
// @ts-expect-error fontsource
import '@fontsource/monaspace-neon'
// @ts-expect-error fontsource-variable
import '@fontsource-variable/baloo-tamma-2'
// @ts-expect-error fontsource-variable
import '@fontsource-variable/geist'
import './index.css'
import ComparationPage from '@/pages/ComparationPage.tsx'
import { Toaster } from '@/components/ui/sonner'
import { createBrowserRouter, RouterProvider } from 'react-router'
import MainLayout from '@/layouts/MainLayout.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <App />
      </MainLayout>
    ),
  },
  {
    path: '/home',
    element: (
      <MainLayout>
        <ComparationPage />
      </MainLayout>
    ),
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster position="top-right" />
  </StrictMode>
)
