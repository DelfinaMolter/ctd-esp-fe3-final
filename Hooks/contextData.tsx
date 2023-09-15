import {  createContext, useContext, useReducer } from "react";
import { DataForm, DatosForm} from "interface/form";

export const ContextoFormulario = createContext<any>(undefined)

const initialState = {
    datosForm: { },
    // datosPersonales: {
    //     name: null,
    //     lastname: null,
    //     email: null,
    //     address: {
    //         address1: null,
    //         address2: null,
    //         city: null,
    //         state: null,
    //         zipCode: null
    //     }
    // },
    // datosDelPago: {
    //     number: null,
    //     cvc: null,
    //     expDate: null,
    //     nameOnCard: null
    // },
    order: {
        name: null,
        image: null,
        price: null
    }
}

const formReducer = (state:DatosForm, action:any ) => {

    switch (action.type) {
        case 'ACTUALIZAR_DATOS_PERSONALES':
            return {
                ...state,
                datosForm: { ...state.datosForm, ...action.payload }
            }
            break;

        
        case 'ACTUALIZAR_ORDEN':
            return {
                ...state,
                order: { ...state.order, ...action.payload }
            }
            break;
        default :
            return state
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