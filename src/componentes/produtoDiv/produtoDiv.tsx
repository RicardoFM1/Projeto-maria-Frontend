
import { Iconify } from "../iconify/iconify"
import type { produtoDivProps } from "../Interfaces/produtoDivInterface"
import style from "./produtoDiv.module.css"





export const Produto = ({ divType, errorMsg}:produtoDivProps) => {
    return <div className={style.divProduto}>
        { 
        divType === "Produto"?
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
            
            : null
        }
        
        {errorMsg?
                <span className={style.spanError}>{errorMsg}</span>
                :<span className={style.spanError}></span>
    }
         
        </div>
        
    }
