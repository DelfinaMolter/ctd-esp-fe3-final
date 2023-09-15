import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ErrorMessage } from '@hookform/error-message';
import { CustomTextField } from "./Inputs/CustomTextField";
import { useFormContext } from "react-hook-form";
import { IDatosDelPago } from "interface/form";
import Cards , {Focused} from 'react-credit-cards-2';
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useState, ChangeEvent, FocusEvent, } from 'react';
import FormGroup from '@mui/material/FormGroup';

export default function DatosDelPago() {
    const {control, formState:{errors}, trigger }  = useFormContext();

    
    const [state, setState] = useState<IDatosDelPago>({
        number: '',
        nameOnCard: '',
        expDate: '',
        cvc: '',
        focus: '',
    });

    const handleInputChange = (evt:ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evt.target;
        
        setState((prev) => ({ ...prev, [name]: value }));
    }

    const handleInputFocus = (evt: FocusEvent<HTMLInputElement>) => {
        setState((prev) => ({ ...prev, focus: evt.target.name }));
    }

	return (

        <Container maxWidth="md">
            <Typography align="center" variant="h5">
                Ingresa los datos de Pago.
            </Typography>

            <Box
                sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                my: "20px",
                }}
            >
                <Cards
                    number={state.number}
                    name={state.nameOnCard}
                    expiry={state.expDate}
                    cvc={state.cvc}
                    focused={state.focus as Focused}
                />
            </Box>

            <FormGroup sx={{ mb: 2 }}>
                <CustomTextField
                    name="number"
                    label="Número de tarjeta"
                    type="text"
                    control={control}
                    defaultValue=""
                    onChange = {(e) =>{
                        handleInputChange(e)
                        trigger("number")
                        } 
                    }
                    onFocus={handleInputFocus}
                />
                <Typography variant="caption" color="red">
                    <ErrorMessage errors={errors} name="number" />
                </Typography>
            </FormGroup>

            <FormGroup sx={{ mb: 2 }}>
                <CustomTextField
                    name="nameOnCard"
                    label="Nombre como aparece en la tarjeta"
                    type="text"
                    control={control}
                    defaultValue=""
                    onChange = { (e) =>{
                        handleInputChange(e)
                        trigger("nameOnCard")
                        } 
                    }
                    onFocus={handleInputFocus}
                />
                <Typography variant="caption" color="red">
                    <ErrorMessage errors={errors} name="nameOnCard" />
                </Typography>
            </FormGroup>

            <FormGroup sx={{ mb: 2 }}>
                <CustomTextField
                    name="expDate"
                    label="Fecha de expiración"
                    type="text"
                    control={control}
                    defaultValue=""
                    onChange = { (e) =>{
                        handleInputChange(e)
                        trigger("expDate")
                        } 
                    }
                    onFocus={handleInputFocus}
                />
                <Typography variant="caption" color="red">
                    <ErrorMessage errors={errors} name="expDate" />
                </Typography>
            </FormGroup>

            <FormGroup sx={{ mb: 2 }}>
                <CustomTextField
                    name="cvc"
                    label="Código de segurirar"
                    type="password"
                    control={control}
                    defaultValue=""
                    onChange = { (e) =>{
                        handleInputChange(e)
                        trigger("cvc")
                        } 
                    }
                    onFocus={handleInputFocus}
                />
                <Typography variant="caption" color="red">
                    <ErrorMessage errors={errors} name="cvc" />
                </Typography>
            </FormGroup>

        </Container>

	);
}