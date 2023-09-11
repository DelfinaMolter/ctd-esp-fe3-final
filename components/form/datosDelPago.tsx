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
                name="cardNumber"
                label="Número de tarjeta"
                type="number"
                control={control}
                defaultValue=""
            />
            <Typography variant="caption" color="red">
                <ErrorMessage errors={errors} name="cardNumber" />
            </Typography>

            <CustomTextField
                name="completeName"
                label="Nombre como aparece en la tarjeta"
                type="text"
                control={control}
                defaultValue=""
            />
            <Typography variant="caption" color="red">
                <ErrorMessage errors={errors} name="completeName" />
            </Typography>

            <CustomTextField
                name="expiredDate"
                label="Fecha de expiración"
                type="date"
                control={control}
                defaultValue=""
            />
            <Typography variant="caption" color="red">
                <ErrorMessage errors={errors} name="expiredDate" />
            </Typography>

            <CustomTextField
                name="secureCode"
                label="Código de segurirar"
                type="password"
                control={control}
                defaultValue=""
            />
            <Typography variant="caption" color="red">
                <ErrorMessage errors={errors} name="secureCode" />
            </Typography>

        </Container>

	);
}