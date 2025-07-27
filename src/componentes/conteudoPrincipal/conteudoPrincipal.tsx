import { Iconify } from "../iconify/iconify";
import style from "./conteudoPrincipal.module.css";
import { FormRegistro } from "../input/formRegistro";
import { Produto } from "../produtoDiv/produtoDiv";
import { Despesa } from "../despesaDiv/despesaDiv";


export const ConteudoPrincipal = () => {
  // const [doces, setDoces] = useState([]);
  // const getDoces = async () => {
  //   const apiRes = await apiResProdutoGet();
  //   setDoces(apiRes.data);
  // };
  // const [vendas, setVendas] = useState([]);
  // const getVendas = async () => {
  //   const apiRes = await apiController.get("/vendas");
  //   setVendas(apiRes.data);
  // };




  // useEffect(() => {
  //   getVendas();
  //   getDoces();
  // }, []);
  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log(vendas);
  //   }, 3000);
  // }, [vendas]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log(doces);
  //   }, 3000);
  // }, [doces]);
  


  


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
      <Produto divType="Produto" />
       
       <Despesa divType="Despesa" />
      </div>
    </>
  );
};
