import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ErrorMessage } from '@hookform/error-message';
import { CustomTextField } from "./Inputs/CustomTextField";
import { useFormContext } from "react-hook-form";


export default function DireccionEntrega() {
    const {control, formState:{errors} }  = useFormContext();

	return (

        <Container maxWidth="md">
            <Typography align="center" variant="h5">
                Ingresa tus datos de entrega.
            </Typography>

            <CustomTextField
                name="address"
                label="Dirección"
                type="text"
                control={control}
                defaultValue=""
            />
            <Typography variant="caption" color="red">
                <ErrorMessage errors={errors} name="address" />
            </Typography>

            <CustomTextField
                name="apart"
                label="Departamento, piso, etc"
                type="text"
                control={control}
                defaultValue=""
            />
            <Typography variant="caption" color="red">
                <ErrorMessage errors={errors} name="apart" />
            </Typography>

            <CustomTextField
                name="city"
                label="Ciudad"
                type="text"
                control={control}
                defaultValue=""
            />
            <Typography variant="caption" color="red">
                <ErrorMessage errors={errors} name="city" />
            </Typography>

            <CustomTextField
                name="province"
                label="Provincia"
                type="text"
                control={control}
                defaultValue=""
            />
            <Typography variant="caption" color="red">
                <ErrorMessage errors={errors} name="province" />
            </Typography>

            <CustomTextField
                name="cp"
                label="Código postal"
                type="text"
                control={control}
                defaultValue=""
            />
            <Typography variant="caption" color="red">
                <ErrorMessage errors={errors} name="cp" />
            </Typography>
        </Container>

	);
}