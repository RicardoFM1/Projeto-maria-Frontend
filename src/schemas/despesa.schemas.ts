import z from "zod"
import { CreateDoceSchema } from "./doce.schemas"

export const CreateDespesaSchema = z.object({
    name: z.string().min(1, "Precisa ser preenchido").toLowerCase(),
    valor: z.number().min(1, "Precisa ser preenchido ou um número válido").positive("Precisa ser maior que 0")
})

export const ReturnDespesaSchema = CreateDespesaSchema.extend({
    id: z.number()
})

export const AtualizarDespesaSchema = z.object({
    id: z.string().min(1, "Precisa ser preenchido"),
    name: z.string().min(1, "Precisa ser preenchido").toLowerCase(),
    valor: z.number().min(1, "Precisa ser preenchido ou um número válido").positive("Precisa ser maior que 0")
})

export const DeletarDespesaSchema = z.object({
    id: z.string().min(1, "ID é obrigatório").regex(/^\d+$/, "ID deve conter apenas números")
})

export const ReturnAllDespesasSchema = ReturnDespesaSchema.array()

export type iCreateDespesa = z.infer<typeof CreateDespesaSchema>
export type iReturnDespesa = z.infer<typeof ReturnDespesaSchema>
export type iAtualizarDespesa = z.infer<typeof AtualizarDespesaSchema>
export type iDeletarDespesa = z.infer<typeof DeletarDespesaSchema>