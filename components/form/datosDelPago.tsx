import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ErrorMessage } from '@hookform/error-message';
import { CustomTextField } from "./Inputs/CustomTextField";
import { useFormContext } from "react-hook-form";
// import { IDatosDelPago } from "interface/form";
// import Cards, { Focused } from 'react-credit-cards-2';
// import { useState, ChangeEvent, FocusEvent, } from 'react';

export default function DatosDelPago() {
    const {control, formState:{errors} }  = useFormContext();

    
    // const [state, setState] = useState<IDatosDelPago>({
    //     number: '',
    //     expDate: '',
    //     cvc: '',
    //     nameOnCard: '',
    //     focus: '',
    // });

    // const handleInputChange = (evt:ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = evt.target;
        
    //     setState((prev) => ({ ...prev, [name]: value }));
    // }

    // const handleInputFocus = (evt: FocusEvent<HTMLInputElement>) => {
    //     setState((prev) => ({ ...prev, focus: evt.target.name }));
    // }

	return (

        <Container maxWidth="md">
            <Typography align="center" variant="h5">
                Ingresa los datos de Pago.
            </Typography>

            {/* <Cards
                number={state.number}
                expiry={state.expDate}
                cvc={state.cvc}
                name={state.nameOnCard}
                focused={state.focus as Focused}
            /> */}

            <CustomTextField
                name="number"
                label="Número de tarjeta"
                type="text"
                control={control}
                defaultValue=""
                // onChange = { (e:any) =>{
                //     handleInputChange(e)
                //     } 
                // }
                // onFocus={handleInputFocus}

            />
            <Typography variant="caption" color="red">
                <ErrorMessage errors={errors} name="number" />
            </Typography>

            <CustomTextField
                name="cvc"
                label="Nombre como aparece en la tarjeta"
                type="text"
                control={control}
                defaultValue=""
                
            />
            <Typography variant="caption" color="red">
                <ErrorMessage errors={errors} name="cvc" />
            </Typography>

            <CustomTextField
                name="expDate"
                label="Fecha de expiración"
                type="text"
                control={control}
                defaultValue=""
            />
            <Typography variant="caption" color="red">
                <ErrorMessage errors={errors} name="expDate" />
            </Typography>

            <CustomTextField
                name="nameOnCard"
                label="Código de segurirar"
                type="password"
                control={control}
                defaultValue=""
            />
            <Typography variant="caption" color="red">
                <ErrorMessage errors={errors} name="nameOnCard" />
            </Typography>

        </Container>

	);
}