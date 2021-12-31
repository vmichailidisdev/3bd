import React from 'react';
import styles from '../styles/overlay.module.css';

export default function Overlay({ children }: { children: JSX.Element }) {
  return (
    <div
      className={`fixed top-0 left-0 flex justify-center items-center h-screen w-screen ${styles.overlay}`}
    >
      {children}
    </div>
  );
}
