import { useState, useEffect } from "react";
import { apiResVendasResumoGet } from "../../apiRes/apiResVendas";
import { Iconify } from "../../iconify/iconify";
import style from "./resumoDiv.module.css";
import type { iResumo, ResumoDivProps } from "../../Interfaces/resumoInterface";
import { apiResProdutoGet } from "../../apiRes/apiResProdutos";
import type { iProduto } from "../../Interfaces/produtoDivInterface";


export const Resumo = ({ divType }: ResumoDivProps) => {
  const [resumo, setResumo] = useState<iResumo | null>(null);
  const [produtos, setProdutos] = useState([])
  const getResumo = async () => {
    const apiRes = await apiResVendasResumoGet();
    setResumo(apiRes.data);
  };

   const getProduto = async () => {
    const apiRes = await apiResProdutoGet();
    setProdutos(apiRes.data);
  };

  useEffect(() => {
    getResumo();
    getProduto();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      console.log(produtos)
      console.log(resumo)
    }, 3000);
  }, [resumo]);

  return (
    <div className={style.resumoHoje}>
      {divType === "Resumo" ? (
        <div className={style.Resumo}>
          <div className={style.headerResumo}>
          <h2>
            <Iconify
              className={style.graph}
              icon="noto-v1:money-bag"
              width={24}
              height={24}
            />{" "}
            Resumo
          </h2>
          <select className={style.selectProdutos} name="opcoes" >
            {produtos.map((produto:iProduto) =>
            <option key={produto.id} value={produto.id}>{produto.name}</option>
        )}
          </select>
          </div>
        
             
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
