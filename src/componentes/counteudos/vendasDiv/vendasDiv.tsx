import { useEffect, useState } from "react";
import { Iconify } from "../../iconify/iconify";
import style from "./vendasDiv.module.css";
import type { iVenda, vendaDivProps } from "../../Interfaces/vendasDivInterface";
import { apiResVendasGet } from "../../apiRes/apiResVendas";
import { ModalAtualizarVendas } from "../../Modal/modalVenda";

export const Venda = ({ errorMsg, divType }: vendaDivProps) => {
  const [mostrarTudo, setMostrarTudo] = useState(false);
  const [isOpenAtualizar, setIsOpenAtualizar] = useState(false)
  const [venda, setVenda] = useState([] as iVenda[]);
  const limiteExibicao = 5;

  const getVenda = async () => {
    const apiRes = await apiResVendasGet();
    setVenda(apiRes.data);
  };

  useEffect(() => {
    getVenda();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getVenda();
    }, 3000);
    return () => clearTimeout(timeoutId); 
  }, [venda]);

 
  const vendasVisiveis = mostrarTudo ? venda : venda.slice(0, limiteExibicao);

  return (
    <div className={style.vendasTotais}>
      {divType === "Venda" ? (
        <div className={style.vendas}>
          <div className={style.headerVendas}>
            <h2>Vendas</h2>
            <div className={style.divFuncoes}>
            <div className={style.divBtnAtualizarVendas}>
              <button
                onClick={() => setIsOpenAtualizar(!isOpenAtualizar)}
                className={style.atualizar}
                id="atualizarVendas"  
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
               :<Iconify icon="ep:arrow-up-bold" className={style.arrowUp}/>
              }
            </button>
              
              </div>
          </div>
              {isOpenAtualizar && <ModalAtualizarVendas isOpen={isOpenAtualizar} />}
          <div className={style.caixasVenda}>
            {vendasVisiveis.map((venda: iVenda) => (
              <div key={venda.id} className={style.caixaVenda}>
                <div className={style.divProduto}>
                  <p className={style.nomeProduto}>
                    <Iconify
                      className={style.carrinhoProduto}
                      icon="game-icons:shopping-cart"
                      
                    />
                    {venda.produto.name} ({venda.quantidade} un)
                  </p>
                </div>
                <span className={style.barra}>|</span>

                <div className={style.divData}>
                  <p className={style.Data}>
                    <Iconify
                      className={style.iconData}
                      icon="noto-v1:calendar"
                     
                    />
                    {venda.data_da_venda}
                  </p>
                </div>
                <span className={style.barra}>|</span>
                <div className={style.divTotal}>
                  <p className={style.Total}>
                    <Iconify
                      className={style.carteiraTotal}
                      icon="mingcute:wallet-2-fill"
                      
                    />
                    <strong>Total:</strong> R$ {venda.total_vendido}
                  </p>
                </div>
                <span className={style.barra}>|</span>
                <div className={style.divLucro}>
                  <p className={style.Lucro}>
                    <Iconify
                      className={style.iconLucro}
                      icon="fxemoji:stockchart"
                      
                    />
                    <strong>Lucro: </strong> R$ {venda.total_lucro}
                  </p>
                </div>
              </div>
            ))}

           
            {!mostrarTudo && venda.length > limiteExibicao && (
              <div
                className={style.reticulacoes}
                style={{ fontWeight: "bold", cursor: "pointer", padding: "8px" }}
                onClick={() => setMostrarTudo(true)}
              >
                ... e mais {venda.length - limiteExibicao} vendas
              </div>
            )}
          </div>
          
          
        </div>
      ) : (
        <p>Nada de vendas</p>
      )}
      {errorMsg ? (
        <span className={style.spanError}>{errorMsg}</span>
      ) : (
        <span></span>
      )}
      
    </div>
  );
};
