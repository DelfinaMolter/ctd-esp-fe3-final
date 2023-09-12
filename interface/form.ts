export interface DataForm{
    datosPersonales: DatosPersonales
    datosDelPago: DatosDelPago
}

export interface DatosPersonales{
    name: string
    lastName: string
    email: string
    address: DireccionEntrega
}

// export interface DataForm{
//     datosPersonales: DatosPersonales
//     direccionEntrega:DireccionEntrega
//     datosDelPago: DatosDelPago
// }

// export interface DatosPersonales{
//     name: string
//     lastName: string
//     email: string
// }

export interface DireccionEntrega{
    address1: string
    address2: string
    city: string
    state: string
    zipCode: string
}

export interface DatosDelPago{
    number: string
    cvc: string
    expDate: string
    nameOnCard: string
}

