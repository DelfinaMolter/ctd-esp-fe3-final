import * as yup from "yup";

// Creamos el schema
export const schema = yup.object({
  name: yup.string().required("Este campo es requerido").min(2, "Mínimo 2 caracteres").max(15, "Máximo 15 caracteres"),
  lastName: yup.string().required("Este campo es requerido").min(2, "Mínimo 2 caracteres").max(15, "Máximo 10 caracteres"),
  email: yup.string().required("Este campo es requerido").email("El correo no es válido")
})