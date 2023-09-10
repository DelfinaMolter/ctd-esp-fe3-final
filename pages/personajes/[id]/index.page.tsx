import * as React from 'react';
import Head from 'next/head'
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
// import { getCharacter, getCharacters} from 'dh-marvel/services/marvel/marvel.service';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Personaje } from 'interface/personajes';


// interface Props{
//     personaje: Personaje
// }

// const CharacterPage: NextPage<Props> = ({personaje}) => {
//     console.log(personaje)
//     return (
//         <>

//             <Head>
//                 <title>Personaje - {personaje.name}</title>
//                 <meta name="description" content={`Aquí encontraras el detalle del personaje ${personaje.name}`}/>
//                 <link rel="icon" href="/favicon.png"/>
//             </Head>

//             <BodySingle title={"Detalle del Personaje"}>
//                 <Card sx={{display: 'flex', flexDirection:{ xs: 'column', sm:'row'}, margin: "20px auto 50px", maxWidth:"1000px"}} >
//                     <CardMedia
//                         component="img"
//                         alt="Imagen del Personaje"
//                         height="450"
//                         width= "auto"
//                         image={`${personaje.thumbnail.path}.${personaje.thumbnail.extension}`}
//                     />
//                     <CardContent>
//                         <Typography gutterBottom variant="h4" component="div">
//                             {personaje.name}
//                         </Typography>
                        
//                         {personaje.description === null || personaje.description === ""  
//                         ? ""
//                         : <Typography gutterBottom variant="body1" component="div"><b>Descripción: </b> {personaje.description}</Typography> 
//                         } 
//                     </CardContent>

//                 </Card>
//             </BodySingle> 
//         </>
//     )
// }

const CharacterPage: NextPage = () => {

    return (
        <>

            <Head>
                <title>Personaje</title>
                <meta name="description" content="Aquí encontraras el detalle del personaje "/>
                <link rel="icon" href="/favicon.png"/>
            </Head>

            <BodySingle title={"Detalle del Personaje"}>
            </BodySingle> 
        </>
    )
}
// interface Props{
//         personaje: Personaje
// }

// const CharacterPage: NextPage<Props> = ({personaje})=> {
// console.log(personaje)
//     return (
//         <>

//             <Head>
//                 <title>Personaje</title>
//                 <meta name="description" content="Aquí encontraras el detalle del personaje "/>
//                 <link rel="icon" href="/favicon.png"/>
//             </Head>

//             <BodySingle title={"Detalle del Personaje"}>
//             </BodySingle> 
//         </>
//     )
// }

// export const getStaticPaths:GetStaticPaths = async () => {
//     const personajes = await getCharacters()
//     console.log('personajes: ' + personajes)
// 	const paths = personajes.data.results.flatMap((personaje: Personaje) =>
//     ({ params: { id: String(personaje.id) }})
// 	);

// 	return {
// 		paths,
// 		fallback: false
// 	}

// }

// export const getStaticProps: GetStaticProps = async ({ params }) => {
	
// 	const id = params?.id;

// 	try {
// 		const personaje = await getCharacter(Number(id))
// 		return {
// 			props: {
// 				personaje,
// 			},
// 		};
// 	} catch (error) {
// 		console.error('No se pudo obtener el personaje', error);
// 		return {
// 			props: {
// 				personaje: {},
// 			}
// 		}
// 	}
	
// };

export default CharacterPage
