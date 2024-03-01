"use client"

import Button from '@/components/shared/button';
import { useAppContext } from '@/context';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {

  const router = useRouter()
  const appContext = useAppContext()

  useEffect(() => {

    if(appContext?.user){
      router.push('/home')
    }
  },[])
  return (
    <main className="h-full relative w-full flex flex-col gap-6  items-center justify-center">
      <div className=" w-min h-min absolute top-2 right-2">
        <Link href={'/auth/login'}>
          <Button type="primary">Connexion</Button>
        </Link>
      </div>
      <p className=" text-6xl">
        Welcome to <span className=" text-cl-rimary">QuickLink</span>
      </p>
      <p className=" text-xl">Link shortening simplified</p>
    </main>
  );
}
