import type {GetServerSideProps, NextPage} from 'next'
import Head from 'next/head'
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { getComics } from 'dh-marvel/services/marvel/marvel.service';
import { Comic, Comics } from 'interface/comics';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRouter } from 'next/router';

interface Props{
    comics:Comics;
}

const Index: NextPage<Props> = ({comics}) => {
    const router = useRouter();

    const handleClickDetail = (id: string) =>{
        router.push(`/comics/${id}`);
    };

    return (
        <>
            <Head>
                <title>Comics de Marvel</title>
                <meta name="description" content="Todos los comics de marvel"/>
                <link rel="icon" href="/favicon.png"/>
            </Head>

            <BodySingle title={"Comics de Marvel"}>
                <h3>Encontrá tu Comics Favorito.</h3>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, xl: 12 }}>
                        {comics.data.results.map((comic, index) => (
                            <Grid xs={4} sm={4} md={4} xl={3} key={comic.id}>
                            <Card sx={{ height: "100%"}} >
                                <CardMedia
                                    component="img"
                                    alt="Portada del comic"
                                    height="250"
                                    image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    {comic.title}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{}} >
                                    <Button size="small" variant="outlined">
                                        <ShoppingCartIcon/>
                                        Comprar
                                    </Button>
                                    <Button size="small" variant="outlined" onClick={()=>handleClickDetail(String(comic.id))} >
                                        Ver detalle
                                    </Button>
                                </CardActions>
                            </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </BodySingle>
        </>
    )
}

export const getServerSideProps:GetServerSideProps = async ({req, res}) => {
    const comics = await getComics(0,12);
    
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate'
    )
    
    return {
        props: {
            comics,
        },
    };
};

export default Index
