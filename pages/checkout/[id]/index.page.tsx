import type { GetStaticPaths, GetStaticProps, NextPage} from 'next'
import Head from 'next/head'
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { schema } from "rules";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm} from "react-hook-form";
import * as yup from "yup";
import Forms from 'dh-marvel/components/form/forms';
import { getComic, getComics } from 'dh-marvel/services/marvel/marvel.service';
import { Comic, ComicNormalized } from 'interface/comics';
import LayoutCheckout from 'dh-marvel/components/layouts/layout-checkout';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box } from '@mui/material';

interface Props{
    comic: ComicNormalized
}


const CheckoutPage:NextPage<Props> = ({comic}) => {
	const router = useRouter();

	type DataForms = yup.InferType<typeof schema>;

	const method = useForm<DataForms>({
		resolver: yupResolver(schema),
		defaultValues: {},
	});

	useEffect(() => {
		if(comic.stock == 0){
			router.push(`/comics/${router.query.id}`);
		}
	},[]);
    
    return (
		<>
			<Head>
				<title>Compra</title>
				<meta name="description" content="Estas en proceso de compra."/>
				<link rel="icon" href="/favicon.png"/>
			</Head>


			<BodySingle title={"Proceso de Compra"}>
			{comic.stock == 0
				?<Typography gutterBottom variant="h4" component="div" align="center"> No hay stock de este Comic.</Typography>
				:
				<>
					<Typography gutterBottom variant="h6" component="div" align="center">
					Estas a pocos pasos de tener tu comic.
					</Typography>
					{/* <Typography variant="body1" component="div" align="center">{comic.title}</Typography> */}
					<Box  sx={{display: 'flex', flexDirection:{ xs: 'column', md:'row'}, gap:"30px", margin: "20px auto 50px", maxWidth:"1500px"}}>
						<Card sx={{ maxWidth:"400px", height:"fit-content"}} >
							<CardMedia
								component="img"
								alt="Portada del comic"
								height="350"
								width= "auto"
								image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
							/>
							<CardContent>
								<Typography gutterBottom variant="h5" component="div">
									{comic.title}
								</Typography>
								<Typography gutterBottom variant="h5" component="div" sx={{fontWeight:"bold"}}>
									Precio: ${comic.price}
								</Typography>
							</CardContent>
						</Card>
						<FormProvider {...method}>
							<Forms comic={comic}/>
						</FormProvider>
					</Box>
				</>
				}
			</BodySingle>
		</>
    )
}

export const getStaticPaths:GetStaticPaths = async () => {
    const comics = await getComics()

	const paths = comics.data.results.flatMap((comic: Comic) =>
    ({ params: { id: String(comic.id) }})
	);

	return {
		paths,
		fallback: false
	}

}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	
	const id = Number(params?.id);

	try {
		const comic = await getComic(id)
		return {
			props: {
				comic,
			},
		};
	} catch (error) {
		console.error('No se pudo obtener el comic', error);
		return {
			props: {
				comic: {},
			}
		}
	}
	
};

(CheckoutPage as any).Layout = LayoutCheckout


export default CheckoutPage
