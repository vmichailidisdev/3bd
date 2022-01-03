import Head from 'next/head';
import Link from 'next/link';
import React, { createContext } from 'react';
import styles from '../styles/layout.module.css';
import Navbar from './navbar';
import { useRouter } from 'next/router';
// import homeStyles from '../styles/home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import {
  faYoutube,
  faTwitch,
  faFacebook,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

export const siteTitle = '3BD - ThreeBoard - Custom Keyboards';

export default function Layout({
  children = [],
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  function applyStyles() {
    switch (router.pathname) {
      case '/': {
        return {
          background: "url('/images/backgrounds/keyboard-mouse.jpg')",
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        };
      }
      default: {
        return {};
      }
    }
  }
  return (
    <div
      className={`flex flex-col w-full h-full min-h-screen relative text-zinc-800 dark:text-zinc-50 bg-neutral-50 dark:bg-zinc-800 overflow-y-auto ${styles.layout}`}
    >
      <Head>
        <title>{siteTitle}</title>
        <meta
          name='description'
          content="Gaming! Yep, it's all about gaming here. I'm a gamer, you're a gamer, we're all gamers. As gamers we demand tools tailored to our taste, perfected to dominate all opposition. I've therefore elected to specialize in building and modding keyboards to fit gamers. Specifically, taking mediocre and sub-par pre-builts, loving them, tweaking them, modding them until they\'ve reached master class."
        />
        <meta
          name='keywords'
          content='custom, keyboards, custom keyboards, 3bd, threeboard, rgb, mod, modded, modded keyboards'
        />
        {/* <meta property='og:type' content='3BD' />
        <meta property='og:url' content='' />
        <meta property='og:image' content='' /> */}
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header>
        <Navbar />
      </header>
      <div className='flex flex-col justify-between overflow-y-auto w-full h-full min-h-hscreen'>
        <div className={`flex flex-col grow p-5`} style={applyStyles()}>
          <main className='grow max-w-7xl md:px-0 mx-auto'>{children}</main>
        </div>
        <footer className='max-w-7xl px-5 md:px-0 w-full mx-auto my-5 flex flex-col sm:flex-row justify-between items-center gap-2'>
          <div className='flex gap-2'>
            <Link href='https://www.twitch.tv/bobaybutcher'>
              <a target={'_blank'}>
                <FontAwesomeIcon
                  icon={faTwitch}
                  className='text-2xl hover:scale-125 transition-transform duration-300 ease-out'
                />
              </a>
            </Link>
            <Link href='https://www.instagram.com/sofoklesmw/'>
              <a target={'_blank'}>
                <FontAwesomeIcon
                  icon={faInstagram}
                  className='text-2xl hover:scale-125 transition-transform duration-300 ease-out'
                />
              </a>
            </Link>
            <Link href='https://www.youtube.com/channel/UCQ6wERixrF3Rfo0ZWsSe8ig'>
              <a target={'_blank'}>
                <FontAwesomeIcon
                  icon={faYoutube}
                  className='text-2xl hover:scale-125 transition-transform duration-300 ease-out'
                />
              </a>
            </Link>
            <Link href='https://lnk.bio/3b'>
              <a target={'_blank'}>
                <FontAwesomeIcon
                  icon={faLink}
                  className='text-2xl hover:scale-125 transition-transform duration-300 ease-out'
                />
              </a>
            </Link>
          </div>
          <div>&copy; 2021 3BD - ThreeBoard</div>
        </footer>
      </div>
    </div>
  );
}
