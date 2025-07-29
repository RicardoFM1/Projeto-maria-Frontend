import z from "zod"

export const CreateDoceSchema = z.object({
    name: z.string().min(1, "Precisa ser preenchido").toLowerCase(),
    preco_de_custo: z.number().min(1, "Precisa ser preenchido ou um número válido").positive("Precisa ser maior que 0"),
    preco_de_venda: z.number().min(1, "Precisa ser preenchido ou um número válido").positive("Precisa ser maior que 0")
})
export const AtualizarDoceSchema = z.object({
    id: z.string().min(1, "Precisa ser preenchido"),
    name: z.string().min(1, "Precisa ser preenchido").toLowerCase(),
    preco_de_custo: z.number().min(1, "Precisa ser preenchido ou um número válido").positive("Precisa ser maior que 0"),
    preco_de_venda: z.number().min(1, "Precisa ser preenchido ou um número válido").positive("Precisa ser maior que 0")
})

export const ReturnDoceSchema = CreateDoceSchema.extend({
    id: z.number()
})

export const ReturnAllDocesSchema = ReturnDoceSchema.array()

export type iCreateDoce = z.infer<typeof CreateDoceSchema>
export type iReturnDoce = z.infer<typeof ReturnDoceSchema>
export type iAtualizarDoce = z.infer<typeof AtualizarDoceSchema>