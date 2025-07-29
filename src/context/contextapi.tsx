import  { createContext, useContext } from 'react';
import type { ReactNode } from 'react';


type props = {
  rotaLogin: string,
  rotacriarturma: string,

};
// Criando o contexto para as rotas da API
const Context = createContext<props | undefined>(undefined);

// Provider para fornecer as rotas da API
export const Providerapi = ({ children }: { children: ReactNode }) => {
  const baseURL = 'http://localhost:3000';

  //Atribuindo os valores das rotas da API 
  const rotas: props = {
    rotaLogin: `${baseURL}/login`,
    rotacriarturma: `${baseURL}/turma/criar`
  };

  return (
    <Context.Provider value={rotas}>
      {children}
    </Context.Provider>
  );
};

// Hook para  que os filhos consigam usar as rotas
export const usarcontextoapi = () => {
  const contexto = useContext(Context);
  if (!contexto) {
    throw new Error('usarcontexto deve ser usado dentro de um ApiProvider');
  }
  return contexto;
};