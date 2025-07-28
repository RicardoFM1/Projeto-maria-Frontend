import { Iconify } from "../iconify/iconify";
import style from "./conteudoPrincipal.module.css";
import { FormRegistro } from "../counteudos/registro/formRegistro";
import { Produto } from "../counteudos/produtoDiv/produtoDiv";
import { Despesa } from "../counteudos/despesaDiv/despesaDiv";
import { Venda } from "../counteudos/vendasDiv/vendasDiv";
import { Resumo } from "../counteudos/resumoDiv/resumoDiv";

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

            <FormRegistro />
          </div>
            <Resumo divType="Resumo"/>
        </div>
        <Venda divType="Venda" />
        <Produto divType="Produto" />

        <Despesa divType="Despesa" />
      </div>
    </>
  );
};
