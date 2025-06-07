import Head from 'next/head'
import { SpeedInsights } from '@vercel/speed-insights/react'

export default function Insights() {
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
      <div>
        <h1>Insights</h1>
        {/* Conteúdo da página */}
      </div>
      <SpeedInsights />
    </>
  );
}