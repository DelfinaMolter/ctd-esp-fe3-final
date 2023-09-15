import {  createContext, useContext, useReducer, useMemo, useState } from "react";
import { DataForm, DatosForm} from "interface/form";



const initialState = {
    datos:{
        datosForm: { },
        order: {}
    }
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
    
}

export const ContextoFormulario = createContext<DatosForm | undefined>(undefined)

// const formReducer = (state:DatosForm, action:any ) => {

//     switch (action.type) {
//         case 'ACTUALIZAR_DATOS_PERSONALES':
//             return {
//                 ...state,
//                 datosForm: { ...state.datosForm, ...action.payload }
//             }
//             break;

        
//         case 'ACTUALIZAR_ORDEN':
//             return {
//                 ...state,
//                 order: { ...state.order, ...action.payload }
//             }
//             break;
//         default :
//             return state
//     }

// }

export const FormularioProvider = ({ children }:any) => {
    // const [store, dispatch] = useReducer<any>(formReducer, initialState)
    const [datos, setdatos] = useState<DatosForm>(initialState.datos);
    const value = useMemo(
        () => ({
            datos,
            setdatos
        }),
        [datos]
    );

    return (
        < ContextoFormulario.Provider value={value}>
            {children}
        </ContextoFormulario.Provider >
    )
}

const useDatos = (): DatosForm => {
    const context = useContext(ContextoFormulario);
    if (!context) {
        throw new Error('useDatos must be used within a ContextoFormulario');
    }
    return context;
};

export default useDatos;

// export const useStore = () => useContext(ContextoFormulario)[0]
// export const useDispatch = () => useContext(ContextoFormulario)[1]