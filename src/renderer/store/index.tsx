import { createContext, useContext } from 'react';
import Store from './store';

interface IStoreProvider {
  value: null | Store;
  children: JSX.Element;
}

const StoreContext = createContext<Store | null>(null);

export const StoreProvider = ({ children, value }: IStoreProvider) => (
  <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
);

export const AppStore = Store;

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    /**
     * this is especially useful in TypeScript
     * so you don't need to be checking for null all the time
     */
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};
