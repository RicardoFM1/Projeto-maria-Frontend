import { useState } from "react";
import { Iconify } from "../iconify/iconify";
import type { despesaDivProps } from "../Interfaces/despesaDivInterface";
import { ModalDespesa } from "../Modal/modal";
import style from "./despesaDiv.module.css";

export const Despesa = ({ errorMsg, divType }: despesaDivProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={style.custosMensais}>
      {divType === "Despesa" ? (
        <div className={style.Despesas}>
          <h2>Custos mensais</h2>
          <div className={style.caixaT}>
            <button
              onClick={() => setIsOpen(true)}
              className={style.adicionar}
              id="addProdutos"
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
