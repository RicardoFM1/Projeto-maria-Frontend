import { useState, useEffect } from "react";
import { apiResVendasResumoGet } from "../../apiRes/apiResVendas";
import { Iconify } from "../../iconify/iconify";
import style from "./resumoDiv.module.css";
import type { iResumo, ResumoDivProps } from "../../Interfaces/resumoInterface";


export const Resumo = ({ divType }: ResumoDivProps) => {
  const [resumo, setResumo] = useState<iResumo | null>(null);
  const getResumo = async () => {
    const apiRes = await apiResVendasResumoGet();
    setResumo(apiRes.data);
  };

  useEffect(() => {
    getResumo();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      console.log(resumo)
    }, 3000);
  }, [resumo]);

  return (
    <div className={style.resumoHoje}>
      {divType === "Resumo" ? (
        <div className={style.Resumo}>
          <h2>
            <Iconify
              ClassName={style.graph}
              icon="noto-v1:money-bag"
              width={24}
              height={24}
            />{" "}
            Resumo
          </h2>
        
             
          <div className={style.caixaStatus}>
            <div className={style.resumoStatus}>
              <p>{resumo?.totalProdutosVendidos}</p>
              <p className={style.pStatus}>Produtos vendidos</p>
            </div>
            <div className={style.resumoStatus}>
              <p>R$ {resumo?.faturamentoTotal}</p>
              <p className={style.pStatus}>Faturamento</p>
            </div>

            <div className={style.resumoStatus}>
              <p>R$ {resumo?.lucroTotal}</p>
              <p className={style.pStatus}>Lucro</p>
            </div>
          </div>
          
        
        </div>
      ) : null}
    </div>
  );
};
