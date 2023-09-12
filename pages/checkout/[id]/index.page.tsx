import type { NextPage} from 'next'
import Head from 'next/head'
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { schema } from "rules";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm} from "react-hook-form";
import * as yup from "yup";
import Form from 'dh-marvel/components/form/form';

const CheckoutPage: NextPage = () => {
	type DataForm = yup.InferType<typeof schema>;

	const method = useForm<DataForm>({
		resolver: yupResolver(schema),
		defaultValues: {},
	});

    
    return (
        <>
            <Head>
                <title>Compra</title>
                <meta name="description" content="Estas en proceso de compra."/>
                <link rel="icon" href="/favicon.png"/>
            </Head>

            <BodySingle title={"Proceso de Compra"}>
                <Typography gutterBottom variant="h6" component="div" align="center">
                Estas a pocos pasos de tener tu comic.
                </Typography>
                <FormProvider {...method}>
                    <Form/>
                </FormProvider>
            </BodySingle>
        </>
    )
}

export default CheckoutPage
