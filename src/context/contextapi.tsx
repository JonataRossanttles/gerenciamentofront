import  { createContext, useContext } from 'react';
import type { ReactNode } from 'react';


type props = {
  rotaLogin: string,
  rotacriarturma: string,
  rotacriaraluno: string,
  rotavalidartoken: string,
  rotacriarusuario:string,
  rotacriardisc:string,
  rotacriar_alunos_na_turma:string,
  rotacriar_professores_na_turma:string,
  rotacriar_disciplinas_na_turma:string,
  rotacriar_turma_disciplina_professores:string,
  rotachangepassword:string,
  rotaResetpassword:string,
  rotaconsultarturmas:string,
  rotaconsultaralunos:string,
  rotaconsultarusuarios:string,
  rotaconsultardisciplinas:string,
  rotaconsultar_turma_alunos:string,
  rotaconsultar_turma_professores:string,
  rotaconsultar_turma_disciplinas:string,
  rotaconsultar_professor_turmas_disciplinas:string,
  rotaconsultar_alunos_semturma:string,
  rotaconsultar_professores:string,
  rotaconsultar_dadosbanco:string,
  rotaeditarturma:string,
  rotaeditaraluno:string,
  rotaeditarusuario:string,
  rotaeditarprofessores:string,
  rotaeditardisciplina:string,
  rotaexcluirturma:string,
  rotaexcluiraluno:string,
  rotaexcluirdisciplina:string,
  rotaexcluir_turma_alunos:string,
  rotaexcluirusuario:string,
  rotaexcluir_turma_professores:string,
  rotaexcluir_turma_disciplinas:string,
  rotaalterar_alunos_de_turma:string,
  rotaalterar_disciplinas_de_turma:string,
  rotaalterar_professores_de_turma:string,
  logout:string,


};
// Criando o contexto para as rotas da API
const Context = createContext<props | undefined>(undefined);

// Provider para fornecer as rotas da API
export const Providerapi = ({ children }: { children: ReactNode }) => {
  const baseURL = 'https://gerenciamentoback.onrender.com'; 
  // http://localhost:3000
  //https://gerenciamentoback.onrender.com

  //Atribuindo os valores das rotas da API 
  const rotas: props = {
    rotaLogin: `${baseURL}/login`,
    rotacriarturma: `${baseURL}/turma/criar`,
    rotacriaraluno: `${baseURL}/aluno/criar`,
    rotacriarusuario:`${baseURL}/criaruser`,
    rotacriardisc:`${baseURL}/disciplina/criar`, 
    rotacriar_alunos_na_turma:`${baseURL}/turma/adicionaralunos`, 
    rotacriar_professores_na_turma:`${baseURL}/turma/adicionarprof`, 
    rotacriar_disciplinas_na_turma:`${baseURL}/turma/adicionardisc`, 
    rotacriar_turma_disciplina_professores:`${baseURL}/turma/disciplina/professores`, 
    rotaconsultarturmas:`${baseURL}/consultar/turmas`,
    rotaconsultaralunos:`${baseURL}/consultar/alunos`,
    rotaconsultarusuarios:`${baseURL}/consultar/usuarios`,
    rotaconsultardisciplinas:`${baseURL}/consultar/disciplinas`,
    rotaconsultar_turma_alunos:`${baseURL}/consultar/turma/alunos`,
    rotaconsultar_turma_professores:`${baseURL}/consultar/turma/professores`,
    rotaconsultar_turma_disciplinas:`${baseURL}/consultar/turma/disciplinas`,
    rotaconsultar_professor_turmas_disciplinas:`${baseURL}/consultar/professor/turmas/disciplinas`,
    rotaconsultar_alunos_semturma:`${baseURL}/consultar/alunos/semturma`,
    rotaconsultar_professores:`${baseURL}/consultar/professores`,
    rotaconsultar_dadosbanco:`${baseURL}/consultar/dadosbanco`,
    rotaeditarturma:`${baseURL}/editar/turma`,
    rotaeditaraluno:`${baseURL}/editar/aluno`,
    rotaeditarusuario:`${baseURL}/editar/usuario`,
    rotaeditarprofessores:`${baseURL}/editar/professor`,
    rotaeditardisciplina:`${baseURL}/editar/disciplina`,
    rotaexcluirturma:`${baseURL}/excluir/turma`,
    rotaexcluiraluno:`${baseURL}/excluir/aluno`,
    rotaexcluir_turma_alunos:`${baseURL}/excluir/turma/alunos`,
    rotaexcluirusuario:`${baseURL}/excluir/usuario`,
    rotaexcluirdisciplina:`${baseURL}/excluir/disciplina`,
    rotaexcluir_turma_professores:`${baseURL}/excluir/turma/professores`,
    rotaexcluir_turma_disciplinas:`${baseURL}/excluir/turma/disciplinas`,
    rotaalterar_alunos_de_turma:`${baseURL}/turma/alteraralunos`,
    rotaalterar_disciplinas_de_turma:`${baseURL}/turma/alterardisc`,
    rotaalterar_professores_de_turma:`${baseURL}/turma/alterarprof`,
    rotavalidartoken: `${baseURL}/validartoken`,
    rotachangepassword: `${baseURL}/changepassword`,
    rotaResetpassword:`${baseURL}/resetpassword`,
    logout:`${baseURL}/logout`

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