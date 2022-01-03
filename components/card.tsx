import React, { useContext, useState } from 'react';
import Image from 'next/image';
import Date from './date';
import { CardProps } from '@/types/card';
import {
  KeyboardImage,
  Color,
  Status,
  Wired,
  Switches,
  Type,
  Dimensions,
  Wireless,
  Lighting,
} from '@/types/keyboard';
import styles from '../styles/card.module.css';
import { ColorContext } from '@/pages/_app';

function isZero(value: number) {
  if (value === 0) return '???';
  return value;
}

function Colors({ colors }: { colors: Color[] }) {
  const ColorsMap = useContext(ColorContext);
  return (
    <div className='flex justify-between items-center gap-2'>
      <span className='font-medium'>Colors: </span>
      <div className='flex gap-1'>
        {colors.map((color, i) => (
          <div
            key={i}
            style={{ background: ColorsMap[color] }}
            className='rounded-sm h-4 w-4'
          ></div>
        ))}
      </div>
    </div>
  );
}

function Status({ status }: { status: Status }) {
  const ColorsMap = {
    sold: 'text-red-500',
    available: 'text-green-300',
    repurposed: 'text-blue-500',
    endgame: 'text-purple-500',
    main: 'text-yellow-300',
  };
  return (
    <div className='flex justify-between items-center gap-2'>
      <span className='font-medium'>Status: </span>
      <span className={ColorsMap[status].concat(' uppercase font-bold')}>
        {status}
      </span>
    </div>
  );
}

function Type({ type }: { type: Type }) {
  return (
    <div className='flex justify-between items-center gap-2'>
      <span className='font-medium'>Type: </span>
      <span className='bg-gray-400 text-white py-0.5 px-1 rounded-sm text-sm font-bold'>
        {type}
      </span>
    </div>
  );
}

function Switches({ switches }: { switches: Switches }) {
  return (
    <div className='flex justify-between items-center gap-2'>
      <span className='font-medium'>Switches: </span>
      <span className='capitalize font-bold'>{switches}</span>
    </div>
  );
}

function Wired({ wired }: { wired: Wired }) {
  return (
    <div className='flex justify-between items-center gap-2'>
      <span className='font-medium'>Wired: </span>
      <span className='uppercase font-bold'>{wired}</span>
    </div>
  );
}

function NumberOfKeys({ numberOfKeys }: { numberOfKeys: number }) {
  return (
    <div className='flex justify-between items-center gap-2'>
      <span className='font-medium'>Number of keys:</span>
      <div className='flex items-center gap-1'>
        <span className='font-bold'>{numberOfKeys}</span>
        <div
          className={`border-[0] border-white h-4 w-4 text-[0.4rem] rounded-sm items-start text-center ${styles.numberOfKeys}`}
        >
          A
        </div>
      </div>
    </div>
  );
}

function Lighting({ lighting }: { lighting: Lighting }) {
  const LightingMap = {
    rgb: <div className={`w-20 h-5 ${styles.lighting} rounded-sm`}></div>,
    red: <div className='w-20 h-5 bg-[red] rounded-sm'></div>,
  };
  return (
    <div className='flex justify-between items-center gap-2'>
      <span className='pr-1 font-medium'>Lighting:</span>
      {LightingMap[lighting]}
    </div>
  );
}

function Wireless({ wireless }: { wireless: Wireless }) {
  return (
    <>
      <div className='flex justify-between items-center gap-2'>
        <span className='font-medium'>Wireless: </span>
        <span className='font-bold capitalize'>
          {wireless ? wireless.chip : 'No'}
        </span>
      </div>
      {wireless && (
        <div className='flex justify-between items-center gap-2'>
          <span className='font-medium'>Battery</span>
          <span className='font-bold'>{wireless.battery}</span>
        </div>
      )}
    </>
  );
}

function Dimensions({ dimensions }: { dimensions: Dimensions }) {
  return (
    <div className='flex justify-between items-center gap-2'>
      <span className='font-medium'>Dimensions: </span>
      <div>
        <span className='font-bold'>{isZero(dimensions.width)}</span>
        <span className='text-sm'>W x</span>{' '}
        <span className='font-bold'>{isZero(dimensions.height)}</span>
        <span className='text-sm'>H x</span>{' '}
        <span className='font-bold'>{isZero(dimensions.length)}</span>
        <span className='text-sm'>L</span>
      </div>
    </div>
  );
}

function Weight({ weight }: { weight: number }) {
  return (
    <div className='flex justify-between items-center gap-2'>
      <span className='font-medium'>Weight: </span>
      <span className='font-bold'>{isZero(weight)}</span>
    </div>
  );
}

export default function Card({
  type = 'small',
  keyboardData: {
    name,
    date,
    images,
    status,
    type: keyboardType,
    switches,
    colors,
    wired,
    wireless,
    numberOfKeys,
    lighting,
    dimensions,
    weight,
    contentHtml,
  },
}: CardProps) {
  const [hover, setHover] = useState(false);
  const mainImage: KeyboardImage = {
    ...images[0],
  };
  return (
    <div
      className={`flex flex-col w-full gap-2 bg-[rgba(250,250,250,0.9)] dark:bg-[rgba(39,39,42,0.9)] h-full rounded-lg py-10 relative ${
        styles.card
      } ${hover ? 'scale-105 lg:scale-110' : ''}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onTouchStart={() => setHover(true)}
      onTouchEnd={() => setHover(false)}
    >
      <div
        className={`${
          hover ? `absolute` : 'hidden'
        } h-full w-full top-0 left-0 rounded-lg  bg-[rgba(250,250,250)] dark:bg-[rgba(39,39,42)] px-5 py-10 z-10 ${
          styles.details
        }`}
      >
        <Status status={status} />
        <Type type={keyboardType} />
        <Switches switches={switches} />
        <Colors colors={colors} />
        <Wired wired={wired} />
        <Wireless wireless={wireless} />
        <NumberOfKeys numberOfKeys={numberOfKeys} />
        <Lighting lighting={lighting} />
        <Dimensions dimensions={dimensions} />
        <Weight weight={weight} />
      </div>
      {/* className={`${hover ? 'invisible' : 'visible'}`} */}
      <div>
        <h1 className='text-xl px-5 font-bold'>{name}</h1>
        <div className='px-5 italic text-sm'>
          <Date dateString={date} />
        </div>
        <div className='w-full py-2'>
          <Image
            src={`/images/keyboards/${mainImage.name}`}
            alt={name}
            layout='responsive'
            width={mainImage.width}
            height={mainImage.height}
          />
        </div>
        {type === 'large' ? (
          <div
            dangerouslySetInnerHTML={{ __html: contentHtml }}
            className='line-clamp-4 px-5'
          ></div>
        ) : null}
      </div>
    </div>
  );
}
