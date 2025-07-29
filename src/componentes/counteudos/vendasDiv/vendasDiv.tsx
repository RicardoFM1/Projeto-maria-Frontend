import { useEffect, useState } from "react";
import { Iconify } from "../../iconify/iconify";
import style from "./vendasDiv.module.css";
import type { iVenda, vendaDivProps } from "../../Interfaces/vendasDivInterface";
import { apiResVendasGet } from "../../apiRes/apiResVendas";

export const Venda = ({ errorMsg, divType }: vendaDivProps) => {
  const [mostrarTudo, setMostrarTudo] = useState(false);
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
          <div className={style.tituloVendas}>
            <h2>Vendas</h2>
            <button onClick={() => setMostrarTudo(!mostrarTudo)}>
              {mostrarTudo ? "Mostrar menos" : "Mostrar mais"}
            </button>
          </div>
          <div className={style.caixasVenda}>
            {vendasVisiveis.map((venda: iVenda) => (
              <div key={venda.id} className={style.caixaVenda}>
                <div className={style.divProduto}>
                  <p className={style.nomeProduto}>
                    <Iconify
                      ClassName={style.carrinhoProduto}
                      icon="game-icons:shopping-cart"
                      width={24}
                      height={24}
                    />
                    {venda.produto.name} ({venda.quantidade} un)
                  </p>
                </div>
                <span className={style.barra}>|</span>

                <div className={style.divData}>
                  <p className={style.Data}>
                    <Iconify
                      ClassName={style.iconData}
                      icon="noto-v1:calendar"
                      width={24}
                      height={24}
                    />
                    {venda.data_da_venda}
                  </p>
                </div>
                <span className={style.barra}>|</span>
                <div className={style.divTotal}>
                  <p className={style.Total}>
                    <Iconify
                      ClassName={style.carteiraTotal}
                      icon="mingcute:wallet-2-fill"
                      width={24}
                      height={24}
                    />
                    <strong>Total:</strong> R$ {venda.total_vendido}
                  </p>
                </div>
                <span className={style.barra}>|</span>
                <div className={style.divLucro}>
                  <p className={style.Lucro}>
                    <Iconify
                      ClassName={style.iconLucro}
                      icon="fxemoji:stockchart"
                      width={24}
                      height={24}
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
