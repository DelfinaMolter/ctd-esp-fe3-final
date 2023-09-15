import type {  NextPage} from 'next'
import Head from 'next/head'
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import * as React from 'react';
import Typography from '@mui/material/Typography';
import LayoutCheckout from 'dh-marvel/components/layouts/layout-checkout';


const ConfirmacionPage:NextPage = () => {
	// const router = useRouter();

	// useEffect(() => {
	// 	if(comic.stock == 0){
	// 		router.push(`/`);
	// 	}
	// },[]);
    
    return (
		<>
			<Head>
				<title>Confirmacion de tu compra</title>
				<meta name="description" content="Aquí podras ver tu confirmación de tu compra."/>
				<link rel="icon" href="/favicon.png"/>
			</Head>


			<BodySingle title={"Que disfrutes tu compra"}>
			{/* {comic.stock == 0
				?<Typography gutterBottom variant="h4" component="div" align="center"> No hay stock de este Comic.</Typography>
				:
				<> */}
					<Typography variant="body1" component="div" align="center">
                        datos
                    </Typography>
					
				{/* </>
				} */}
			</BodySingle>
		</>
    )
}




(ConfirmacionPage as any).Layout = LayoutCheckout


export default ConfirmacionPage
