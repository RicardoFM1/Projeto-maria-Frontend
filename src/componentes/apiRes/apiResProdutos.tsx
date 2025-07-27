import { apiController } from "../../controller/api.controller"
import type { iCreateDoce } from "../../schemas/doce.schemas"



export const apiResProdutoPost = async(vendaData:iCreateDoce) => {
    const resApi = await apiController.post("/doces", vendaData)
    return resApi
}


export const apiResProdutoGet = async() => {
    const resApi = await apiController.get("/doces")
    return resApi
}

export const apiResProdutoGetById = async(vendaId:string) => {
    const resApi = await apiController.get(`/doces/${vendaId}`)
    return resApi
}

export const apiResProdutoPatch = async(vendaId:string, vendaData:iCreateDoce) => {
    const resApi = await apiController.patch(`/doces/${vendaId}`, vendaData)
    return resApi
}
