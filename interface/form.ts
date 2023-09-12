export interface DataForm{
    datosPersonales: DatosPersonales
    direccionEntrega: DireccionEntrega
    datosDelPago: DatosDelPago
}

export interface DatosPersonales{
    name: string
    lastName: string
    email: string
}

export interface DireccionEntrega{
    address: string
    apart: string
    city: string
    province: string
    cp: string
}

export interface DatosDelPago{
    cardNumber: number
    completeName: string
    expiredDate: string
    secureCode: number
}

