import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ErrorMessage } from '@hookform/error-message';
import { CustomTextField } from "./Inputs/CustomTextField";
import { useFormContext } from "react-hook-form";
import FormGroup from '@mui/material/FormGroup';

export default function DatosPersonales() {

    const {control, formState:{errors}, trigger }  = useFormContext();

	return (

        <Container maxWidth="md">
            <Typography align="center" variant="h5">
                Ingresa tus datos personales.
            </Typography>

            <FormGroup sx={{ mb: 2 }}>
                <CustomTextField
                    name="name"
                    label="Nombre"
                    type="text"
                    control={control}
                    defaultValue=""
                    onChange={()=>{
                        trigger("name")
                    }}
                />
                <Typography variant="caption" color="red" >
                    <ErrorMessage errors={errors} name="name" />
                </Typography>
            </FormGroup>

            <FormGroup sx={{ mb: 2 }}>
                <CustomTextField
                    name="lastName"
                    label="Apellido"
                    type="text"
                    control={control}
                    defaultValue=""
                    onChange={()=>{
                        trigger("lastName")
                    }}
                />
                <Typography variant="caption" color="red">
                    <ErrorMessage errors={errors} name="lastName" />
                </Typography>
            </FormGroup>

            <FormGroup sx={{ mb: 2 }}>
                <CustomTextField
                    name="email"
                    label="E-Mail"
                    type="email"
                    control={control}
                    defaultValue=""
                    onChange={()=>{
                        trigger("email")
                    }}
                />
                <Typography variant="caption" color="red">
                    <ErrorMessage errors={errors} name="email" />
                </Typography>
            </FormGroup>

        </Container>

	);
}
