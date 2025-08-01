import { apiController } from "../../controller/api.controller"
import type { iAtualizarDoce, iCreateDoce } from "../../schemas/doce.schemas"



export const apiResProdutoPost = async(doceData:iCreateDoce) => {
    const resApi = await apiController.post("/doces", doceData)
    return resApi
}


export const apiResProdutoGet = async() => {
    const resApi = await apiController.get("/doces")
    return resApi
}

export const apiResProdutoGetById = async(doceId:string) => {
    const resApi = await apiController.get(`/doces/${doceId}`)
    return resApi
}

export const apiResProdutoPatch = async(doceData: iAtualizarDoce) => {
    const token = localStorage.getItem("token")
    const { id, ...data} = doceData
    const resApi = await apiController.patch(`/doces/${id}`, data, {
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
    return resApi
}
