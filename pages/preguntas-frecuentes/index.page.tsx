import type {NextPage} from 'next'
import Head from 'next/head'
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";

const Index: NextPage = () => {
    return (
        <>
            <Head>
                <title>FAQs</title>
                <meta name="description" content="All the frequency questions"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <BodySingle title={"FAQs"}>
            </BodySingle>
        </>
    )
}

export default Index
