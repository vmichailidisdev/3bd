import { Keyboard } from '@/types/keyboard';
import Image from 'next/image';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getAllKeyboardsIds, getKeyboardData } from '@/lib/keyboards';
import Date from 'components/date';
import { KeyboardImage } from '@/types/keyboard';

export default function KeyboardDetails({
  keyboardData: { id, name, date, images, contentHtml },
}: {
  keyboardData: Keyboard;
}) {
  const mainImage: KeyboardImage = {
    ...images[0],
  };
  return (
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
