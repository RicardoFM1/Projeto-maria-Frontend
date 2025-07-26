import  z  from "zod"
import { ReturnDoceSchema } from "./doce.schemas"

export const CreateVendaSchema = z.object({
    produto: ReturnDoceSchema.pick({id: true}).array(),
    quantidade: z.number()
})
export const ReturnVendaSchema = z.object({
    produto:ReturnDoceSchema,
    quantidade: z.number(),
    total_vendido: z.number(),
    total_lucro: z.number(),
    data_da_venda: z.string(),
    id: z.number()
})

export type iCreateVenda = z.infer<typeof CreateVendaSchema>
export type iReturnVenda = z.infer<typeof ReturnVendaSchema>

