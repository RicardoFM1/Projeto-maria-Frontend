import { apiController } from "../../controller/api.controller"
import type { iAtualizarDespesa, iCreateDespesa } from "../../schemas/despesa.schemas"




export const apiResDespesaPost = async(despesaData:iCreateDespesa) => {
    const resApi = await apiController.post("/despesas", despesaData)
    return resApi
}


export const apiResDespesaGet = async() => {
    const resApi = await apiController.get("/despesas")
    return resApi
}

export const apiResDespesaGetById = async(despesaId:string) => {
    const resApi = await apiController.get(`/despesas/${despesaId}`)
    return resApi
}

export const apiResDespesaPatch = async(despesaData:iAtualizarDespesa) => {
    const token = localStorage.getItem("token")
    const { id, ...data} = despesaData
    const resApi = await apiController.patch(`/despesas/${id}`, data, {
        headers:{
            'Authorization': `Bearer ${token} `
        }
    })
    return resApi
}

export const apiResDespesaDelete = async(id:string) => {
    const token = localStorage.getItem("token")
    const resApi = await apiController.delete(`/despesas/${id}`, {
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
    return resApi
}