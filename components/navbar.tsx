import Image from 'next/image';
import Logo from '@/components/logo';
import Theme from './theme';
import Search from './search';
import styles from '@/styles/navbar.module.css';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div
      className={`text-zinc-800 bg-zinc-50 dark:text-neutral-50 dark:bg-zinc-800 ${styles.navbar}`}
    >
      <nav className='flex justify-between max-w-7xl mx-auto'>
        <Link href='/'>
          <a>
            <div className='w-32 md:w-40 lg:w-48 xl:w-60 flex flex-col items-center'>
              <Logo className='h-full w-full fill-zinc-800 dark:fill-zinc-50' />
              <span
                className={`uppercase italic whitespace-nowrap text-[0.5rem] ${styles['logo-description']}`}
              >
                You were born to be a champion
              </span>
            </div>
          </a>
        </Link>
        <div className='flex gap-2 items-center'>
          <Search />
          <Theme />
        </div>
      </nav>
    </div>
  );
}
