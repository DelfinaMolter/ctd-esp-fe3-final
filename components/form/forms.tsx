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
import { ComicNormalized } from 'interface/comics';
import { useRouter } from 'next/router';
import Cookies from "js-cookie";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';


const steps = ['Datos Personales', 'Dirección de entrega', 'Datos del pago'];

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref,) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Props{
    comic: ComicNormalized
}

export default function Forms({comic}:Props) {
    const router = useRouter();

    const {handleSubmit, trigger} = useFormContext();

    const [activeStep, setActiveStep] = React.useState(0);
    const [errorMsg, setErrorMsg] = React.useState("");

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
        return;
        }

        setErrorMsg("");
    };

    const normalizedData= (data:any) =>{
        return {
            customer: {
                name: data.name,
                lastname: data.lastName,
                email: data.email,
                address: {
                    address2: data.address1 || 'invalid',
                    city: data.city,
                    state: data.state,
                    zipCode: data.zipCode
                },
            },
            card: {
                number: data.number,
                cvc: data.cvc,
                expDate: data.expDate,
                nameOnCard: data.nameOnCard,
            },
            order: {
                name: comic.title,
                image: comic.thumbnail.path.concat(`.${comic.thumbnail.extension}`),
                price: comic.price,
            },
        }
    }

    const onSubmit = async (data:any) => {
        const dataNormalizada = normalizedData(data)
        const response = await fetch('/api/checkout', {
            method: 'POST',
            body: JSON.stringify(dataNormalizada),
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
            }
        })
        const responseApi = await response.json()
        if(response.ok){
            Cookies.set("accesoCompra", "true");
            router.push({
                pathname: "/confirmacion-compra",
                query: {
                    comicName: responseApi.data.order.name,
                    comicImage: responseApi.data.order.image,
                    comicPrice: responseApi.data.order.price,
                    userAddress: responseApi.data.customer.address.address2,
                },
            },
                "/confirmacion-compra"
            );
        }else{
            setErrorMsg(responseApi.message)
        }
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

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
            <Snackbar open={!!errorMsg} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {errorMsg}
                </Alert>
            </Snackbar>
        </Box>
)

}

