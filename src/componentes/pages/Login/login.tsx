import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { CreateLoginSchema, type iCreateLogin } from "../../../schemas/login.schema"
import { Iconify } from "../../iconify/iconify"
import { apiResLoginPost } from "../../apiRes/apiResLogin"
import style from "./login.module.css"


export const Login=()=>{
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState:{
            errors
        }
    } = useForm<iCreateLogin>({
        mode:"onBlur",
        resolver: zodResolver(CreateLoginSchema)
    })

    const fazerLogin = async (loginData:iCreateLogin) => {
        console.log(loginData,"loginData")
       
      try {
         const res = await apiResLoginPost(loginData)
            console.log(res,"res do axios")
       if(res.data.token){
            toast.success("Sucesso, login")
            localStorage.setItem("token",res.data.token)
           
            setTimeout(() => {
                navigate("/")
            }, 3000);
       }
      } catch (error:any) {
        console.log(error,"error")
        toast.error(error.response.data.message)
      }
    }
    return <>
    
  
   

    
    <main className={style.main}>
        <form className={style.formulario} onSubmit={handleSubmit(fazerLogin)}>
        <h1>Login</h1>
        <label htmlFor="email">E-mail</label>
            <input className={style.input} 
             type="text" placeholder="Escreva seu e-mail" {...register("email")}/>
           {errors.email && errors.email && (
              <span className={style.errorMsg}>
                {errors.email?.message}
              </span>
            )}
             <label htmlFor="Senha">Senha</label>
            <input className={style.input}    
             type="password" placeholder="****" {...register("password")}
            />
            {errors.password && errors.password && (
              <span className={style.errorMsg}>
                {errors.password?.message}
              </span>
            )}
            <button className={style.btnSubmit} type="submit">Login</button>
        </form>
    </main>
    </>
}