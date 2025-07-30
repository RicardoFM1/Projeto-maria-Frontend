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
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYXJpYTEyM0BnbWFpbC5jb20iLCJpYXQiOjE3NTM3NzExMTksImV4cCI6MTc1Mzg1NzUxOSwic3ViIjoiMSJ9.wkDnXyE14U7Kn1b0Rf-pMWVbdI310oU7_Sd3iVnEOM8"
    const { id, ...data} = despesaData
    const resApi = await apiController.patch(`/despesas/${id}`, data, {
        headers:{
            'Authorization': `Bearer ${token} `
        }
    })
    return resApi
}

export const apiResDespesaDelete = async(despesaId:string) => {
    const resApi = await apiController.delete(`/despesas/${despesaId}`)
    return resApi
}