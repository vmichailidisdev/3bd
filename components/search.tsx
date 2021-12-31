import { getAllKeyboardSwitches, getAllKeyboardWired } from '../lib/utils';
import { ColorContext, KeyboardContext } from '../pages/_app';
import styles from '../styles/search.module.css';
import { Filters } from '../types/filters';
import { Keyboard, Wireless } from '../types/keyboard';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment, useContext, useEffect, useState } from 'react';
import FilterCard from './filterCard';

function meetName(name: string, filterName: string) {
  if (filterName) {
    return name.toLowerCase().startsWith(filterName.toLowerCase());
  }
  return true;
}

function meetType(type: string, filterType: string) {
  if (filterType) {
    return type === filterType;
  }
  return true;
}

function meetWired(wired: string, filterWired: string) {
  if (filterWired) {
    return wired === filterWired;
  }
  return true;
}

function meetLighting(lighting: string, filterLighting: string) {
  if (filterLighting) {
    return lighting === filterLighting;
  }
  return true;
}

function meetStatus(status: string, filterStatus: string) {
  if (filterStatus) {
    return status === filterStatus;
  }
  return true;
}

// TODO: update so all the keyboards that don't have wireless are equal to 'no'
function meetWireless(wireless: null | Wireless, filterWireless: string) {
  if (filterWireless) {
    if (wireless && filterWireless) {
      return true;
    }
    return false;
  }
  return true;
}

function meetSwitches(switches: string, filterSwitches: string) {
  if (filterSwitches) {
    return switches === filterSwitches;
  }
  return true;
}

function meetColors(colors: string[], filterColors: string[]) {
  if (filterColors.length === 0) {
    return true;
  }
  return filterColors.some((filterColor) => colors.includes(filterColor));
}

const MAX = 83;
const MIN = 61;

function meetNumberOfKeys(numberOfKeys: number, filterNumberOfKeys: number) {
  return numberOfKeys <= filterNumberOfKeys;
}

export default function Search() {
  let [isOpen, setIsOpen] = useState(false);
  const keyboards = useContext(KeyboardContext);
  const [filters, setFilters] = useState<Filters>({
    name: '',
    colors: [],
    lighting: '',
    numberOfKeys: 83,
    status: '',
    switches: '',
    type: '',
    wired: '',
    wireless: '',
  });
  const ColorsMap = useContext(ColorContext);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  function filterKeyboards() {
    return keyboards.filter((keyboard) => {
      if (
        meetName(keyboard.name, filters.name) &&
        meetType(keyboard.type, filters.type) &&
        meetWired(keyboard.wired, filters.wired) &&
        meetLighting(keyboard.lighting, filters.lighting) &&
        meetStatus(keyboard.status, filters.status) &&
        meetSwitches(keyboard.switches, filters.switches) &&
        meetColors(keyboard.colors, filters.colors) &&
        meetWireless(keyboard.wireless, filters.wireless) &&
        meetNumberOfKeys(keyboard.numberOfKeys, filters.numberOfKeys)
      ) {
        return true;
      }
      return false;
    });
  }

  return (
    <div>
      <button
        className={`p-1 flex rounded-md ${styles.button} outline-0`}
        onClick={() => setIsOpen(true)}
      >
        <span
          className={`flex p-1 w-full h-full text-zinc-800 bg-zinc-50 dark:text-zinc-50 dark:bg-zinc-800 rounded-sm ${styles.value}`}
        >
          ⌨ Search
        </span>
      </button>
      <Transition show={isOpen} as='div'>
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className='fixed top-0 left-0 flex flex-col justify-center items-center'
        >
          <Dialog.Overlay />
          <div className='h-screen w-screen'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-90'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-300'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-90'
            >
              <div className='transition-all bg-[rgba(250,250,250,0.90)] dark:bg-[rgba(39,39,42,0.90)] h-full overflow-y-scroll'>
                <div className='h-full max-w-7xl mx-auto flex flex-col px-5 xl:px-0 py-5 text-zinc-800 dark:text-zinc-50'>
                  <Dialog.Title className='flex bg-zinc-50 dark:bg-zinc-800 border-2 border-[rgba(39,39,42,0.90)] dark:border-[rgba(250,250,250,0.90)] rounded-md'>
                    <input
                      type='text'
                      placeholder='Search a keyboard'
                      autoFocus={true}
                      onChange={(e) => {
                        setFilters({
                          ...filters,
                          name: e.target.value,
                        });
                      }}
                      className={`w-full text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-cyan-500 p-2 border-0 focus:ring-0 caret-cyan-500 rounded-md placeholder:text-orange-500 bg-transparent`}
                    />
                    <button
                      className='text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl p-2 font-light'
                      onClick={() => setIsOpen(false)}
                    >
                      Esc
                    </button>
                  </Dialog.Title>

                  <Dialog.Description></Dialog.Description>

                  <div className='flex flex-col gap-5 lg:gap-10'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-5'>
                      <div className='flex justify-between items-center gap-2'>
                        <label htmlFor='' className='font-bold'>
                          Colors{' '}
                        </label>
                        <div className='flex flex-wrap gap-2 '>
                          {Object.keys(ColorsMap).map((color, i) => {
                            return (
                              <input
                                key={i}
                                type='checkbox'
                                onChange={(e) => {
                                  let temp = [...filters.colors] as string[];
                                  const index: number = temp.indexOf(color);
                                  if (index === -1) {
                                    temp.push(color);
                                  } else {
                                    temp.splice(index, 1);
                                  }
                                  setFilters({
                                    ...filters,
                                    colors: temp,
                                  });
                                }}
                                className={`keyboard-color-${color} rounded-sm h-4 w-4 border-0 focus:ring-0 focus:ring-offset-0 cursor-pointer`}
                              />
                            );
                          })}
                        </div>
                      </div>
                      <div className='flex justify-between items-center gap-2'>
                        <label htmlFor='numberOfKeys' className='font-bold'>
                          Number of Keys{' '}
                        </label>
                        <input
                          type='number'
                          name='numberOfKeys'
                          id='numberOfKeys'
                          value={filters.numberOfKeys}
                          step='1'
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              numberOfKeys: Number(e.target.value),
                            })
                          }
                          min='61'
                          max='83'
                          className='focus:ring-0 border text-zinc-800 bg-zinc-50 border-zinc-800 dark:text-zinc-50 dark:bg-zinc-800 dark:border-zinc-50 rounded-md'
                        />
                      </div>
                      <div className='flex justify-between items-center gap-2'>
                        <label htmlFor='type' className='font-bold'>
                          Type{' '}
                        </label>
                        <select
                          name='type'
                          id='type'
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              type: e.target.value,
                            })
                          }
                          className='focus:ring-0 focus:border-zinc-800 dark:focus:border-zinc-50 text-zinc-800 bg-zinc-50 dark:text-zinc-50 dark:bg-zinc-800 rounded-md border border-zinc-800 dark:border-zinc-50'
                        >
                          <option value='' selected={true}>
                            All
                          </option>
                          <option value='60%'>60%</option>
                          <option value='65%'>65%</option>
                          <option value='70%'>70%</option>
                          <option value='75%'>75%</option>
                        </select>
                      </div>
                      <div className='flex justify-between items-center gap-2'>
                        <label htmlFor='lighting' className='font-bold'>
                          Lighting{' '}
                        </label>
                        <select
                          name='lighting'
                          id='lighting'
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              lighting: e.target.value,
                            })
                          }
                          className='focus:ring-0 focus:border-zinc-800 dark:focus:border-zinc-50 text-zinc-800 bg-zinc-50 dark:text-zinc-50 dark:bg-zinc-800 rounded-md border border-zinc-800 dark:border-zinc-50'
                        >
                          <option value='' selected={true}>
                            All
                          </option>
                          <option value='rgb'>rgb</option>
                          <option value='red'>red</option>
                        </select>
                      </div>
                      <div className='flex justify-between items-center gap-2'>
                        <label htmlFor='status' className='font-bold'>
                          Status{' '}
                        </label>
                        <select
                          name='status'
                          id='status'
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              status: e.target.value,
                            })
                          }
                          className='focus:ring-0 focus:border-zinc-800 dark:focus:border-zinc-50 text-zinc-800 bg-zinc-50 dark:text-zinc-50 dark:bg-zinc-800 rounded-md border border-zinc-800 dark:border-zinc-50'
                        >
                          <option value='' selected={true}>
                            All
                          </option>
                          <option value='available'>available</option>
                          <option value='sold'>sold</option>
                        </select>
                      </div>
                      <div className='flex justify-between items-center gap-2'>
                        <label htmlFor='switches' className='font-bold'>
                          Switches{' '}
                        </label>
                        <select
                          name='switches'
                          id='switches'
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              switches: e.target.value,
                            })
                          }
                          className='focus:ring-0 focus:border-zinc-800 dark:focus:border-zinc-50 text-zinc-800 bg-zinc-50 dark:text-zinc-50 dark:bg-zinc-800 rounded-md border border-zinc-800 dark:border-zinc-50'
                        >
                          <option value='' selected={true}>
                            All
                          </option>
                          {getAllKeyboardSwitches(keyboards).map(
                            (switches: string, i: number) => (
                              <option
                                value={switches}
                                className='capitalize'
                                key={i}
                              >
                                {switches}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div className='flex justify-between items-center gap-2'>
                        <label htmlFor='wired' className='font-bold'>
                          Wired{' '}
                        </label>
                        <select
                          name='wired'
                          id='wired'
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              wired: e.target.value,
                            })
                          }
                          className='focus:ring-0 focus:border-zinc-800 dark:focus:border-zinc-50 text-zinc-800 bg-zinc-50 dark:text-zinc-50 dark:bg-zinc-800 rounded-md border border-zinc-800 dark:border-zinc-50'
                        >
                          <option value='' selected={true}>
                            All
                          </option>
                          {getAllKeyboardWired(keyboards).map(
                            (switches: string, i: number) => (
                              <option
                                value={switches}
                                className='capitalize'
                                key={i}
                              >
                                {switches}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div className='flex justify-between items-center gap-2'>
                        <label htmlFor='wireless' className='font-bold'>
                          Wireless{' '}
                        </label>
                        <input
                          type='checkbox'
                          name='wireless'
                          id='wireless'
                          className={`text-orange-500 bg-orange-500 rounded-sm border-0 focus:ring-0 focus:ring-offset-0 cursor-pointer`}
                          onChange={() =>
                            setFilters({
                              ...filters,
                              wireless: filters.wireless === '' ? 'yes' : '',
                            })
                          }
                        />
                      </div>
                    </div>
                    {filterKeyboards().map((keyboard) => {
                      return (
                        <div key={keyboard.id}>
                          <Link href={`/keyboards/${keyboard.id}`}>
                            <a>
                              <FilterCard keyboard={keyboard} />
                            </a>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
function getAllKeyboardProperty(keyboards: Keyboard[], arg1: string) {
  throw new Error('Function not implemented.');
}
