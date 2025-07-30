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
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYXJpYTEyM0BnbWFpbC5jb20iLCJpYXQiOjE3NTM3NzExMTksImV4cCI6MTc1Mzg1NzUxOSwic3ViIjoiMSJ9.wkDnXyE14U7Kn1b0Rf-pMWVbdI310oU7_Sd3iVnEOM8"
    const { id, ...data} = doceData
    const resApi = await apiController.patch(`/doces/${id}`, data, {
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
    return resApi
}
