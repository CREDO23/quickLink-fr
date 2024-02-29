/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { ReactNode, useEffect } from 'react';
import logo from '../assets/logo/logo.png'
import Image from 'next/image';


export default function Layout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {


  return (
    <div className="w-96 h-full ">
      {children}
      <div className=" absolute bottom-2 right-2 flex items-end justify-end w-auto">
        <Image height={80} src={logo} alt="logo" />
      </div>
    </div>
  );
}
