import { useEffect, useState } from "react";
import { Iconify } from "../../iconify/iconify";
import type { despesaDivProps, iDespesa } from "../../Interfaces/despesaDivInterface";
import { ModalAtualizarDespesa, ModalDespesa } from "../../Modal/modalDespesa";
import style from "./despesaDiv.module.css";
import { apiResDespesaGet } from "../../apiRes/apiResDespesa";

export const Despesa = ({ errorMsg, divType }: despesaDivProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAtualizar, setIsOpenAtualizar] = useState(false)
  const [despesa, setDespesa] = useState([] as iDespesa[]);
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

  const despesasVisiveis = mostrarTudo ? despesa : despesa.slice(0, limiteExibicao);

  return (
    <div className={style.custosMensais}>
      {divType === "Despesa" ? (
        <div className={style.Despesas}>
          <div className={style.headerDespesa}>
          <h2>Custos mensais</h2>
          <div className={style.divFuncoes}>
            <div className={style.divBtnAddDespesa}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={style.adicionar}
                id="addDespesa"
              >
                <Iconify
                  ClassName={style.add}
                  icon="streamline:add-1-solid"
                
                />
                
              </button>
            </div>
             <div className={style.divBtnAtualizarDespesas}>
              <button
                onClick={() => setIsOpenAtualizar(!isOpenAtualizar)}
                className={style.atualizar}
                id="atualizarProdutos"
              >
                <Iconify
                  ClassName={style.iconAtualizar}
                  icon="stash:pencil-writing-light"
                  
                />
                
              </button>
            </div>
            
          <button className={style.btnMostrar} onClick={() => setMostrarTudo(!mostrarTudo)}>
              {mostrarTudo ? 
              <Iconify icon="ep:arrow-down-bold" ClassName={style.arrowDown}/>
               :<Iconify icon="ep:arrow-up-bold" ClassName={style.arrowUp}/>}
            </button>
            </div>  
             
          </div>
          {isOpen && <ModalDespesa isOpen={isOpen} />}
          {isOpenAtualizar && <ModalAtualizarDespesa isOpen={isOpenAtualizar} />}
          <div className={style.caixaT}>
            {despesasVisiveis.map((despesa: iDespesa) => (
              <div key={despesa.id} className={style.divDespesa}>
                <div className={style.caixaDespesa}>
                  <p>{despesa.name}</p>
                  <div className={style.valorDespesa}>
                    <div className={style.divValor}>
                      <p className={style.Valor}> R$ {despesa.valor}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            
            {!mostrarTudo && despesa.length > limiteExibicao && (
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
