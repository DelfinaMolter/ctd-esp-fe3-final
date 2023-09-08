import type {NextPage} from 'next'
import Head from 'next/head'
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { Faq } from 'interface/faqs';

interface Props{
    faqs: Faq[]
}

const faqsPage: NextPage<Props> = ({ faqs }) => {
    return (
        <>
            <Head>
                <title>FAQs</title>
                <meta name="description" content="All the frequency questions"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <BodySingle title={"FAQs page"}>
            <div >
                {faqs.map((faq) => (
                    <div key={faq.id}>
                        <h2>{faq.question}</h2>
                        <p>{faq.answer}</p>
                    </div>
                    ))}
            </div>
            </BodySingle>
        </>
    )
}

export const getStaticProps = async () => {

    const response = await fetch(`${process.env.BASE_URL}/api/faqs`)
    const faqs = await response.json()

    return {
        props: {
            faqs
        }
    }

}

export default faqsPage
