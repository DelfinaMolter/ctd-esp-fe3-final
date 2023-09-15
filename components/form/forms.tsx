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
import { useDispatch, useStore } from '../../Hooks/contextData';


const steps = ['Datos Personales', 'Dirección de entrega', 'Datos del pago'];


export default function Forms() {
    // const dispatch = useDispatch()
    // const store = useStore()

    const {handleSubmit, trigger, clearErrors, reset, formState, formState:{isSubmitSuccessful}} = useFormContext();

    const [activeStep, setActiveStep] = React.useState(0);

    const onSubmit = (data:any) => {
        console.log(data)
        // console.log(store)
        // dispatch({
        //     type: "ACTUALIZAR_DATOS_PERSONALES",
        //     payload: data
        // })
    }
    

    const handleNext = async() => {
        let isValidate= await trigger(["name","lastName","email"]);
        if(activeStep == 0 && isValidate){
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        }
    };
    const handleNext2 = async() => {
        let isValidate= await trigger(["address1","address2","city","state","zipCode"]);
        if(activeStep == 1 && isValidate){
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        }
    };
    const handleNext3 = async() => {
        await trigger(["number","cvc","expDate","nameOnCard"]);
    };
    // const handleNext = async() => {
    //     let isValidate= true;
    //     if(activeStep == 0){
    //         isValidate = await trigger(["name","lastName","email"])
    //     }else if(activeStep == 1){
    //         isValidate = await trigger(["address1","address2","city","state","zipCode"])
    //     }
    //     // else if(activeStep == 2){
    //     //     isValidate = await trigger(["number","cvc","expDate","nameOnCard"])
    //     // }
    //     if (!isValidate){
    //         console.log("no pase")
    //         return
    //     }
    //     // if(isValidate && activeStep == 2){
            
    //     // }else{
    //         setActiveStep((prevActiveStep) => prevActiveStep + 1)
    //         clearErrors()
    //         console.log("si pase")
    //     // }
        
    // };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    React.useEffect(() => {
        if (isSubmitSuccessful) {
            reset()
            setActiveStep(0);
        }
    }, [formState, isSubmitSuccessful, reset])


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
                        {/* {activeStep === steps.length - 1 
                        ?   <Button type='submit'variant="outlined" >
                                Enviar
                            </Button>
                        :  <Button type="button" variant="outlined" onClick={handleNext}>
                                Siguiente
                            </Button>
                        } */}
                        {activeStep === 0 && <Button type="button" variant="outlined" onClick={handleNext}>
                                Siguiente
                            </Button>}
                        {activeStep === 1 && <Button type="button" variant="outlined" onClick={handleNext2}>
                                Siguiente
                            </Button>}
                        {activeStep === 2 && <Button type='submit'variant="outlined" onClick={handleNext3}>
                                Enviar
                            </Button>}
                    </Box>
                </form>
            </React.Fragment>
        </Box>
)

}

