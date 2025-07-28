import { Iconify } from "../iconify/iconify";
import style from "./conteudoPrincipal.module.css";
import { FormRegistro } from "../registro/formRegistro";
import { Produto } from "../produtoDiv/produtoDiv";
import { Despesa } from "../despesaDiv/despesaDiv";
import { Venda } from "../vendasDiv/vendasDiv";



export const ConteudoPrincipal = () => {

  return (
    <>
      <div className={style.divPrincipal}>
        <div className={style.divHeader}>
          <h1 className={style.title}>
            <Iconify
              ClassName={style.cupcake}
              icon="openmoji:cupcake"
              width={42}
              height={42}
            />
            Maria's cupcake
          </h1>
          <p className={style.pc}>Controle de Vendas e Lucros</p>
        </div>
        <div className={style.caixaPrincipal}>
          <div className={style.registrarVenda}>
            <h2>
              <Iconify
                ClassName={style.graph}
                icon="uis:graph-bar"
                width={24}
                height={24}
              />
              Registrar Venda
            </h2>

          <FormRegistro/>


              

              
          </div>
          <div className={style.resumoHoje}>
            <h2>
              <Iconify
                ClassName={style.graph}
                icon="noto-v1:money-bag"
                width={24}
                height={24}
              />{" "}
              Resumo de hoje
            </h2>
            <div className={style.caixaStatus}>
              <div className={style.resumoStatus}>
                <p>0</p>
                <p className={style.pStatus}>Produtos vendidos</p>
              </div>
              <div className={style.resumoStatus}>
                <p>R$0,00</p>
                <p className={style.pStatus}>Faturamento</p>
              </div>

              <div className={style.resumoStatus}>
                <p>R$0,00</p>
                <p className={style.pStatus}>Lucro</p>
              </div>
            </div>
            <p className={style.vendasHoje}>vendas de hoje</p>
          </div>
        </div>
        <Venda divType="Venda" /> 
        <Produto divType="Produto" />
       
        <Despesa divType="Despesa" />
      </div>
    </>
  );
};
