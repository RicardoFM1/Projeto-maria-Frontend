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

export const apiResVendasResumoPorProdutoGet = async(produtoId:string) => {
    const resApi = await apiController.get(`/vendas/resumo/${produtoId}`)
    return resApi
}

export const apiResVendasGetById = async(vendaId:string) => {
    const resApi = await apiController.get(`/vendas/${vendaId}`)
    return resApi
}

export const apiResVendasPatch = async(vendaData:iAtualizarVenda) => {
    const token = localStorage.getItem("token")
    const { id , ...data} = vendaData
    const resApi = await apiController.patch(`/vendas/${id}`, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return resApi
}

export const apiResVendasDelete = async(vendaId:string) => {
    const token = localStorage.getItem("token")
    const resApi = await apiController.delete(`/vendas/${vendaId}`, {
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
    return resApi
}