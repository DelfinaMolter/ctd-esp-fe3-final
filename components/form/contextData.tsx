import {  createContext, useContext, useReducer } from "react";
import { DataForm} from "interface/form";

export const ContextoFormulario = createContext<any>(undefined)

const initialState = {
    datosPersonales: {
        address: null
    },
    datosDelPago: null
}

const formReducer = (state:DataForm, action:any ) => {

    switch (action.type) {
        case 'ACTUALIZAR_DATOS_PERSONALES':
            return {
                ...state,
                datosPersonales: { ...state.datosPersonales, ...action.payload }
            }
            break;

        case 'ACTUALIZAR_DIRECCION_ENTREGA':
            return {
                ...state,
                datosPersonales: {
                    ...state.datosPersonales,
                    direccionEntrega:{
                        ...state.datosPersonales.address, ...action.payload
                    }
                }
            }
            break;
        case 'ACTUALIZAR_DATOS_DEL_PAGO':
            return {
                ...state,
                datosDelPago: { ...state.datosDelPago, ...action.payload }
            }
            break;
    }

}

export const FormularioProvider = ({ children }:any) => {
    const [store, dispatch] = useReducer<any>(formReducer, initialState)

    return (
        < ContextoFormulario.Provider value={[store, dispatch]}>
            {children}
        </ContextoFormulario.Provider >
    )
}

export const useStore = () => useContext(ContextoFormulario)[0]
export const useDispatch = () => useContext(ContextoFormulario)[1]