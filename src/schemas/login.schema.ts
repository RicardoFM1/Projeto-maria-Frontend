import {z} from "zod";


export const CreateLoginSchema = z.object({
    email: z.email("Email inválido"),
    password: z.string().min(8, "minímo 8 caractéres")
})

export type iCreateLogin = z.infer<typeof CreateLoginSchema>