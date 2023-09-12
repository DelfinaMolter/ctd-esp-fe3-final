import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import DatosPersonales from 'dh-marvel/components/form/datosPersonales';
import DireccionEntrega from 'dh-marvel/components/form/direccionEntrega';
import DatosDelPago from 'dh-marvel/components/form/datosDelPago';
import Typography from '@mui/material/Typography';
import { useFormContext } from "react-hook-form";

const steps = ['Datos Personales', 'Dirección de entrega', 'Datos del pago'];

export default function Form() {
    const {handleSubmit} = useFormContext();

    const [activeStep, setActiveStep] = React.useState(0);
    const onSubmit = (data:any) => console.log(data)

    const handleNext = () => {
        handleSubmit(onSubmit)
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSend = () => {
        setActiveStep(0);
    };

    return(
        <Box sx={{ my: "40px"}}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean} = {};
                    return (
                        <Step key={label} {...stepProps} >
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <React.Fragment>
                <form >
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        
                            {activeStep === 0 && <DatosPersonales />}
                            {activeStep === 1 && <DireccionEntrega />}
                            {activeStep === 2 && <DatosDelPago />}
                        
                    </Typography>

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
                        {activeStep === steps.length - 1 
                        ?   <Button  variant="outlined" onClick={handleSend}>
                                Enviar
                            </Button>
                        :  <Button  variant="outlined" onClick={handleNext}>
                                Siguiente
                            </Button>
                        }
                    </Box>
                </form>
            </React.Fragment>
        </Box>
)

}
