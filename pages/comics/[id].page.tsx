import * as React from 'react';
import Head from 'next/head'
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getComic, getComics } from 'dh-marvel/services/marvel/marvel.service';
import { Comic } from 'interface/comics';

interface Props{
    comic: Comic
}

const ComicPage: NextPage<Props> = ({comic}) => {
    
    return (
        <>
            <Head>
                <title>Comic</title>
                <meta name="description" content=""/>
                <link rel="icon" href="/favicon.png"/>
            </Head>

            <BodySingle title={"Comic"}>
                {comic.title}
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
