import 'nextra-theme-blog/style.css'
import Head from 'next/head'
import '../styles/main.css'
import { SpeedInsights } from '@vercel/speed-insights/react'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="/feed.xml"
        />
        <link
          rel="preload"
          href="/fonts/Inter-roman.latin.var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <Component {...pageProps} />
      <SpeedInsights />
    </>
  )
}

export default MyApp