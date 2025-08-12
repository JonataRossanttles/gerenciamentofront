import  { createContext, useContext } from 'react';
import type { ReactNode } from 'react';


type props = {
  rotaLogin: string,
  rotacriarturma: string,
  rotacriaraluno: string,
  rotavalidartoken: string,
  rotacriarusuario:string,
  rotacriardisc:string,
  rotachangepassword:string,
  rotaResetpassword:string,
  rotaconsultarturmas:string,
  rotaconsultaralunos:string,
  rotaconsultarusuarios:string,
  rotaconsultardisciplinas:string,
  rotaeditarturma:string,
  rotaeditaraluno:string,
  rotaeditarusuario:string,
  rotaeditardisciplina:string,
  rotaexcluirturma:string,
  rotaexcluiraluno:string,
  rotaexcluirusuario:string,
  rotaexcluirdisciplina:string,
  

};
// Criando o contexto para as rotas da API
const Context = createContext<props | undefined>(undefined);

// Provider para fornecer as rotas da API
export const Providerapi = ({ children }: { children: ReactNode }) => {
  const baseURL = 'http://localhost:3000';

  //Atribuindo os valores das rotas da API 
  const rotas: props = {
    rotaLogin: `${baseURL}/login`,
    rotacriarturma: `${baseURL}/turma/criar`,
    rotacriaraluno: `${baseURL}/aluno/criar`,
    rotavalidartoken: `${baseURL}/validartoken`,
    rotacriarusuario:`${baseURL}/criaruser`,
    rotacriardisc:`${baseURL}/disciplina/criar`, 
    rotachangepassword: `${baseURL}/changepassword`,
    rotaResetpassword:`${baseURL}/resetpassword`,
    rotaconsultarturmas:`${baseURL}/consultar/turmas`,
    rotaconsultaralunos:`${baseURL}/consultar/alunos`,
    rotaconsultarusuarios:`${baseURL}/consultar/usuarios`,
    rotaconsultardisciplinas:`${baseURL}/consultar/disciplinas`,
    rotaeditarturma:`${baseURL}/editar/turma`,
    rotaeditaraluno:`${baseURL}/editar/aluno`,
    rotaeditarusuario:`${baseURL}/editar/usuario`,
    rotaeditardisciplina:`${baseURL}/editar/usuario`,
    rotaexcluirturma:`${baseURL}/excluir/turma`,
    rotaexcluiraluno:`${baseURL}/excluir/aluno`,
    rotaexcluirusuario:`${baseURL}/excluir/usuario`,
    rotaexcluirdisciplina:`${baseURL}/excluir/disciplina`,

    

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