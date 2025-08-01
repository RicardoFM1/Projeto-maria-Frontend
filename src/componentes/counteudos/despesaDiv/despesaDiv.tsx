import { useEffect, useState } from "react";
import { Iconify } from "../../iconify/iconify";
import type { despesaDivProps, iDespesa } from "../../Interfaces/despesaDivInterface";
import { ModalAtualizarDespesa, ModalDeletarDespesa, ModalDespesa } from "../../Modal/modalDespesa";
import style from "./despesaDiv.module.css";
import { apiResDespesaGet } from "../../apiRes/apiResDespesa";

export const Despesa = ({ errorMsg, divType }: despesaDivProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAtualizar, setIsOpenAtualizar] = useState(false)
  const [isOpenDeletar, setIsOpenDeletar] = useState(false)
  const [despesa, setDespesa] = useState([] as iDespesa[]);
  const [search, setSearch] = useState("")
  const [mostrarTudo, setMostrarTudo] = useState(false);
  const limiteExibicao = 5;

  const getDespesa = async () => {
    const apiRes = await apiResDespesaGet();
    setDespesa(apiRes.data);
  };

  useEffect(() => {
    getDespesa();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getDespesa();
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [despesa]);

  const despesaFiltrada = despesa.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase())
  )

  const despesasVisiveis = mostrarTudo ? despesaFiltrada : despesaFiltrada.slice(0, limiteExibicao);

  return (
    <div className={style.custosMensais}>
      {divType === "Despesa" ? (
        <div className={style.Despesas}>
          <div className={style.headerDespesa}>
            <div className={style.tituloHeaderDespesa}>
          <h2>Custos mensais</h2>
          <input 
          type="search" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar despesa..."
          className={style.inputSearch}
          />
          </div>
          
          <div className={style.divFuncoes}>
            <div className={style.divBtnAddDespesa}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={style.adicionar}
                id="addDespesa"
              >
                <Iconify
                  className={style.add}
                  icon="streamline:add-1-solid"
                
                />
                
              </button>
            </div>
             <div className={style.divBtnAtualizarDespesas}>
              <button
                onClick={() => setIsOpenAtualizar(!isOpenAtualizar)}
                className={style.atualizar}
                id="atualizarDespesas"
              >
                <Iconify
                  className={style.iconAtualizar}
                  icon="stash:pencil-writing-light"
                  
                />
                
              </button>
            </div>
            <div className={style.divBtnDeletarDespesas}>
              <button
                onClick={() => setIsOpenDeletar(!isOpenDeletar)}
                className={style.deletar}
                id="deletarDespesas"
              >
                <Iconify
                  className={style.iconDeletar}
                  icon="mdi:bin"
                  
                />
                
              </button>
            </div>
            
          <button className={style.btnMostrar} onClick={() => setMostrarTudo(!mostrarTudo)}>
              {mostrarTudo ? 
              <Iconify icon="ep:arrow-down-bold" className={style.arrowDown}/>
               :<Iconify icon="ep:arrow-up-bold" className={style.arrowUp}/>}
            </button>
            </div>  
             
          </div>
          {isOpenDeletar && <ModalDeletarDespesa isOpen={isOpenDeletar} />}
          {isOpen && <ModalDespesa isOpen={isOpen} />}
          {isOpenAtualizar && <ModalAtualizarDespesa isOpen={isOpenAtualizar} />}
          <div className={style.caixaT}>
            {despesasVisiveis.map((despesa: iDespesa) => (
              <div key={despesa.id} className={style.divDespesa}>
                <div className={style.caixaDespesa}>
                  
                  <p>#{despesa.id} | {despesa.name}</p>
                  <div className={style.valorDespesa}>
                    <div className={style.divValor}>
                      <p className={style.Valor}> R$ {despesa.valor}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            
            {!mostrarTudo && despesaFiltrada.length > limiteExibicao && (
              <div
                style={{ fontWeight: "bold", cursor: "pointer", margin: "8px 0" }}
                onClick={() => setMostrarTudo(true)}
              >
                ... e mais {despesa.length - limiteExibicao} despesas
              </div>
            )}

            
        
          </div>

         
        </div>
      ) : null}

      {errorMsg ? (
        <span className={style.spanError}>{errorMsg}</span>
      ) : (
        <span></span>
      )}
    </div>
  );
};
