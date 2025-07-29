import { useEffect, useState } from "react";
import { Iconify } from "../../iconify/iconify";
import type { iProduto, produtoDivProps } from "../../Interfaces/produtoDivInterface";
import { ModalProduto } from "../../Modal/modalProduto";
import style from "./produtoDiv.module.css";
import { apiResProdutoGet } from "../../apiRes/apiResProdutos";

export const Produto = ({ divType, errorMsg }: produtoDivProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [doces, setDoces] = useState([] as iProduto[]);
  const [mostrarTudo, setMostrarTudo] = useState(false);
  const limiteExibicao = 5;

  const getDoces = async () => {
    const apiRes = await apiResProdutoGet();
    setDoces(apiRes.data);
  };

  useEffect(() => {
    getDoces();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getDoces();
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [doces]);

  const docesVisiveis = mostrarTudo ? doces : doces.slice(0, limiteExibicao);

  return (
    <div className={style.divProduto}>
      {divType === "Produto" ? (
        <div className={style.Produtos}>
          <div className={style.tituloProdutos}>
          <h2>Produtos</h2>
          <button onClick={() => setMostrarTudo(!mostrarTudo)}>
              {mostrarTudo ? "Mostrar menos" : "Mostrar mais"}
            </button>
          </div>

          <div className={style.caixaT}>
            {docesVisiveis.map((doce: iProduto) => (
              <div key={doce.id} className={style.divProdutos}>
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
                      <p className={style.PrecoDeCusto}>R$ {doce.preco_de_custo}</p>
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
                      <p className={style.PrecoDeVenda}>R$ {doce.preco_de_venda}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

        
            {!mostrarTudo && doces.length > limiteExibicao && (
              <div
                style={{ fontWeight: "bold", cursor: "pointer", margin: "8px 0" }}
                onClick={() => setMostrarTudo(true)}
              >
                ... e mais {doces.length - limiteExibicao} produtos
              </div>
            )}

            <div className={style.divBtnAddProdutos}>
              <button
                onClick={() => setIsOpen(!isOpen)}
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

          {isOpen && <ModalProduto isOpen={isOpen} />}
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
