import type {GetServerSideProps, NextPage} from 'next'
import Head from 'next/head'
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { getComics } from 'dh-marvel/services/marvel/marvel.service';
import { Comics } from 'interface/comics';
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
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface Props{
    comics:Comics;
    page: number 
}

const LIMIT = 12;

const Index: NextPage<Props> = ({comics}) => {
    const router = useRouter();
    const [page, setPage] = React.useState(1);

    const handleClickDetail = (id: string) =>{
        router.push(`/comics/${id}`);
    };
    const handleClickBuy = (id: string) =>{
        router.push(`/checkout/${id}`);
    }

    const handlChangesPage= (event: React.ChangeEvent<unknown>, value: number)=>{
        setPage(value)
        router.push(`/?page=${value}`);
    }


    return (
        <>
            <Head>
                <title>Comics de Marvel</title>
                <meta name="description" content="Todos los comics de marvel"/>
                <link rel="icon" href="/favicon.png"/>
            </Head>

            <BodySingle title={"Comics de Marvel"}>
                <Typography gutterBottom variant="h6" component="div" align="center">
                Encontrá tu Comics Favorito.
                </Typography>

                <Stack spacing={2} sx={{mx:"auto"}}>
                    <Pagination count={Math.ceil(comics.data.total/ LIMIT)} showFirstButton showLastButton onChange={handlChangesPage}/>
                </Stack>
                <Box sx={{ flexGrow: 1 , m:'20px auto 50px'}}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, xl: 12 }}>
                        {comics.data.results.map((comic, index) => (
                            <Grid xs={4} sm={4} md={4} xl={3} key={comic.id}>
                            <Card sx={{ height: "100%", display:"flex", flexDirection:"column" }} >
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
                                <CardActions sx={{justifyContent:'space-between', mt: "auto", mb:"5px", mx:"5px" }} >
                                    <Button size="small" variant="outlined" onClick={()=>handleClickBuy(String(comic.id))}>
                                        <ShoppingCartIcon  fontSize="small"/>
                                        <Typography variant="body2" sx={{mt:'5px', ml:'5px'}}>
                                        Comprar
                                        </Typography>
                                    </Button>
                                    <Button size="small" variant="outlined" onClick={()=>handleClickDetail(String(comic.id))} sx={{pt:'5px'}}>
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

export const getServerSideProps:GetServerSideProps = async ({req, res, query}) => {
    const page:any = query.page || 1
    const offset = (page -1 ) * LIMIT
    const comics = await getComics(offset,LIMIT);
    
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
