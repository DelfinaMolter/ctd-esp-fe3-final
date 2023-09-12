import * as yup from "yup";

// Creamos el schema
export const schema = yup.object({
  name: yup.string().required("Este campo es obligatorio").min(2, "Mínimo 2 caracteres").max(15, "Máximo 15 caracteres"),
  lastName: yup.string().required("Este campo es obligatorio").min(2, "Mínimo 2 caracteres").max(15, "Máximo 10 caracteres"),
  email: yup.string().required("Este campo es obligatorio").email("El correo no es válido"),
  address1:  yup.string().required("Este campo es obligatorio").min(2, "Mínimo 2 caracteres"),
  address2:  yup.string().notRequired(),
  city:  yup.string().required("Este campo es obligatorio").min(2, "Mínimo 2 caracteres"),
  state:  yup.string().required("Este campo es obligatorio").min(2, "Mínimo 2 caracteres"),
  zipCode:  yup.string().required("Este campo es obligatorio").min(2, "Mínimo 2 caracteres"),
  number: yup.string().required("Este campo es obligatorio").min(16, "Mínimo 2 caracteres").max(16, "Máximo 15 caracteres"),
  cvc:  yup.string().required("Este campo es obligatorio"),
  expDate:  yup.string().required("Este campo es obligatorio"),
  nameOnCard: yup.string().required("Este campo es obligatorio"),
})