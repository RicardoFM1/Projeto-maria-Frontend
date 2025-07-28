import { useEffect, useState } from "react";
import { Iconify } from "../iconify/iconify";
import style from "./vendasDiv.module.css";
import type { iVenda, vendaDivProps } from "../Interfaces/vendasDivInterface";
import { apiResVendasGet } from "../apiRes/apiResVendas";

export const Venda = ({ errorMsg, divType }: vendaDivProps) => {
//   const [isOpen, setIsOpen] = useState(false);

  const [venda, setVenda] = useState([] as any);
  const getVenda = async () => {
    const apiRes = await apiResVendasGet();
    setVenda(apiRes.data);
  };

  useEffect(() => {
    getVenda();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getVenda();
    }, 3000);
  }, [venda]);

  return (
    <div className={style.vendasTotais}>
      {divType === "Venda" ? (
        <div className={style.vendas}>
          <div className={style.tituloVendas}>
            <h2>Vendas</h2>
          </div>
          <div className={style.caixasVenda}>
            {venda.map((venda: iVenda) => (
              <>
                <div className={style.caixaVenda}>
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
                      <strong>Total:</strong>R$ {venda.total_vendido}
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
              </>
            ))}
            </div>
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
