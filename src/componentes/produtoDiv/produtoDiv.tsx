import { useEffect, useState } from "react";
import { Iconify } from "../iconify/iconify";
import type {
  iProduto,
  produtoDivProps,
} from "../Interfaces/produtoDivInterface";
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
      getDoces();
    }, 3000);
  }, [doces]);

  return (
    <div className={style.divProduto}>
      {divType === "Produto" ? (
        <div className={style.Produtos}>
          <h2>Produtos</h2>
          <div className={style.caixaT}>
            {doces.map((doce: iProduto) => (
              <>
                <div className={style.divProdutos}>
                  <div className={style.caixaProdutos}>
                    <p className={style.nomeProduto}>
                      <Iconify
                        ClassName={style.carrinhoProduto}
                        icon="game-icons:shopping-cart"
                        width={24}
                        height={24}
                      />
                        {doce.name}
                    </p>

                    <div className={style.valoresProduto}>
                      <div className={style.divPrecoDeCusto}>
                        <p className={style.tituloCusto}>
                          <Iconify
                            ClassName={style.carteiraCusto}
                            icon="mingcute:wallet-2-fill"
                            width={24}
                            height={24}
                          />
                          Preço de custo
                        </p>
                        <p className={style.PrecoDeCusto}>
                          R$ {doce.preco_de_custo}
                        </p>
                      </div>
                      <div className={style.divPrecoDeVenda}>
                        <p className={style.tituloGanho}>
                          <Iconify
                            ClassName={style.carteiraGanho}
                            icon="mingcute:wallet-2-fill"
                            width={24}
                            height={24}
                          />
                          Preço de venda
                        </p>
                        <p className={style.PrecoDeVenda}>
                          R$ {doce.preco_de_venda}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
            <div className={style.divBtnAddProdutos}>
              <button
                onClick={() =>
                  isOpen === false ? setIsOpen(true) : setIsOpen(false)
                }
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
