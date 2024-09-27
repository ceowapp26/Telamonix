import React from 'react';
import { Toaster } from 'sonner';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/providers/theme-provider';
import { GeneralContextProvider } from '@/context/general-context-provider';
import { ReduxProvider } from '@/stores/ReduxProvider';
import { NextUIProvider } from '@nextui-org/react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WApp',
  description: 'The connected workspace where better, faster work happens.',
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo.svg",
        href: "/logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-dark.svg",
        href: "/logo-dark.svg",
      }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <React.StrictMode>
          <ReduxProvider>
            <NextUIProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
                storageKey="telamonix-theme-2"
              >
                <Toaster position="bottom-center" />
                <GeneralContextProvider>
                  {children}
                </GeneralContextProvider>
              </ThemeProvider>
            </NextUIProvider>
          </ReduxProvider>
        </React.StrictMode>
      </body>
    </html>
  );
}
