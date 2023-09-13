import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import DatosPersonales from 'dh-marvel/components/form/datosPersonales';
import DireccionEntrega from 'dh-marvel/components/form/direccionEntrega';
import DatosDelPago from 'dh-marvel/components/form/datosDelPago';
import { useFormContext } from "react-hook-form";

const steps = ['Datos Personales', 'Dirección de entrega', 'Datos del pago'];



export default function Forms() {
    const {handleSubmit,  formState: {errors}} = useFormContext();

    const [activeStep, setActiveStep] = React.useState(0);

    const onSubmit = (data:any) => console.log(data)

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSend = () => {
        if (confirm("Reset!") == true) {
            setActiveStep(0);
        }
        
    };

    return(
        <Box sx={{ my: "40px"}}>
            <Stepper activeStep={activeStep} alternativeLabel>
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ mt: 2, mb: 1 }}>
                        
                            {activeStep === 0 && <DatosPersonales />}
                            {activeStep === 1 && <DireccionEntrega />}
                            {activeStep === 2 && <DatosDelPago />}
                        
                    </Box>

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
                        ?   <Button type="submit" variant="outlined" onClick={handleSend}>
                                Enviar
                            </Button>
                        :  <Button type="submit" variant="outlined" onClick={handleNext}>
                                Siguiente
                            </Button>
                        }
                    </Box>
                </form>
            </React.Fragment>
        </Box>
)

}

