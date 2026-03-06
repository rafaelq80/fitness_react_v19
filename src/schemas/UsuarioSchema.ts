import { z } from "zod"

export const UsuarioSchema = z
	.object({
		nome: z
			.string()
			.min(3, "Nome deve ter no mínimo 3 caracteres")
			.max(100, "Nome pode ter no máximo 100 caracteres"),

		usuario: z.string()
      .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
			  message: "E-mail inválido",
		}),

		dataNascimento: z
			.string()
			.min(1, "Data de nascimento é obrigatória")
			.refine((date) => {
				const birthDate = new Date(date)
				const today = new Date()
				const age = today.getFullYear() - birthDate.getFullYear()
				return age >= 18
			}, "Você deve ter pelo menos 18 anos"),

		foto: z
			.string()
			.min(1, "Foto é obrigatória")
			.refine((value) => {
				try {
					new URL(value)
					return true
				} catch {
					return false
				}
			}, "URL inválida"),

		senha: z
			.string()
			.min(8, "Deve ter no mínimo 8 caracteres")
			.regex(/[A-Z]/, "Deve conter pelo menos uma letra maiúscula")
			.regex(/[a-z]/, "Deve conter pelo menos uma letra minúscula")
			.regex(/[0-9]/, "Deve conter pelo menos um número")
			.regex(/[!@#$%^&*(),.?":{}|<>]/, "Deve conter pelo menos um caractere especial"),

		confirmarSenha: z.string().min(1, "Confirme sua senha"),
	})
	.refine((data) => data.senha === data.confirmarSenha, {
		message: "As senhas não coincidem",
		path: ["confirmaSenha"],
	})

export type CadastroFormData = z.infer<typeof UsuarioSchema>

// Função helper para converter erros do Zod
export function formatZodErrors(error: z.ZodError<any>): Record<string, string> {
	const erros: Record<string, string> = {}
	error.issues.forEach((issue) => {
		const campo = issue.path[0] as string
		if (campo) erros[campo] = issue.message
	})
	return erros
}
