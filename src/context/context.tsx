import  { createContext, useContext,useState } from 'react';
import type { ReactNode } from 'react';

type obj = Record<string,any>

type props = {
  informationmenu: string,
  useinformationmenu: (info: string) => void,
  statusmodalconfirm: boolean,
  setStatusmodalconfirm: (value: boolean) => void,
  authenticated: boolean,
  setAuthenticated: (value: boolean) => void,
  statusmodal:boolean,
  setStatusmodal: (value:boolean) => void,
  arrayConsulta:any[],
  setArrayconsulta: (value:any[])=>void,
  Selectionmodal:obj,
  setSelectionmodal:React.Dispatch<React.SetStateAction<obj>>,
  infouser:string,
  setInfouser:React.Dispatch<React.SetStateAction<string>>,
};
// Criando o contexto para as rotas da API
const Context = createContext<props | undefined>(undefined);

// Provider para fornecer as rotas da API
export const Provider = ({ children }: { children: ReactNode }) => {
  const [informationmenu, useInformationmenu] = useState('');
  const [infouser, setInfouser] = useState<string>('');
  const [authenticated, setAuthenticated] = useState(false);
  const [statusmodal, setStatusmodal] = useState(false);
  const [statusmodalconfirm, setStatusmodalconfirm] = useState(false);
 const [arrayConsulta, setArrayconsulta] = useState<any[]>([]);
  const [Selectionmodal, setSelectionmodal] = useState<obj>({});

  //Atribuindo os valores das rotas da API e o estado do modal e a função para alterar o estado do modal
  const information: props = {
    informationmenu,
    useinformationmenu: useInformationmenu,
    authenticated,
    setAuthenticated,
    statusmodal,
    setStatusmodal,
    arrayConsulta,
    setArrayconsulta,
    Selectionmodal,
    setSelectionmodal,
    statusmodalconfirm,
    setStatusmodalconfirm,
    infouser,
    setInfouser
  };

  return (
    <Context.Provider value={information}>
      {children}
    </Context.Provider>
  );
};

// Hook para usar que os filhos consigam usar as rotas
export const usarcontexto = () => {
  const contexto = useContext(Context);
  if (!contexto) {
    throw new Error('usarcontexto deve ser usado dentro de um ApiProvider');
  }
  return contexto;
};