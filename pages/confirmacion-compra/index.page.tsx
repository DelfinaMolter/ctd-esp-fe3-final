import type {  NextPage} from 'next'
import Head from 'next/head'
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import * as React from 'react';
import Typography from '@mui/material/Typography';
import LayoutCheckout from 'dh-marvel/components/layouts/layout-checkout';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';


const ConfirmacionPage:NextPage = () => {
	const router = useRouter();

	const backToHome = ()=>{
		Cookies.remove("accesoCompra");
		router.push("/");
	}
	
	React.useEffect(() => {
		if (!Cookies.get("accesoCompra")) {
			router.push("/");
		}
	}, [router]);
    
	const { comicName, comicPrice, comicImage, userAddress } = router.query;
    return (
		<>
			<Head>
				<title>Confirmacion de tu compra</title>
				<meta name="description" content="Aquí podras ver tu confirmación de tu compra."/>
				<link rel="icon" href="/favicon.png"/>
			</Head>


			<BodySingle title={"Que disfrutes tu compra"}>
				<Box  sx={{ margin: "20px auto 50px", maxWidth:"1500px"}}>
					<Card sx={{ maxWidth:"400px", height:"fit-content"}} >
						<CardMedia
							component="img"
							alt="Portada del comic"
							height="350"
							width= "auto"
							image={`${comicImage}`}
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="div">
								{comicName}
							</Typography>
							<Typography gutterBottom variant="h5" component="div" sx={{fontWeight:"bold"}}>
								Precio: ${comicPrice}
							</Typography>
							<Typography gutterBottom variant="h5" component="div" sx={{fontWeight:"bold"}}>
								Te llegara a : {userAddress}
							</Typography>
						</CardContent>
					</Card>
					<Button size="small" variant="outlined" sx={{m:"50px 0px 20px"}} onClick={()=>backToHome()}>
						Volver a la Home
					</Button>
				</Box>
			</BodySingle>
		</>
    )
}




(ConfirmacionPage as any).Layout = LayoutCheckout


export default ConfirmacionPage
