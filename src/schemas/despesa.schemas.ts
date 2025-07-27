import z from "zod"

export const CreateDespesaSchema = z.object({
    name: z.string().min(1, "Precisa ser preenchido").toLowerCase(),
    valor: z.number().min(1, "Precisa ser preenchido ou um número válido").positive("Precisa ser maior que 0")
})

export const ReturnDespesaSchema = CreateDespesaSchema.extend({
    id: z.number()
})

export const ReturnAllDespesasSchema = ReturnDespesaSchema.array()

export type iCreateDespesa = z.infer<typeof CreateDespesaSchema>
export type iReturnDespesa = z.infer<typeof ReturnDespesaSchema>