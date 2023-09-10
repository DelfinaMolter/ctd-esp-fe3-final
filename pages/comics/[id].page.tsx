import * as React from 'react';
import Head from 'next/head'
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getComic, getComics } from 'dh-marvel/services/marvel/marvel.service';
import { Comic, ComicNormalized } from 'interface/comics';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';
import { List } from '@mui/icons-material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

interface Props{
    comic: ComicNormalized
}

const ComicPage: NextPage<Props> = ({comic}) => {
    
    return (
        <>
            <Head>
                <title>Comic - {comic.title}</title>
                <meta name="description" content={`Aquí encontraras el detalle del comic ${comic.title}`}/>
                <link rel="icon" href="/favicon.png"/>
            </Head>

            <BodySingle title={"Detalle del Comic"}>
                <Card sx={{height: "100%" }} >
                    <CardMedia
                        component="img"
                        alt="Portada del comic"
                        height="250"
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
                        {/* con descripcion: 1749 ; sin descripcion: 1689 ; descripcion en null: 1220 */}
                        {comic.characters.items.length > 0  
                        ?  <Accordion>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                <Typography>Personajes:</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <nav aria-label="secondary mailbox folders">
                                <List>
                                {comic.characters.items.map((character, index)=>(
                                    // <Button key={index}>
                                    //     {character.name}
                                    // </Button>
                                    <ListItem disablePadding key={index}>
                                        <ListItemButton>
                                            <ListItemText primary={character.name} />
                                        </ListItemButton>
                                    </ListItem>
                                ))
                                }
                                </List>
                                </nav>
                                </AccordionDetails>
                            </Accordion>
                        : "" 
                        }
                        {/* con descripcion: 1749 ; sin descripcion: 1689 ; descripcion en null: 1220 */}
                    </CardContent>
                    <CardActions sx={{}} >
                        <Button size="small" variant="outlined" disabled={comic.stock <= 0 } >
                            <ShoppingCartIcon/>
                            Comprar
                        </Button>
                    </CardActions>
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
	
	const id = params?.id;

	try {
		const comic = await getComic(Number(id))
		return {
			props: {
				comic,
			},
		};
	} catch (error) {
		console.error('No se pudo obtener el personaje', error);
		return {
			props: {
				comic: {},
			}
		}
	}
	
};

export default ComicPage
