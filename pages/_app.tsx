import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import Layout from '../components/layout';
import keyboards from 'scripts/keyboards.json';
import colors from 'scripts/colors.json';
import { createContext } from 'react';
import { Keyboard } from '../types/keyboard';

export const KeyboardContext = createContext<Keyboard[]>([]);
export const ColorContext = createContext<Record<string, string>>({});

// const ColorsMap = {
//   white: '#ffffff',
//   red: '#ff0000',
//   black: '#000000',
//   purple: '#800080',
//   pink: '#ffc0cb',
//   gray: '#808080',
//   lightblue: '#87cefa',
//   darkblue: '#191970',
//   cyan: '#00ffff',
//   blue: '#0000ff',
//   yellow: '#ffff00',
//   darkgray: '#696969',
//   lightbrown: '#fff8dc',
//   brown: '#deb887',
// };

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class'>
      <KeyboardContext.Provider value={keyboards as Keyboard[]}>
        <ColorContext.Provider value={JSON.parse(colors)}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ColorContext.Provider>
      </KeyboardContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
