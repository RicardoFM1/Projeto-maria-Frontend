import { Iconify } from "../iconify/iconify"
import style from "./conteudoPrincipal.module.css"

export const ConteudoPrincipal=()=>{
   return <>
    <div className={style.divPrincipal}>
    <div className={style.divHeader}>
        <h1 className={style.title}><Iconify ClassName={style.cupcake} icon="openmoji:cupcake" width={42} height={42}/>Maria's cupcake</h1>
        <p className={style.pc}>Controle de Vendas e Lucros</p>
   </div>
   <div className={style.caixaPrincipal}>
   <div className={style.registrarVenda}>
     <h2><Iconify ClassName={style.graph} icon="uis:graph-bar" width={24} height={24}/>Registrar Venda</h2>
     <div className={style.caixapp}>
 <p>Quantidade de Cupcakes</p>
     <input type="number" placeholder="ex: 5"/>
     </div>
    
  <div className={style.caixapp2}>
     <p>Data da Venda</p>
     <input type="date" />
  </div>
     <button className={style.registrar} id="registrarVenda">registrar venda</button>
     {/* <div className={style.teste}></div> */}
   </div>
   <div className={style.resumoHoje}>
   </div>
   </div>
   <div className={style.custosMensais}>

   </div>
   </div>

    

   </>
}