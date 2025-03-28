import './globals.css';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from '@/components/theme-provider';
import localFont from 'next/font/local';

const copernicus = localFont({
  src: './fonts/copernicus-font-family-1743103700-0/CopernicusNewCondTrial-090-BF6616044f92f03.otf',
  variable: '--font-copernicus',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Chetan Kittali',
  description: 'Portfolio of Chetan Kittali, Data Scientist',
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23DA7756'/%3E%3C/svg%3E",
        type: "image/svg+xml",
        sizes: "32x32"
      }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.className} ${copernicus.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}