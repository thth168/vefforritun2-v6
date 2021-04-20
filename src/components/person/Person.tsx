import Link from 'next/link';
import { ICharacter } from '../../types';
import s from './Person.module.scss';

type Props = {
  person: ICharacter;
};

export function Person({ person }: Props): JSX.Element {
  return (
    <div className={s.person}>
      <h1>{person.name}</h1>
      <h2>Birth year:</h2>
      <p>{person.birthYear ?? 'Unknown'}</p>
      <h2>Eye color:</h2>
      <p>{person.eyeColor ?? 'Unknown'}</p>
      <h2>Hair color:</h2>
      <p>{person.hairColor ?? 'Unknown'}</p>
      <h2>Height:</h2>
      <p>{`${person.height} cm` ?? 'Unknown'}</p>
      <h2>Mass:</h2>
      <p>{`${person.mass} kg` ?? 'Unknown'}</p>
      <Link href="/characters">Back to characters</Link>
    </div>
  );
}
