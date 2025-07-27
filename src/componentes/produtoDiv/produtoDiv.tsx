import { useEffect, useState } from "react";
import { Iconify } from "../iconify/iconify";
import type { produtoDivProps } from "../Interfaces/produtoDivInterface";
import { ModalProduto } from "../Modal/modal";
import style from "./produtoDiv.module.css";
import { apiResProdutoGet } from "../apiRes/apiResProdutos";

export const Produto = ({ divType, errorMsg }: produtoDivProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [doces, setDoces] = useState([] as any);
  const getDoces = async () => {
    const apiRes = await apiResProdutoGet();
    setDoces(apiRes.data);
  };

  useEffect(() => {
    getDoces();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      console.log(doces);
    }, 3000);
  }, [doces]);

  return (
    <div className={style.divProduto}>
      {divType === "Produto" ? (
        <div className={style.Produtos}>
          <h2>Produtos</h2>
          <div className={style.caixaT}>
            {doces.map((doce: any) => (
              <>
                <div className={style.divProdutos}>
                  <div className={style.caixaProdutos}>
                   
                    <p>{doce.name}</p>

                    
                      <div className={style.divPrecoDeCusto}>
                        <p>Preço de custo:</p> 
                          <p className={style.PrecoDeCusto}> R${doce.preco_de_custo}</p>
                      </div>
                      <div className={style.divPrecoDeVenda}>
                        <p>Preço de venda:</p>
                          <p className={style.PrecoDeVenda}> R${doce.preco_de_venda}</p>
                      </div>
                    </div>
                  </div>
               
              </>
            ))}
            <div className={style.divBtnAddProdutos}>
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
          </div>
          {divType === "Produto" ? <ModalProduto isOpen={isOpen} /> : null}
        </div>
      ) : null}

      {errorMsg ? (
        <span className={style.spanError}>{errorMsg}</span>
      ) : (
        <span className={style.spanError}></span>
      )}
    </div>
  );
};
