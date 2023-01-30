import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head";
import Router from "next/router";
import ym from "react-yandex-metrika"
import {YMInitializer} from "react-yandex-metrika"

export default function App({ Component, pageProps, router }: AppProps): JSX.Element {
  // Яндекс Метрика(подписка на изменение роутера)
  Router.events.on('routeChangeComplete', (url: string) => {
      if (typeof window !== 'undefined'){
        ym('hit', url)
      }
  })

  return <>
    <Head>
      <title>MyTop - лучший топ ваканский</title>
      <link rel="icon" href="/public/favicon.ico"/>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;700&display=swap"
            rel="stylesheet"/>
      <link rel="preconnect" href="https://mc.yandex.ru"/>
      {/*Для SEO*/}
      <meta property={'og:url'} content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}/>
      <meta property={'og:locale'} content={'ru_Ru'}/>
      <meta property={'og:type'} content={'article'}/>
    </Head>
    {/*Интеграция кода метрики*/}
    <YMInitializer
        accounts={[]}
        options={{webvisor: true, defer: true}}
        version='2'
    />
    <Component {...pageProps} />
  </>

}
