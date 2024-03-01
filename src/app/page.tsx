import Button from '@/components/shared/button';
import Link from 'next/link';

export default function Home() {
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
