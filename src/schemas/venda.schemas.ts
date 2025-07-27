import  z  from "zod"
import { ReturnDoceSchema } from "./doce.schemas"


export const CreateVendaSchema = z.object({
    produto: z.string().min(1, "Precisa ser preenchido").toLowerCase(),
    quantidade:z.number().min(1, "Precisa ser preenchido ou um número válido").positive(
        "Precisa ser maior que 0"
    )
})

export const ReturnVendaSchema = z.object({
    produto:ReturnDoceSchema,
    quantidade: z.number(),
    total_vendido: z.number(),
    total_lucro: z.number(),
    data_da_venda: z.string(),
    id: z.number()
})

export const ReturnAllVendasSchema = ReturnVendaSchema.array()

export type iCreateVenda = z.infer<typeof CreateVendaSchema>
export type iReturnVenda = z.infer<typeof ReturnVendaSchema>

