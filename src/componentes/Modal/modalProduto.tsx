import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { type iAtualizarDoce, type iCreateDoce, AtualizarDoceSchema, CreateDoceSchema } from "../../schemas/doce.schemas";
import { apiResProdutoPatch, apiResProdutoPost } from "../apiRes/apiResProdutos";
import type { ModalProps } from "./interfaceModal";
import style from "./modal.module.css"
import CurrencyInput from "react-currency-input-field";

export const ModalProduto = ({ isOpen }: ModalProps) => {
  const {
    control,
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
            <Controller
  name="preco_de_custo"
  control={control}
  rules={{ required: "Preço de custo obrigatório" }}
  render={({ field }) => (
    <CurrencyInput
      placeholder="ex: 12,99"
      decimalsLimit={2}
      decimalSeparator=","
      groupSeparator="." 
      prefix="R$ "
      className={style.inputProduto}
      defaultValue={(field.value ?? 0) / 100} 
      onValueChange={(value) => {
        const numericValue = value
          ? Math.round(parseFloat(value.replace(',', '.')) * 100)
          : 0;
        field.onChange(numericValue); 
      }}
    />
  )}
/>
{errors.preco_de_custo && (
  <span className={style.errorMsg}>
    {errors.preco_de_custo.message}
  </span>
)}
          </div >
          <div className={style.inputDiv}>
            <label className={style.label} htmlFor="produto">
              Preço de venda
            </label>
           <Controller
  name="preco_de_venda"
  control={control}
  rules={{ required: "Preço de venda obrigatório" }}
  render={({ field }) => (
    <CurrencyInput
      placeholder="ex: 15,50"
      decimalsLimit={2}
      decimalSeparator=","
      groupSeparator="."
      prefix="R$ "
      className={style.inputProduto}
      defaultValue={(field.value ?? 0) / 100}
      onValueChange={(value) => {
        const numericValue = value
          ? Math.round(parseFloat(value.replace(',', '.')) * 100)
          : 0;
        field.onChange(numericValue);
      }}
    />
  )}
/>
{errors.preco_de_venda && (
  <span className={style.errorMsg}>
    {errors.preco_de_venda.message}
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



export const ModalAtualizarProduto = ({ isOpen }: ModalProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iAtualizarDoce>({
    mode: "onSubmit",
    resolver: zodResolver(AtualizarDoceSchema),
    defaultValues: {
      preco_de_custo: 0,
      preco_de_venda: 0,
    },
  });

  const atualizarProduto = async (doceData: iAtualizarDoce) => {
    try {
      const apiRes = await apiResProdutoPatch(doceData);
      if (apiRes.data) {
        toast.success("Produto atualizado com sucesso");
      }
    } catch (errors: any) {
      toast.error(
        errors.response.data.message || "Erro ao atualizar o produto!"
      );
    }
  };
  if (isOpen) {
    return <div className={style.divModal}>
      <div className={style.modalProduto}>
        <h1 className={style.tituloAtualizarProduto}>Atualizar produto</h1>
        <form
          className={style.formProduto}
          onSubmit={handleSubmit(atualizarProduto)}
        >
          <div className={style.inputDiv}>
            <label className={style.label} htmlFor="produto">
              Numero do produto
            </label>
            <input
              placeholder="ex: 1"
              type="text"
              className={style.inputProduto}
              {...register("id", {
                required: "Numero do produto obrigatório",
               
              })}
              
            />
            {errors.id && errors.id && (
              <span className={style.errorMsg}>
                {errors.id?.message}
              </span>
            )}
            <label className={style.label} htmlFor="produto">
              Produto novo
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
            <Controller
  name="preco_de_custo"
  control={control}
  rules={{ required: "Preço de custo obrigatório" }}
  render={({ field }) => (
    <CurrencyInput
      placeholder="ex: 12,99"
      decimalsLimit={2}
      decimalSeparator=","
      groupSeparator="." 
      prefix="R$ "
      className={style.inputProduto}
      defaultValue={(field.value ?? 0) / 100} 
      onValueChange={(value) => {
        const numericValue = value
          ? Math.round(parseFloat(value.replace(',', '.')) * 100)
          : 0;
        field.onChange(numericValue); 
      }}
    />
  )}
/>
{errors.preco_de_custo && (
  <span className={style.errorMsg}>
    {errors.preco_de_custo.message}
  </span>
)}
          </div >
          <div className={style.inputDiv}>
            <label className={style.label} htmlFor="produto">
              Preço de venda
            </label>
           <Controller
  name="preco_de_venda"
  control={control}
  rules={{ required: "Preço de venda obrigatório" }}
  render={({ field }) => (
    <CurrencyInput
      placeholder="ex: 15,50"
      decimalsLimit={2}
      decimalSeparator=","
      groupSeparator="."
      prefix="R$ "
      className={style.inputProduto}
      defaultValue={(field.value ?? 0) / 100}
      onValueChange={(value) => {
        const numericValue = value
          ? Math.round(parseFloat(value.replace(',', '.')) * 100)
          : 0;
        field.onChange(numericValue);
      }}
    />
  )}
/>
{errors.preco_de_venda && (
  <span className={style.errorMsg}>
    {errors.preco_de_venda.message}
  </span>
)}
          </div>
          <button type="submit" className={style.atualizarDoceSubmit}>
            Atualizar produto
          </button>
        </form>
      </div>
    
    </div>
  } else {
    return null;
  }
};