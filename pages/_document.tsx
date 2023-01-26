import { Html, Head, Main, NextScript } from 'next/document'
import {link} from "fs";

export default function Document(){

  return (
    <Html lang="ru">
      <Head>
          <title>MyTop - лучший топ ваканский</title>
          <link rel="icon" href="../components/favicon.ico"/>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;700&display=swap"
                rel="stylesheet"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
