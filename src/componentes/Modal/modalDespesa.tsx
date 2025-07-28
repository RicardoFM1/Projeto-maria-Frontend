import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import style from "./modal.module.css";
import { toast } from "react-toastify";
import { CreateDespesaSchema} from "../../schemas/despesa.schemas";
import type {iCreateDespesa } from "../../schemas/despesa.schemas";
import { apiResDespesaPost } from "../apiRes/apiResDespesa";
import type { ModalProps } from "./interfaceModal";





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

// export const ModalVenda = ({isOpen}:ModalProps) => {
//     const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<iCreateVenda>({
//     mode: "onSubmit",
//     resolver: zodResolver(CreateVendaSchema)
//   });

//   const atualizarVenda = async (vendaId:string, vendaData: iCreateVenda) => {
//     try {
//       const apiRes = await apiResVendasPatch(vendaData, vendaId);
//       if (apiRes.data) {
//         toast.success("Venda atualizada com sucesso");
//       }
//     } catch (errors: any) {
//       toast.error(
//         errors.response.data.message || "Erro ao cadastrar a despesa!"
//       );
//     }
//   };
//   if (isOpen) {
//     return <div className={style.divModal}>
//       <div className={style.modalDespesa}>
//         <h1 className={style.tituloCadastroDespesa}>Cadastrar despesa</h1>
//         <form
//           className={style.formDespesa}
//           onSubmit={handleSubmit(cadastrarDespesa)}
//         >
//           <div className={style.inputDiv}>
//             <label className={style.label} htmlFor="despesa">
//               Despesa
//             </label>
//             <input
//               placeholder="ex: Água"
//               type="text"
//               className={style.inputDespesa}
//               {...register("name", {
//                 required: "Despesa obrigatória",
//               })}
//             />
//               {errors.name && errors.name && (
//               <span className={style.errorMsg}>
//                 {errors.name?.message}
//               </span>
              
//             )}
//           </div>
//           <div className={style.inputDiv}>
//             <label className={style.label} htmlFor="valor">
//               Valor
//             </label>
//             <input
//               placeholder="ex: 100,00"
//               type="number"
//               className={style.inputDespesa}
//               {...register("valor", {
//                 required: "valor obrigatório",
//                 valueAsNumber: true
//               }
//             )}
//             />
//               {errors.valor && errors.valor && (
//               <span className={style.errorMsg}>
//                 {errors.valor?.message}
//               </span>
              
//             )}
//           </div>
//           <button type="submit" className={style.cadastrarDespesaSubmit}>
//             Cadastrar despesa
//           </button>
//         </form>
//       </div>
      

//         </div>
//   } else {
//     return null;
//   }
// }
