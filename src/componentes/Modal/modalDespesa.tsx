import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import style from "./modal.module.css";
import { toast } from "react-toastify";
import { AtualizarDespesaSchema, CreateDespesaSchema, DeletarDespesaSchema} from "../../schemas/despesa.schemas";
import type {iAtualizarDespesa, iCreateDespesa, iDeletarDespesa } from "../../schemas/despesa.schemas";
import { apiResDespesaDelete, apiResDespesaPatch, apiResDespesaPost } from "../apiRes/apiResDespesa";
import type { ModalProps } from "./interfaceModal";
import CurrencyInput from "react-currency-input-field";






export const ModalDespesa = ({ isOpen }: ModalProps) => {

  const {
    control,
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
        <h1 className={style.tituloCadastroDespesa}>Cadastrar despesa</h1>
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
            <Controller
  name="valor"
  control={control}
  rules={{ required: "valor obrigatório" }}
  render={({ field }) => (
    <CurrencyInput
      placeholder="ex: 120,90"
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

export const ModalAtualizarDespesa = ({ isOpen }: ModalProps) => {

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iAtualizarDespesa>({
    mode: "onSubmit",
    resolver: zodResolver(AtualizarDespesaSchema),
    defaultValues: {
        valor: 0
    },
  });

  const atualizarDespesa = async (despesaData: iAtualizarDespesa) => {
    try {
      const apiRes = await apiResDespesaPatch(despesaData);
      if (apiRes.data) {
        toast.success("Despesa atualizada com sucesso");
      }
    } catch (errors: any) {
      toast.error(
        errors.response.data.message || "Erro ao atualizar a despesa!"
      );
    }
  };
  if (isOpen) {
    return <div className={style.divModal}>
      <div className={style.modalDespesa}>
        <h1 className={style.tituloAtualizarDespesa}>Atualizar despesa</h1>
        <form
          className={style.formDespesa}
          onSubmit={handleSubmit(atualizarDespesa)}
        >
          <div className={style.inputDiv}>
            <label className={style.label} htmlFor="despesa">
              Numero da despesa
            </label>
            <input
              placeholder="ex: 1"
              type="text"
              className={style.inputDespesa}
              {...register("id", {
                required: "Numero da despesa obrigatório",
              })}
            />
              {errors.id && errors.id && (
              <span className={style.errorMsg}>
                {errors.id?.message}
              </span>
              
            )}
            </div>
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
            <Controller
  name="valor"
  control={control}
  rules={{ required: "valor obrigatório" }}
  render={({ field }) => (
    <CurrencyInput
      placeholder="ex: 120,90"
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
          </div>
          <button type="submit" className={style.atualizarDespesaSubmit}>
            Atualizar despesa
          </button>
        </form>
      </div>
      

        </div>
  } else {
    return null;
  }
};
export const ModalDeletarDespesa = ({ isOpen }: ModalProps) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iDeletarDespesa>({
    mode: "onSubmit",
    resolver: zodResolver(DeletarDespesaSchema),
  });

  const deletarDespesa = async ({id}: iDeletarDespesa) => {
    try {
      const apiRes = await apiResDespesaDelete(id.toString())
      if (apiRes.data) {
        toast.success("Despesa deletada com sucesso");
      }
    } catch (errors: any) {
      toast.error(
        errors.response.data.message || "Erro ao deletar a despesa!"
      );
    }
  };
  if (isOpen) {
    return <div className={style.divModal}>
      <div className={style.modalDespesa}>
        <h1 className={style.tituloDeletarDespesa}>Deletar despesa</h1>
        <form
          className={style.formDespesa}
          onSubmit={handleSubmit(deletarDespesa)}
        >
          <div className={style.inputDiv}>
            <label className={style.label} htmlFor="despesa">
              Numero da despesa
            </label>
            <input
              placeholder="ex: 1"
              type="text"
              className={style.inputDespesa}
              {...register("id", {
                required: "Numero da despesa obrigatório",
              
              })}
            />
              {errors.id && errors.id && (
              <span className={style.errorMsg}>
                {errors.id?.message}
              </span>
              
            )}
      
          </div>
          <button type="submit" className={style.deletarDespesaSubmit}>
            Deletar despesa
          </button>
        </form>
      </div>
      

        </div>
  } else {
    return null;
  }
};
