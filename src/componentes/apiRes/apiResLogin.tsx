import { apiController } from "../../controller/api.controller"
import type { iCreateLogin } from "../../schemas/login.schema"

export const apiResLoginPost = async(loginData:iCreateLogin) => {
    const resApi = await apiController.post("/login", loginData)

    return resApi
}