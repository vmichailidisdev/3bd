import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { getSortedKeyboardData } from '../lib/keyboards';
import { Keyboard } from '../types/keyboard';
import Card from '../components/card';
import Link from 'next/link';

type Props = {
  allPostData: Keyboard[];
};

const Home: NextPage<Props> = ({ allPostData }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 lg:p-10'>
      {allPostData.map((keyboard: Keyboard, i: number) => (
        <div key={i}>
          <Link href={`/keyboards/${keyboard.id}`}>
            <a>
              <Card keyboardData={keyboard} type='large' />
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allPostData = await getSortedKeyboardData();
  return {
    props: {
      allPostData,
    },
  };
};

export default Home;
