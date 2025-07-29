import { apiController } from "../../controller/api.controller"
import type { iAtualizarVenda, iCreateVenda } from "../../schemas/venda.schemas"


export const apiResVendasPost = async(vendaData:iCreateVenda) => {
    const resApi = await apiController.post("/vendas", vendaData)
    return resApi
}


export const apiResVendasGet = async() => {
    const resApi = await apiController.get("/vendas")
    return resApi
}

export const apiResVendasResumoGet = async() => {
    const resApi = await apiController.get("/vendas/resumo")
    return resApi
}

export const apiResVendasGetById = async(vendaId:string) => {
    const resApi = await apiController.get(`/vendas/${vendaId}`)
    return resApi
}

export const apiResVendasPatch = async(_:string, vendaData:iAtualizarVenda) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYXJpYTEyM0BnbWFpbC5jb20iLCJpYXQiOjE3NTM3NzExMTksImV4cCI6MTc1Mzg1NzUxOSwic3ViIjoiMSJ9.wkDnXyE14U7Kn1b0Rf-pMWVbdI310oU7_Sd3iVnEOM8"
    const { id , ...data} = vendaData
    const resApi = await apiController.patch(`/vendas/${id}`, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return resApi
}

export const apiResVendasDelete = async(vendaId:string) => {
    const resApi = await apiController.delete(`/vendas/${vendaId}`)
    return resApi
}