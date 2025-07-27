import z from "zod"

export const CreateDoceSchema = z.object({
    name: z.string().min(1, "Precisa ser preenchido").toLowerCase(),
    preco_de_custo: z.number().min(1, "Precisa ser preenchido"),
    preco_de_venda: z.number().min(1, "Precisa ser preenchido")
})

export const ReturnDoceSchema = CreateDoceSchema.extend({
    id: z.number()
})

export type iCreateDoce = z.infer<typeof CreateDoceSchema>
export type iReturnDoce = z.infer<typeof ReturnDoceSchema>