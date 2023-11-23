"use client"
import { Inter } from 'next/font/google'
import './globals.css'
import { useRouter } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
 const router = useRouter()
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
