import type { NextPage} from 'next'
import Head from 'next/head'
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';


const steps = ['Datos Personales', 'Dirección de entrega', 'Datos del pago'];


const CheckoutPage: NextPage = () => {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    
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
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps: { completed?: boolean } = {};
                            const labelProps: {
                                optional?: React.ReactNode;
                            } = {};
                            return (
                                <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            todos los campos fueron completados
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button  variant="outlined" onClick={handleReset}>Limpiar</Button>
                        </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                            variant="outlined"
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                            >
                            Volver
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button  variant="outlined" onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Enviar' : 'Siguiente'}
                            </Button>
                        </Box>
                        </React.Fragment>
                    )}
                </Box>
            </BodySingle>
        </>
    )
}

export default CheckoutPage
