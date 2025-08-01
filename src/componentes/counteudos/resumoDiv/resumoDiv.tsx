import { useState, useEffect } from "react";
import { apiResVendasResumoGet, apiResVendasResumoPorProdutoGet } from "../../apiRes/apiResVendas";
import { Iconify } from "../../iconify/iconify";
import style from "./resumoDiv.module.css";
import type { iResumo, ResumoDivProps } from "../../Interfaces/resumoInterface";
import { apiResProdutoGet } from "../../apiRes/apiResProdutos";
import type { iProduto } from "../../Interfaces/produtoDivInterface";

export const Resumo = ({ divType }: ResumoDivProps) => {
  const [resumo, setResumo] = useState<iResumo | null>(null);
  const [produtos, setProdutos] = useState<iProduto[]>([]);

  const getResumo = async () => {
    const apiRes = await apiResVendasResumoGet();
    setResumo(apiRes.data);
  };

  const getProduto = async () => {
    const apiRes = await apiResProdutoGet();
    setProdutos(apiRes.data);
  };

 
  const handleProdutoChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const produtoId = e.target.value;

    if (!produtoId) {
      await getResumo();
      return;
    }

    const apiRes = await apiResVendasResumoPorProdutoGet(produtoId);
    setResumo(apiRes.data);
  };

  useEffect(() => {
    getResumo();
    getProduto();
  }, []);

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
            <select 
              className={style.selectProdutos} 
              name="opcoes" 
              onChange={handleProdutoChange}
              defaultValue=""
            >
              <option className={style.optionGeral} value="">Geral</option>
              {produtos.map((produto: iProduto) =>
                <option key={produto.id} value={produto.id}>{produto.name}</option>
              )}
            </select>
          </div>

          {resumo && (
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
          )}
        </div>
      ) : null}
    </div>
  );
};
