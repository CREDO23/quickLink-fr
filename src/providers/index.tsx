import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const ContextProvider = dynamic(() => import('@/context'), { ssr: false });

const Providers = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <body className=" h-[100dvh] w-full flex items-center justify-center">
      <ContextProvider>{children}</ContextProvider>
    </body>
  );
};

export default Providers
