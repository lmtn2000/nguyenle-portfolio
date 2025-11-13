import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import Footer from './components/footer'
import ThemeWrapper from './components/theme-wrapper'
import { ThemeProvider } from './components/theme-context'

export const metadata: Metadata = {
  title: {
    default: 'Nguyen Le | Fullstack Engineer',
    template: '%s | Nguyen Le Portfolio',
  },
  description:
    'Portfolio of Nguyen Le — a Fullstack Engineer passionate about web development and cloud architecture (AWS).',
  openGraph: {
    title: 'Nguyen Le | Fullstack Engineer & Cloud Developer',
    description:
      'Explore Nguyen Le’s portfolio showcasing fullstack projects, AWS cloud solutions, and modern web applications.',
    siteName: 'Nguyen Le Portfolio',
    locale: 'en_US',
    type: 'website',
    url: 'https://your-portfolio-domain.com',
    images: [
      {
        url: 'https://your-portfolio-domain.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nguyen Le Portfolio',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes: string[]) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'scroll-smooth',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased">
        <ThemeProvider>
          <ThemeWrapper>
            <main className="max-w-3xl mx-auto px-4 pt-10 pb-16 flex flex-col min-h-screen relative">
              <Navbar />
              <div className="flex-auto">{children}</div>
              <Footer />
            </main>
          </ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
