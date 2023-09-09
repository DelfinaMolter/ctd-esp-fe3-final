import * as React from 'react';
import type {NextPage} from 'next'
import Head from 'next/head'
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { Faq } from 'interface/faqs';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

interface Props{
    faqs: Faq[]
}

const Accordion = styled((props: AccordionProps) => (
        <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
                '&:not(:last-child)': {
                    borderBottom: 0,
                },
                '&:before': {
                    display: 'none',
                },
    }));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
        <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props}/>
    ))(({ theme }) => ({
        backgroundColor:
            theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
        flexDirection: 'row-reverse',
            '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                transform: 'rotate(90deg)',
            },
            '& .MuiAccordionSummary-content': {
                marginLeft: theme.spacing(1),
            },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const faqsPage: NextPage<Props> = ({ faqs }) => {
    const [expanded, setExpanded] = React.useState<number | false>();
    
    const handleChange =
        (panel: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

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
                        <Accordion expanded={expanded === faq.id} onChange={handleChange(faq.id)}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Typography>{faq.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{faq.answer} </Typography>
                            </AccordionDetails>
                        </Accordion>
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
