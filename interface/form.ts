export interface DataForm{
    datosPersonales: DatosPersonales
    datosDelPago: IDatosDelPago
    order: Order
}
export interface DatosForm{
    datosForm: PersonalData & DireccionEntrega & IDatosDelPago
    order: Order
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

export interface PersonalData{
    name: string
    lastName: string
    email: string
}

export interface DireccionEntrega{
    address1: string
    address2: string | null
    city: string
    state: string
    zipCode: string
}

export interface IDatosDelPago{
    number: string
    cvc: string
    expDate: string
    nameOnCard: string
    focus?: string
}

export interface Order{
    name: string,
    image: string,
    price: number
}