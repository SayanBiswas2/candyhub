import Nav from '@/components/Nav'
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head/>
      <body className='bg-color-back text-color-font'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
