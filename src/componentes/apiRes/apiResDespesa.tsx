import { apiController } from "../../controller/api.controller"
import type { iCreateDespesa } from "../../schemas/despesa.schemas"
import type { iCreateDoce } from "../../schemas/doce.schemas"



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

export const apiResDespesaPatch = async(despesaId:string, despesaData:iCreateDespesa) => {
    const resApi = await apiController.patch(`/despesas/${despesaId}`, despesaData)
    return resApi
}

export const apiResDespesaDelete = async(despesaId:string) => {
    const resApi = await apiController.delete(`/despesas/${despesaId}`)
    return resApi
}