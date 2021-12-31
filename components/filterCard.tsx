import { Keyboard, KeyboardImage } from '@/types/keyboard';
import Date from '@/components/date';
import Image from 'next/image';

export default function FilterCard({ keyboard }: { keyboard: Keyboard }) {
  const mainImage: KeyboardImage = { ...keyboard.images[0] };
  return (
    <div className='grid md:grid-cols-2 gap-2 md:gap-5 lg:gap-10'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-xl font-bold'>{keyboard.name}</h1>
        <div className='font-italic'>
          <Date dateString={keyboard.date} />
        </div>
        <div
          className='line-clamp-2 md:line-clamp-4 lg:line-clamp-6 xl:line-clamp-8'
          dangerouslySetInnerHTML={{ __html: keyboard.contentHtml }}
        ></div>
      </div>
      <div className='w-full self-center'>
        <Image
          src={`/images/keyboards/${mainImage.name}`}
          alt={keyboard.name}
          layout='responsive'
          width={mainImage.width}
          height={mainImage.height}
        />
      </div>
    </div>
  );
}
