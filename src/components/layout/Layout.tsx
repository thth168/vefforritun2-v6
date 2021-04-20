import Link from 'next/link';

import s from './Layout.module.scss';

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props): JSX.Element {
  return (
    <div className={s.layout}>
      <header className={s.layout__header}>
        <Link href="/">Films</Link>
        <Link href="/characters">Characters</Link>
      </header>
      <main>{children}</main>
    </div>
  );
}
