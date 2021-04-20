import Link from 'next/link';
import { ICharacter } from '../../types';

import s from './Film.module.scss';

type Props = {
  title: string;
  episodeID: number;
  openingCrawl: string;
  characters: Array<ICharacter>;
};

export function Film({
  title, episodeID, openingCrawl, characters,
}: Props): JSX.Element {
  return (
    <section className={s.film}>
      <h2 className={s.film__title}>
        Episode {episodeID}: {title}
      </h2>
      <div className={s.film__crawl}>
        {openingCrawl.split('\r\n\r\n').map((piece, i) => (
          <p key={i}>{piece}</p>
        ))}
      </div>
      <div className={s.film__characters}>
        <h3>Character</h3>
        {characters.map((character, i) => (
          <Link key={i} href={`/characters/${character.id}`}>{character.name}</Link>
        ))}
      </div>
    </section>
  );
}
