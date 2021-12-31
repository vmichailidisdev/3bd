import { Switch } from '@headlessui/react';
import { useTheme } from 'next-themes';

export default function Theme() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <Switch
        checked={theme === 'dark'}
        onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className={`${
          theme === 'dark'
            ? 'bg-gradient-to-r from-pink-500 to-purple-500'
            : 'bg-gradient-to-r from-red-500 to-orange-500'
        }
          relative inline-flex items-start flex-shrink-0 w-12 border-0 rounded-full cursor-pointer focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className='sr-only'>Use setting</span>
        <span
          aria-hidden='true'
          className={`${theme === 'dark' ? 'translate-x-full' : 'translate-x-0'}
            pointer-events-none flex justify-center items-center rounded-full w-6 bg-transparent ring-0 transform transition ease-in-out duration-200`}
        >
          {theme === 'dark' ? '🌑' : '😎'}
        </span>
      </Switch>
    </div>
  );
}
