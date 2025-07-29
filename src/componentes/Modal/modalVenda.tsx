import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import type { ModalProps } from "./interfaceModal";
import style from "./modal.module.css"
import { AtualizarVendaSchema, type iAtualizarVenda } from "../../schemas/venda.schemas";
import { apiResVendasPatch } from "../apiRes/apiResVendas";

export const ModalAtualizarVendas = ({ isOpen }: ModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iAtualizarVenda>({
    mode: "onSubmit",
    resolver: zodResolver(AtualizarVendaSchema),
    
  });

  const atualizarDespesa = async (vendaData: iAtualizarVenda) => {
    try {
      const apiRes = await apiResVendasPatch(`/doces/${vendaData.id}`, vendaData);
      if (apiRes.data) {
        toast.success("Venda atualizada com sucesso");
      }
    } catch (errors: any) {
      toast.error(
        errors.response.data.message || "Erro ao atualizar a venda!"
      );
    }
  };
  if (isOpen) {
    return <div className={style.divModal}>
      <div className={style.modalVenda}>
        <h1 className={style.tituloAtualizarProduto}>Atualizar venda</h1>
        <form
          className={style.formVenda}
          onSubmit={handleSubmit(atualizarDespesa)}
        >
          <div className={style.inputDiv}>
            <label className={style.label} htmlFor="venda">
              Numero da venda
            </label>
            <input
              placeholder="ex: 1"
              type="text"
              className={style.inputVenda}
              {...register("id", {
                required: "Numero do produto obrigatório",
               
              })}
              
            />
            {errors.id && errors.id && (
              <span className={style.errorMsg}>
                {errors.id?.message}
              </span>
            )}
            <label className={style.label} htmlFor="venda">
              Produto novo
            </label>
            <input
              placeholder="ex: Brigadeiro"
              type="text"
              className={style.inputVenda}
              {...register("produto", {
                required: "Produto obrigatório",
              })}
            />
              {errors.produto && errors.produto && (
              <span className={style.errorMsg}>
                {errors.produto?.message}
              </span>
              
            )}
          </div>
          <div className={style.inputDiv}>
            <label className={style.label} htmlFor="venda">
              Quantidade
            </label>
            <input
              placeholder="ex: 20"
              type="number"
              className={style.inputVenda}
              {...register("quantidade", {
                required: "Quantidade obrigatória",
                valueAsNumber: true
              })}
              
            />
    {errors.quantidade && (
  <span className={style.errorMsg}>
    {errors.quantidade.message}
  </span>
)}
          </div >
          
          <button type="submit" className={style.atualizarVendaSubmit}>
            Atualizar venda
          </button>
        </form>
      </div>
    
    </div>
  } else {
    return null;
  }
};




