import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type iCreateDoce, CreateDoceSchema } from "../../schemas/doce.schemas";
import style from "./modal.module.css";
import { apiResProdutoPost } from "../apiRes/apiResProdutos";
import { toast } from "react-toastify";
import { CreateDespesaSchema} from "../../schemas/despesa.schemas";
import type {iCreateDespesa } from "../../schemas/despesa.schemas";
import { apiResDespesaPost } from "../apiRes/apiResDespesa";

interface ModalProps {
  isOpen: true | false;
  className?: string;
}

export const ModalProduto = ({ isOpen }: ModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iCreateDoce>({
    mode: "onSubmit",
    resolver: zodResolver(CreateDoceSchema),
    defaultValues: {
      preco_de_custo: 0,
      preco_de_venda: 0,
    },
  });

  const cadastrarDoce = async (doceData: iCreateDoce) => {
    try {
      const apiRes = await apiResProdutoPost(doceData);
      if (apiRes.data) {
        toast.success("Produto cadastrado com sucesso");
      }
    } catch (errors: any) {
      toast.error(
        errors.response.data.message || "Erro ao cadastrar o produto!"
      );
    }
  };
  if (isOpen) {
    return <div className={style.divModal}>
      <div className={style.modalProduto}>
        <h1 className={style.tituloCadastroProduto}>Cadastrar produto</h1>
        <form
          className={style.formProduto}
          onSubmit={handleSubmit(cadastrarDoce)}
        >
          <div className={style.inputDiv}>
            <label className={style.label} htmlFor="produto">
              Produto
            </label>
            <input
              placeholder="ex: Brigadeiro"
              type="text"
              className={style.inputProduto}
              {...register("name", {
                required: "Produto obrigatório",
              })}
            />
              {errors.name && errors.name && (
              <span className={style.errorMsg}>
                {errors.name?.message}
              </span>
              
            )}
          </div>
          <div className={style.inputDiv}>
            <label className={style.label} htmlFor="produto">
              Preço de custo
            </label>
            <input
              placeholder="ex: 5,00"
              type="number"
              className={style.inputProduto}
              {...register("preco_de_custo", {
                required: "Preco de custo obrigatório obrigatório",
                valueAsNumber: true
              }
            )}
            />
              {errors.preco_de_custo && errors.preco_de_custo && (
              <span className={style.errorMsg}>
                {errors.preco_de_custo?.message}
              </span>
              
            )}
          </div >
          <div className={style.inputDiv}>
            <label className={style.label} htmlFor="produto">
              Preço de venda
            </label>
            <input
              placeholder="ex: 10,00"
              type="number"
              className={style.inputProduto}
              {...register("preco_de_venda", {
                required: "Preco de venda obrigatório",
                valueAsNumber: true
              })}
            />
            {errors.preco_de_venda && errors.preco_de_venda && (
              <span className={style.errorMsg}>
                {errors.preco_de_venda?.message}
              </span>

            )}
          </div>
          <button type="submit" className={style.cadastrarDoceSubmit}>
            Cadastrar produto
          </button>
        </form>
      </div>
    
    </div>
  } else {
    return null;
  }
};

export const ModalDespesa = ({ isOpen }: ModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iCreateDespesa>({
    mode: "onSubmit",
    resolver: zodResolver(CreateDespesaSchema),
    defaultValues: {
        valor: 0
    },
  });

  const cadastrarDespesa = async (despesaData: iCreateDespesa) => {
    try {
      const apiRes = await apiResDespesaPost(despesaData);
      if (apiRes.data) {
        toast.success("Despesa cadastrada com sucesso");
      }
    } catch (errors: any) {
      toast.error(
        errors.response.data.message || "Erro ao cadastrar a despesa!"
      );
    }
  };
  if (isOpen) {
    return <div className={style.divModal}>
      <div className={style.modalDespesa}>
        <h1 className={style.tituloCadastroDespesa}>Cadastrar produto</h1>
        <form
          className={style.formDespesa}
          onSubmit={handleSubmit(cadastrarDespesa)}
        >
          <div className={style.inputDiv}>
            <label className={style.label} htmlFor="despesa">
              Despesa
            </label>
            <input
              placeholder="ex: Água"
              type="text"
              className={style.inputDespesa}
              {...register("name", {
                required: "Despesa obrigatória",
              })}
            />
              {errors.name && errors.name && (
              <span className={style.errorMsg}>
                {errors.name?.message}
              </span>
              
            )}
          </div>
          <div className={style.inputDiv}>
            <label className={style.label} htmlFor="valor">
              Valor
            </label>
            <input
              placeholder="ex: 100,00"
              type="number"
              className={style.inputDespesa}
              {...register("valor", {
                required: "valor obrigatório",
                valueAsNumber: true
              }
            )}
            />
              {errors.valor && errors.valor && (
              <span className={style.errorMsg}>
                {errors.valor?.message}
              </span>
              
            )}
          </div>
          <button type="submit" className={style.cadastrarDespesaSubmit}>
            Cadastrar despesa
          </button>
        </form>
      </div>
      

        </div>
  } else {
    return null;
  }
};
