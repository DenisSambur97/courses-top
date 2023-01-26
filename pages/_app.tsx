import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head";
import {link} from "fs";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return <>
    <Head>
      <title>MyTop - лучший топ ваканский</title>
      {/*<link rel="icon" href="../components/favicon.ico"/>*/}
      {/*<link rel="preconnect" href="https://fonts.googleapis.com"/>*/}
      {/*<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;700&display=swap"*/}
      {/*      rel="stylesheet"/>*/}
    </Head>
    <Component {...pageProps} />
  </>

}
