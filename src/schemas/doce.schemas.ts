import z from "zod"

export const CreateDoceSchema = z.object({
    name: z.string(),
    preco_de_custo: z.number(),
    preco_de_venda: z.number()
})

export const ReturnDoceSchema = CreateDoceSchema.extend({
    id: z.number()
})

export type iCreateDoce = z.infer<typeof CreateDoceSchema>
export type iReturnDoce = z.infer<typeof ReturnDoceSchema>