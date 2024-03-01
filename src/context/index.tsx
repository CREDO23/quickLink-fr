'use client';

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface IContext {
  user: IUser | null;
  accessToken: string | null;
  links: ILink[];
}

const initialState: IContext = { user: null, links: [], accessToken: null };

const AppContext = createContext<IContext>(initialState);
const DispatchAppContext = createContext<Dispatch<SetStateAction<IContext>>>(() => initialState);

// Hook
export const useAppContext = () => useContext(AppContext);
export const useDispatchApp = () => useContext(DispatchAppContext);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState(() => JSON.parse(localStorage.getItem('root') as string) ?? initialState);

  useEffect(() => {
    localStorage.setItem('root', JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={state}>
      <DispatchAppContext.Provider value={setState}>{children}</DispatchAppContext.Provider>
    </AppContext.Provider>
  );
};

export default ContextProvider;
