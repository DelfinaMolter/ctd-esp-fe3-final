import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ErrorMessage } from '@hookform/error-message';
import { CustomTextField } from "./Inputs/CustomTextField";
import { useFormContext } from "react-hook-form";

export default function DatosPersonales() {

    const {control, formState:{errors} }  = useFormContext();

	return (

        <Container maxWidth="md">
            <Typography align="center" variant="h5">
                Ingresa tus datos personales.
            </Typography>

            <CustomTextField
                name="name"
                label="Nombre"
                type="text"
                control={control}
                defaultValue=""
            />
            <Typography variant="caption" color="red">
                <ErrorMessage errors={errors} name="name" />
            </Typography>

            <CustomTextField
                name="lastName"
                label="Apellido"
                type="text"
                control={control}
                defaultValue=""
            />
            <Typography variant="caption" color="red">
                <ErrorMessage errors={errors} name="lastName" />
            </Typography>

            <CustomTextField
                name="email"
                label="E-Mail"
                type="email"
                control={control}
                defaultValue=""
            />
            <Typography variant="caption" color="red">
                <ErrorMessage errors={errors} name="email" />
            </Typography>
        </Container>

	);
}
