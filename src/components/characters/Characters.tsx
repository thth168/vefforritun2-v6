import React, { useState } from 'react';

import Link from 'next/link';

import s from './Characters.module.scss';
import { Button } from '../button/Button';
import { ICharacter, IPeopleResponse } from '../../types';

type Props = {
  peopleResponse: IPeopleResponse;
};

/**
 * Hjálpar týpa ef við erum að filtera burt hugsanleg null gildi:
 *
 * const items: T = itemsWithPossiblyNull
 *  .map((item) => {
 *    if (!item) {
 *      return null;
 *    }
 *    return item;
 *  })
 *  .filter((Boolean as unknown) as ExcludesFalse);
 * items verður Array<T> en ekki Array<T | null>
 */
type ExcludesFalse = <T>(x: T | null | undefined | false) => x is T;

function createCharacterArray(peopleResponse: IPeopleResponse): Array<ICharacter> {
  const items: Array<ICharacter> = peopleResponse?.allPeople?.people ?? [];
  return items.map((item) => {
    if (!item) {
      return null;
    }
    return item;
  }).filter((Boolean as unknown) as ExcludesFalse);
}

export function Characters({ peopleResponse }: Props): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);

  const [characters, setCharacters] = useState<Array<ICharacter>>(
    createCharacterArray(peopleResponse),
  );

  const [nextPage, setNextPage] = useState<string | null>(
    peopleResponse?.allPeople?.pageInfo?.hasNextPage
      ? peopleResponse?.allPeople?.pageInfo.endCursor ?? null
      : null,
  );

  const fetchMore = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(`/api/characters?after=${nextPage}`);
      if (!response.ok) {
        throw new Error(`Error fetching from local api, non 200 status: ${response.status}`);
      }
      const responseJson = (await response.json()) as IPeopleResponse;
      const newCharacters = createCharacterArray(responseJson);
      setCharacters(characters.concat(newCharacters));
      setNextPage(
        responseJson?.allPeople?.pageInfo?.hasNextPage
          ? responseJson?.allPeople?.pageInfo.endCursor ?? null
          : null,
      );
    } catch (e) {
      console.error('Error fetching more characters');
    }
    setLoading(false);
  };

  return (
    <section className={s.characters}>
      <ul className={s.characters__list}>
        {characters.map((char, i) => (
          <li key={i}>
            <Link href={`/characters/${char.id}`}>{char.name}</Link>
          </li>
        ))}
      </ul>
      { nextPage && (
        <Button disabled={loading} onClick={fetchMore}>Fetch more</Button>
      )}
    </section>
  );
}
