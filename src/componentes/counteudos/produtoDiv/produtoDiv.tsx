import { useEffect, useState } from "react";
import { Iconify } from "../../iconify/iconify";
import type { iProduto, produtoDivProps } from "../../Interfaces/produtoDivInterface";
import { ModalAtualizarProduto, ModalProduto } from "../../Modal/modalProduto";
import style from "./produtoDiv.module.css";
import { apiResProdutoGet } from "../../apiRes/apiResProdutos";

export const Produto = ({ divType, errorMsg }: produtoDivProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAtualizar, setIsOpenAtualizar] = useState(false)
  const [doces, setDoces] = useState([] as iProduto[]);
  const [search, setSearch] = useState("")
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

  const docesFiltrados = doces.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase())
  )

  const docesVisiveis = mostrarTudo ? docesFiltrados : docesFiltrados.slice(0, limiteExibicao);

  return (
    <div className={style.divProduto}>
      {divType === "Produto" ? (
        <div className={style.Produtos}>
          <div className={style.headerProdutos}>
            <div className={style.tiutloHeaderProdutos}>
          <h2>Produtos</h2>
          <input 
          type="search" 
          className={style.inputSearch}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar doce..."
          />
          </div>
          <div className={style.divFuncoes}>
          <div className={style.divBtnAddProdutos}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={style.adicionar}
                id="addProdutos"
              >
                <Iconify
                  className={style.add}
                  icon="streamline:add-1-solid"
                  
                />
               
              </button>
            </div>
            <div className={style.divBtnAtualizarProdutos}>
              <button
                onClick={() => setIsOpenAtualizar(!isOpenAtualizar)}
                className={style.atualizar}
                id="atualizarProdutos"
              >
                <Iconify
                  className={style.iconAtualizar}
                  icon="stash:pencil-writing-light"
                  
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
          {isOpen && <ModalProduto isOpen={isOpen} />}
          {isOpenAtualizar && <ModalAtualizarProduto isOpen={isOpenAtualizar} />}
          <div className={style.caixaT}>
            {docesVisiveis.map((doce: iProduto) => (
              <div key={doce.id} className={style.divProdutos}>
                <div className={style.caixaProdutos}>
                  <p className={style.nomeProduto}>
                    
                    <Iconify
                      className={style.carrinhoProduto}
                      icon="game-icons:shopping-cart"
                      
                    />
                    #{doce.id} |  {doce.name}
                  </p>

                  <div className={style.valoresProduto}>
                    <div className={style.divPrecoDeCusto}>
                      <p className={style.tituloCusto}>
                        <Iconify
                          className={style.carteiraCusto}
                          icon="mingcute:wallet-2-fill"
                         
                        />
                        Preço de custo
                      </p>
                      <p className={style.PrecoDeCusto}>R$ {doce.preco_de_custo}</p>
                    </div>
                    <div className={style.divPrecoDeVenda}>
                      <p className={style.tituloGanho}>
                        <Iconify
                          className={style.carteiraGanho}
                          icon="mingcute:wallet-2-fill"
                          
                        />
                        Preço de venda
                      </p>
                      <p className={style.PrecoDeVenda}>R$ {doce.preco_de_venda}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

        
            {!mostrarTudo && docesFiltrados.length > limiteExibicao && (
              <div
                style={{ fontWeight: "bold", cursor: "pointer", margin: "8px 0" }}
                onClick={() => setMostrarTudo(true)}
              >
                ... e mais {doces.length - limiteExibicao} produtos
              </div>
            )}

            
             
          </div>
          

          
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
