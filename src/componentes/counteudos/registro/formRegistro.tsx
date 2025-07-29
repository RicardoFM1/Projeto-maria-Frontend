import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import type { iCreateVenda } from "../../../schemas/venda.schemas";
import { CreateVendaSchema } from "../../../schemas/venda.schemas";
import { apiResVendasPost } from "../../apiRes/apiResVendas";
import type { inputProps } from "../../Interfaces/registroInterface";
import style from "./formRegistro.module.css";



export const FormRegistro = ({
  list,
  errorMsg,
  label,
  className,
}: inputProps) => {
  // const [registros, _setRegistros] = useState<Registro[]>([
  //   { Produto: "", Quantidade: 0 },
  // ]);
  // const [showRemove, setShowRemove] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iCreateVenda>({
    mode: "onSubmit",
    resolver: zodResolver(CreateVendaSchema),
    defaultValues: {
      produto: "",
      quantidade: 0,
    },
  });

  // useEffect(() => {
  //   setShowRemove(registros.length > 1);
  // }, [registros]);

  // const AdicionarRegistro = () => {
  //   setRegistros([...registros, { Produto: "", Quantidade: 0 }]);
  // };

  // const RemoverRegistro = () => {
  //   if (registros.length > 1) {
  //     setRegistros(registros.slice(0, -1));
  //   }
  // };

  const cadastrarVenda = async (vendaData: iCreateVenda) => {
    try {
      const apiRes = await apiResVendasPost(vendaData);
      if (apiRes.data) {
        toast.success("Venda cadastrada com sucesso!");
      }
    } catch (errors: any) {
      toast.error(errors.response?.data?.message || "Erro ao cadastrar venda");
    }
  };

  return (
    <form className={style.formRegistro} onSubmit={handleSubmit(cadastrarVenda)}>
      <label htmlFor={label}>{label}</label>

      
        <div className={style.inputsRegistrar}>
          <div className={style.caixapp}>
            <label htmlFor="produto">Produto</label>
            <input
              type="text"
              placeholder="ex: Cupcake"
              list={list}
              {...register(`produto`, {
                required: "Produto obrigatório"
              })}
              className={style.inputProduto}
            />
            {errors.produto && errors.produto && (
              <span className={style.errorMsg}>{errors.produto?.message}</span>
            )}
          </div>

          <div className={style.caixapp2}>
            <label htmlFor="quantidade">Quantidade</label>
            <input
              
              type="number"
              placeholder="ex: 5"
              {...register(`quantidade`, {
                valueAsNumber: true,
                required: "Quantidade obrigatória",
                validate: (value) =>
                  !isNaN(value) ? true : "Precisa ser um número",
              })}
              className={style.inputQuantidade}
            />
            {errors.quantidade && errors.quantidade && (
              <span className={style.errorMsg}>
                {errors.quantidade?.message}
              </span>
            )}
          </div>
        </div>
    

      {errorMsg && <span className={className}>{errorMsg}</span>}

      

      
      

      <button
        type="submit"
        className={style.registrar}
        id="btnRegistrarVenda"
      >
        Registrar Venda
      </button>
    </form>

    
  );
};
