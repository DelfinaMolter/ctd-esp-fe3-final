import * as React from 'react';
import Head from 'next/head'
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getComic, getComics } from 'dh-marvel/services/marvel/marvel.service';
import { Comic, ComicNormalized } from 'interface/comics';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/router';

interface Props{
    comic: ComicNormalized
}

const ComicPage: NextPage<Props> = ({comic}) => {
    const router = useRouter();

    const handleClickCharacter = (url: string) =>{
        const id = getIdCaharacter(url)
        router.push(`/personajes/${id}`);
    };
    const getIdCaharacter = (url: string) =>{
        return url.slice((url.lastIndexOf('/'))+1)
    }
    const handleClickBuy = () =>{
        const id = String(comic.id)
        router.push(`/checkout/${id}`);
    }

    return (
        <>
            <Head>
                <title>Comic - {comic.title}</title>
                <meta name="description" content={`Aquí encontraras el detalle del comic ${comic.title}`}/>
                <link rel="icon" href="/favicon.png"/>
            </Head>

            <BodySingle title={"Detalle del Comic"}>
                <Card sx={{display: 'flex', flexDirection:{ xs: 'column', sm:'row'}, margin: "20px auto 50px", maxWidth:"1000px"}} >
                    <CardMedia
                        component="img"
                        alt="Portada del comic"
                        height="450"
                        width= "auto"
                        image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                            {comic.title}
                        </Typography>
                        <Typography gutterBottom variant="subtitle2" component="div" color="secondary" sx={{textDecoration:'line-through'}}>
                            Antes: ${comic.oldPrice}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            Precio: ${comic.price}
                        </Typography>
                        {comic.description === null || comic.description === ""  
                        ? ""
                        : <Typography gutterBottom variant="body1" component="div"><b>Descripción: </b> {comic.description}</Typography> 
                        }
                        {/* IDs de Prueba: con descripcion: 1749 ; sin descripcion: 1689 ; descripcion en null: 1220 */}
                        {comic.characters.items.length > 0  
                        ?  <Accordion>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header" sx={{ backgroundColor:'rgba(0, 0, 0, .03)'}}
                                >
                                <Typography>Personajes:</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <ul>
                                    {comic.characters.items.map((character, index)=>(
                                        <li key={index} style={{listStyleType:"none"}}>
                                            <Button sx={{ justifyContent: "flex-start"}} onClick={()=>handleClickCharacter(character.resourceURI)}>
                                                {character.name}
                                            </Button>
                                        </li>
                                    ))
                                    }

                                </ul>
                                </AccordionDetails>
                            </Accordion>
                        : "" 
                        }
                        {/* IDs de Prueba: con personajes: 1749 ; sin personajes: 82970  */}
                        <Button size="small" variant="outlined" disabled={comic.stock <= 0 } sx={{m:"50px 0px 20px"}} onClick={()=>handleClickBuy()}>
                            <ShoppingCartIcon/>
                            Comprar
                        </Button>
                    </CardContent>
                    {/* <CardActions sx={{}} >
                        <Button size="small" variant="outlined" disabled={comic.stock <= 0 } >
                            <ShoppingCartIcon/>
                            Comprar
                        </Button>
                    </CardActions> */}
                </Card>
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

export default ComicPage
