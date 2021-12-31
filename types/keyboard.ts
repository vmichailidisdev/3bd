export type KeyboardImage = {
  name: string;
  width: number;
  height: number;
};

export type Status = 'available' | 'sold' | 'endgame' | 'repurposed' | 'main';

export type Type = '60%' | '65%' | '70%' | '75%';

export type Switches =
  | 'gateron black'
  | 'kailh polia'
  | 'gateron clear'
  | 'zilent'
  | 'kailh box crystal'
  | 'arctos'
  | 'kailh speed copper'
  | 'zealios v2'
  | 'kailh box brown'
  | 'hako violet'
  | 'zealios';

export type Color =
  | 'white'
  | 'red'
  | 'black'
  | 'purple'
  | 'pink'
  | 'gray'
  | 'lightblue'
  | 'darkblue'
  | 'cyan'
  | 'blue'
  | 'yellow'
  | 'darkgray'
  | 'lightbrown'
  | 'brown';

export type Wired = 'usb-c' | 'mini-b usb';

export type Wireless = null | {
  chip: string;
  battery: string;
};

export type Lighting = 'rgb' | 'red';

export type Dimensions = {
  width: number;
  height: number;
  length: number;
};

export type KeyboardProperty = keyof {
  id: string;
  name: string;
  date: string;
  images: string;
  status: string;
  type: string;
  switches: string;
  colors: string;
  wired: string;
  wireless: string;
  numberOfKeys: string;
  lighting: string;
  dimensions: string;
  weight: string;
  contentHtml: string;
};

export type Keyboard = {
  id: string;
  name: string;
  date: string;
  images: KeyboardImage[];
  status: Status;
  type: Type;
  switches: Switches;
  colors: Color[];
  wired: Wired;
  wireless: Wireless;
  numberOfKeys: number;
  lighting: Lighting;
  dimensions: Dimensions;
  weight: number;
  contentHtml: string;
};
