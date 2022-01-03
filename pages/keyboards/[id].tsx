import { Keyboard } from '../../types/keyboard';
import Image from 'next/image';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getAllKeyboardsIds, getKeyboardData } from '../../lib/keyboards';
import Date from 'components/date';
import { KeyboardImage } from '../../types/keyboard';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function KeyboardDetails({
  keyboardData: { id, name, date, images, contentHtml },
}: {
  keyboardData: Keyboard;
}) {
  const mainImage: KeyboardImage = {
    ...images[0],
  };
  const router = useRouter();
  // console.log(router);
  return (
    <>
      <Head>
        <title>3BD - {name}</title>
        <meta
          name='description'
          content={`Take a look in the ${name} custom keyboard `}
        />
        <meta property='og:url' content={`${router.asPath}`} />
        <meta property='og:site_name' content={`3BD`} />
        <meta property='og:title' content={name} />
        <meta property='og:description' content={contentHtml} />
        <meta property='og:type' content='article' />
        <meta
          property='og:image'
          content={`/images/keyboards/${mainImage.name}`}
        />
        {/* <meta property='og:image:height' content={String(mainImage.height)} />
        <meta property='og:image:width' content={String(mainImage.width)} /> */}
      </Head>
      <div className='flex flex-col justify-center items-center'>
        <div className='text-3xl font-bold'>{name}</div>
        <div className='italic'>
          <Date dateString={date} />
        </div>
        <div className='py-5'>
          <Image
            src={`/images/keyboards/${mainImage.name}`}
            alt={name}
            width={mainImage.width}
            height={mainImage.height}
          />
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: contentHtml as string }}
          className='prose text-zinc-800 dark:text-zinc-50'
        ></div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllKeyboardsIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const keyboardData = await getKeyboardData(params?.id as string);
  return {
    props: {
      keyboardData,
    },
  };
};
