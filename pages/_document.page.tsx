import { FormularioProvider } from 'dh-marvel/components/form/contextData'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html style={{height: '100%'}}>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto&display=optional"
                    rel="stylesheet"
                    
                />
            </Head>
            <FormularioProvider>
                <body style={{height: '100%'}}>
                    <Main />
                    <NextScript />
                </body>
            </FormularioProvider>

        </Html>
    )
}