import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ErrorMessage } from '@hookform/error-message';
import { CustomTextField } from "./Inputs/CustomTextField";
import { useFormContext } from "react-hook-form";

export default function DatosDelPago() {
    const {control, formState:{errors} }  = useFormContext();

	return (

        <Container maxWidth="md">
            <Typography align="center" variant="h5">
                Ingresa los datos de Pago.
            </Typography>

            <CustomTextField
                name="number"
                label="Número de tarjeta"
                type="number"
                control={control}
                defaultValue=""
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