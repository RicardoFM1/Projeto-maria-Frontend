import { apiController } from "../../controller/api.controller"
import type { iCreateVenda } from "../../schemas/venda.schemas"


export const apiResVendasPost = async(vendaData:iCreateVenda) => {
    const resApi = await apiController.post("/vendas", vendaData)
    return resApi
}


export const apiResVendasGet = async() => {
    const resApi = await apiController.get("/vendas")
    return resApi
}

export const apiResVendasPatch = async(vendaId:iCreateVenda) => {
    const resApi = await apiController.patch(`/vendas/${vendaId}`)
    return resApi
}

export const apiResVendasDelete = async(vendaId:any) => {
    const resApi = await apiController.get(`/vendas/${vendaId}`)
    return resApi
}