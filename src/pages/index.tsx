import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

import { Film } from '../components/film/Film';

import { Layout } from '../components/layout/Layout';
import { characterFragment } from '../graphql/characterFragment';
import { fetchSwapi } from '../lib/swapi';
import { IFilm, IFilmResponse } from '../types';

export type PageProps = {
  films: Array<IFilm> | null;
};

export default function PageComponent(
  data: InferGetServerSidePropsType<typeof getServerSideProps>,
): JSX.Element {
  const { films } = data;

  if (!films) {
    return (<p>error</p>);
  }

  return (
    <Layout>
      <Head>
        <title>Star Wars films</title>
      </Head>
      <h1>Star Wars films</h1>
      {films.map((film, i) => (
        <Film
          key={i}
          title={film.title}
          episodeID={film.episodeID}
          openingCrawl={film.openingCrawl}
          characters={film.characterConnection.characters}
        />
      ))}
    </Layout>
  );
}

const query = `
  query ($after: String = "") {
    allFilms(after: $after) {
      films {
        title
        episodeID
        openingCrawl
        characterConnection(after: $after) {
          characters {
            ...character
          }
        }
      }
    }
  }
  ${characterFragment}
`;

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const data = await fetchSwapi<IFilmResponse>(query);
  const films = data?.allFilms?.films ?? null;
  return {
    props: {
      films,
    },
  };
};
