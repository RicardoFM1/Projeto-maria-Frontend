import { useEffect, useState } from "react";
import { Iconify } from "../iconify/iconify";
import type { despesaDivProps, iDespesa } from "../Interfaces/despesaDivInterface";
import { ModalDespesa } from "../Modal/modal";
import style from "./despesaDiv.module.css";
import { apiResDespesaGet } from "../apiRes/apiResDespesa";

export const Despesa = ({ errorMsg, divType }: despesaDivProps) => {
  const [isOpen, setIsOpen] = useState(false);

    const [despesa, setDespesa] = useState([] as any);
    const getDespesa = async () => {
      const apiRes = await apiResDespesaGet();
      setDespesa(apiRes.data);
    };
  
    useEffect(() => {
      getDespesa();
    }, []);
  
    useEffect(() => {
      setTimeout(() => {
        getDespesa()
      }, 3000);
    }, [despesa]);

  return (
    <div className={style.custosMensais}>
      {divType === "Despesa" ? (
        <div className={style.Despesas}>
          <h2>Custos mensais</h2>
          <div className={style.caixaT}>
            {despesa.map((despesa: iDespesa) => (
              <>
                <div className={style.divDespesa}>
                  <div className={style.caixaDespesa}>
                   
                    <p>{despesa.name}</p>

                    <div className={style.valorDespesa}>
                      <div className={style.divValor}> 
                          <p className={style.Valor}> R$ {despesa.valor}</p>
                      </div>
                      </div>
                    </div>
                  </div>
               
              </>
            ))}
            <div className={style.divBtnAddDespesa}>
            <button
              onClick={() => setIsOpen(true)}
              className={style.adicionar}
              id="addDespesa"
            >
              <Iconify
                ClassName={style.add}
                icon="streamline:add-1-solid"
                width={24}
                height={24}
              />
              Adicionar
            </button>
            </div>
          </div>
          {divType === "Despesa" ? <ModalDespesa isOpen={isOpen} /> : null}
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
