import {Html, Head, Main, NextScript} from 'next/document'
import {link} from "fs";

export default function Document() {

    return (
        <Html lang="ru">
            <Head>
                <link rel="icon" href="/public/favicon.ico"/>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}
