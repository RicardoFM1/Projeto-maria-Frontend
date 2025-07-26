import { use, useEffect, useState } from "react";
import { Iconify } from "../iconify/iconify";
import style from "./conteudoPrincipal.module.css";

export const ConteudoPrincipal = () => {
  type Registro = {
    Produto: string;
    Quantidade: string;
  };

  const [registros, setRegistros] = useState<Registro[]>([
    { Produto: "", Quantidade: "" },
  ]);
  const [showRemove, setShowRemove] = useState(true);

  useEffect(() => {
   
    if (registros.length <= 1) {
      setShowRemove(false);
      setTimeout(() => setShowRemove(false), 300);
    } else {

      setShowRemove(true);
    }
  }, [registros]);

  const handleChange = (
    index: number,
    field: keyof Registro,
    value: string
  ) => {
    const novosRegistros = [...registros];
    novosRegistros[index][field] = value;

    setRegistros(novosRegistros);
  };
  const AdicionarRegistro = () => {
    console.log("registroAdd");
    setRegistros([...registros, { Produto: "", Quantidade: "" }]);
  };

  const RemoverRegistro = () => {
    if (registros.length > 1) {
      setRegistros(registros.slice(0, -1));
    }
  };

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

            {registros.map((registro, index) => (
              <div key={index} className={style.inputsRegistrar}>
                <div className={style.caixapp}>
                  <p>Produto</p>
                  <div>
                    <input
                      type="text"
                      placeholder="ex: Cupcake"
                      value={registro.Produto}
                      onChange={(e) =>
                        handleChange(index, "Produto", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className={style.caixapp2}>
                  <p>Quantidade</p>
                  <input
                    type="number"
                    placeholder="ex: 5"
                    value={registro.Quantidade}
                    onChange={(e) =>
                      handleChange(index, "Quantidade", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}

            <button
              onClick={AdicionarRegistro}
              className={style.adicionarRegistro}
              id="addRegistro"
            >
              <Iconify
                ClassName={style.add}
                icon="streamline:add-1-solid"
                width={24}
                height={24}
              />
              Adicionar
            </button>

            <div
              className={`${style.removerRegistroAnim} ${
                showRemove ? "" : style.removerRegistroAnimEscondido
              }`}
            >
              <button
                onClick={RemoverRegistro}
                className={style.removerRegistro}
                id="removeRegistro"
              >
                <Iconify
                  ClassName={style.remove}
                  icon="material-symbols:remove-rounded"
                  width={24}
                  height={24}
                />
                Remover
              </button>
            </div>

            <button className={style.registrar} id="btnRegistrarVenda">
              registrar venda
            </button>
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
        <div className={style.vendas}>
          <h2>vendas</h2>
          <div className={style.caixaVenda}>
            <div className={style.caixaVendaPrincipal}>
              <div className={style.caixaVendaSecundaria}>
                <p>24x</p>
                <p>cupcake</p>
              </div>
              <div className={style.caixaVendaTerciaria}>
                <p>Faturamento</p>
                <p>Faturamento total:</p>
                <p>lucro</p>
              </div>
            </div>
            <div className={style.caixaData}>data:</div>
            <div className={style.caixaTFL}>
              <p className={style.totalP}>total:</p> Faturamento: lucro:
            </div>
          </div>
        </div>
        <div className={style.Produtos}>
          <h2>produtos</h2>
          <div className={style.caixaT}>
            <button className={style.adicionar} id="addProdutos">
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
        <div className={style.custosMensais}>
          <h2>Custos mensais</h2>
          <div className={style.caixaT}>
            <button className={style.adicionar} id="addProdutos">
              <Iconify
                ClassName={style.add}
                icon="streamline:add-1-solid"
                width={24}
                height={24}
              />
              adicionar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
