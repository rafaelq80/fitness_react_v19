import { type ChangeEvent, type FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import type Usuario from "../../models/Usuario"
import { ToastAlerta } from "../../utils/ToastAlerta"
import { NumericFormat } from "react-number-format"
import { cadastrarUsuario } from "../../services/Services"
import { z } from "zod"

import { ptBR } from "date-fns/locale/pt-BR"
import DatePicker, { registerLocale } from "react-datepicker"
import { formatZodErrors, UsuarioSchema } from "../../schemas/UsuarioSchema"
registerLocale("pt-BR", ptBR)

function Cadastro() {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [confirmarSenha, setConfirmaSenha] = useState<string>("")
	const [erros, setErros] = useState<Record<string, string>>({})

	const [usuario, setUsuario] = useState<Usuario>({
		id: 0,
		nome: "",
		usuario: "",
		dataNascimento: "",
		senha: "",
		foto: "",
		altura: 0,
		peso: 0,
		imc: 0,
	})

	useEffect(() => {
		if (usuario.id !== 0) {
			retornar()
		}
	}, [usuario])

	function retornar() {
		navigate("/login")
	}

	function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {

		setUsuario({ 
			...usuario, 
			[e.target.name]: e.target.value 
		})

		if (erros[e.target.name]) {
			setErros({ 
				...erros, 
				[e.target.name]: "" 
			})
		}
	}

	function handleConfirmaSenha(e: ChangeEvent<HTMLInputElement>) {
		setConfirmaSenha(e.target.value)

		// Limpa o erro ao digitar
		if (erros.confirmarSenha) {
			setErros({ 
				...erros, 
				confirmarSenha: "" 
			})
		}
	}

	async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()

		try {
			// Valida todos os campos de uma vez
			UsuarioSchema.parse({ ...usuario, confirmarSenha })
			
			setErros({}) // Limpa todos os erros
			setIsLoading(true)
			
			await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
			ToastAlerta("Usuário cadastrado com sucesso!", "sucesso")
			
		} catch (error) {
			if (error instanceof z.ZodError) {
				setErros(formatZodErrors(error))
			} else {
				ToastAlerta("Erro ao cadastrar o usuário!", "erro")
			}
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold bg-linear-to-br from-gray-50 to-gray-100 overflow-hidden">
			{/* Imagem de Fundo - Desktop */}
			<div
				style={{
					backgroundImage: `url("https://ik.imagekit.io/vzr6ryejm/fitness/fundo_02.png")`,
				}}
				className="lg:block hidden bg-no-repeat w-full h-screen bg-cover bg-center relative
					before:content-[''] before:absolute before:inset-0 before:bg-linear-to-br 
					before:from-emerald-600/20 before:to-transparent"
			>
				<div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent"></div>
			</div>

			{/* Formulário */}
			<div className="flex justify-center items-center w-full h-screen px-6 lg:px-12">
				<form
					className="flex flex-col justify-center items-center gap-2 w-full max-w-xl bg-white px-10 py-6 rounded-3xl shadow-2xl border border-gray-100 transform transition-all duration-300 hover:shadow-3xl"
					onSubmit={cadastrarNovoUsuario}
				>
					{/* Cabeçalho */}
					<div className="text-center mb-2">
						<h2 className="text-4xl mb-2 bg-linear-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
							Cadastrar
						</h2>
						<p className="text-gray-500 text-sm font-normal">
							Crie sua conta para começar
						</p>
					</div>

					{/* Campo Nome */}
					<div className="flex flex-col w-full">
						<label htmlFor="nome" className="text-gray-700 text-sm font-semibold">
							Nome Completo
						</label>
						<input
							type="text"
							id="nome"
							name="nome"
							placeholder="Digite seu nome completo"
							className={`border-2 rounded-lg px-4 py-2 bg-white text-slate-900 text-sm font-normal
								focus:outline-none transition-all duration-300 placeholder:text-gray-400 ${
									erros.nome
										? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
										: "border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
								}`}
							value={usuario.nome}
							onChange={atualizarEstado}
						/>
						{erros.nome && <span className="text-red-500 text-xs">{erros.nome}</span>}
					</div>

					{/* Campo Usuário (E-mail) */}
					<div className="flex flex-col w-full">
						<label htmlFor="usuario" className="text-gray-700 text-sm font-semibold">
							E-mail
						</label>
						<input
							type="email"
							id="usuario"
							name="usuario"
							placeholder="seu@email.com"
							className={`border-2 rounded-lg px-4 py-2 bg-white text-slate-900 text-sm font-normal
								focus:outline-none transition-all duration-300 placeholder:text-gray-400 ${
									erros.usuario
										? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
										: "border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
								}`}
							value={usuario.usuario}
							onChange={atualizarEstado}
						/>
						{erros.usuario && (
							<span className="text-red-500 text-xs">{erros.usuario}</span>
						)}
					</div>

					<div className="flex justify-between flex-wrap w-full">

						{/* Data de Nascimento */}
						<div className="flex flex-col w-2/4 pr-1">
							<label
								htmlFor="dataNascimento"
								className="text-sm font-semibold text-gray-700"
							>
								Data de Nascimento
							</label>

							<DatePicker
								id="dataNascimento"
								name="dataNascimento"
								selected={
									usuario.dataNascimento ? new Date(usuario.dataNascimento) : null
								}
								onChange={(date) => {
									setUsuario({
										...usuario,
										dataNascimento: date ? date.toISOString().split("T")[0] : "",
									})
									// Limpa erro ao selecionar
									if (erros.dataNascimento) {
										setErros({ ...erros, dataNascimento: "" })
									}
								}}
								dateFormat="dd/MM/yyyy"
								locale="pt-BR"
								placeholderText="12/12/1912"
								showYearDropdown
								showMonthDropdown
								dropdownMode="select"
								maxDate={new Date()}
								minDate={new Date(1900, 0, 1)}
								autoComplete="off"
								className={`border-2 rounded-lg px-4 py-2 bg-white text-slate-900 text-sm font-normal w-full
									focus:outline-none transition-all duration-300 placeholder:text-gray-400 ${
										erros.dataNascimento
											? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
											: "border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
									}`}
								wrapperClassName="w-full"
							/>

							{erros.dataNascimento && (
								<span className="text-red-500 text-xs">{erros.dataNascimento}</span>
							)}
						</div>

						{/* Peso */}
						<div className="flex flex-col w-1/4 pr-1">
							<label htmlFor="peso" className="text-sm font-semibold text-gray-700">
								Peso (Kg)
							</label>
							<NumericFormat
								id="peso"
								name="peso"
								value={usuario.peso || ""}
								onValueChange={(values) => {
									setUsuario({
										...usuario,
										peso: values.floatValue ?? 0,
									})
									if (erros.peso) {
										setErros({ ...erros, peso: "" })
									}
								}}
								thousandSeparator=""
								decimalSeparator=","
								decimalScale={2}
								fixedDecimalScale={false}
								placeholder="70"
								allowNegative={false}
								className={`border-2 rounded-lg px-4 py-2 bg-white text-slate-900 text-sm font-normal
									focus:outline-none transition-all duration-300 placeholder:text-gray-400 ${
										erros.peso
											? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
											: "border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
									}`}
							/>

							{erros.peso && (
								<span className="text-red-500 text-xs">{erros.peso}</span>
							)}
						</div>

						{/* Altura */}
						<div className="flex flex-col w-1/4 pr-1">
							<label htmlFor="altura" className="text-sm font-semibold text-gray-700">
								Altura (m)
							</label>
							<NumericFormat
								id="altura"
								name="altura"
								value={usuario.altura || ""}
								onValueChange={(values) => {
									setUsuario({
										...usuario,
										altura: values.floatValue ?? 0,
									})
									if (erros.altura) {
										setErros({ ...erros, altura: "" })
									}
								}}
								thousandSeparator=""
								decimalSeparator=","
								decimalScale={2}
								fixedDecimalScale={false}
								placeholder="1,75"
								allowNegative={false}
								className={`border-2 rounded-lg px-4 py-2 bg-white text-slate-900 text-sm font-normal
									focus:outline-none transition-all duration-300 placeholder:text-gray-400 ${
										erros.altura
											? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
											: "border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
									}`}
							/>

							{erros.altura && (
								<span className="text-red-500 text-xs">{erros.altura}</span>
							)}
						</div>
					</div>

					{/* Campo Foto */}
					<div className="flex flex-col w-full">
						<label htmlFor="foto" className="text-gray-700 text-sm font-semibold">
							Foto (URL)
						</label>
						<input
							type="url"
							id="foto"
							name="foto"
							placeholder="https://..."
							className={`border-2 rounded-lg px-4 py-2 bg-white text-slate-900 text-sm font-normal
								focus:outline-none transition-all duration-300 placeholder:text-gray-400 ${
									erros.foto
										? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
										: "border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
								}`}
							value={usuario.foto}
							onChange={atualizarEstado}
						/>
						{erros.foto && <span className="text-red-500 text-xs">{erros.foto}</span>}
					</div>

					{/* Campos Senha e Confirmar Senha */}
					<div className="flex gap-4 w-full">
						<div className="flex flex-col w-1/2">
							<label htmlFor="senha" className="text-gray-700 text-sm font-semibold">
								Senha
							</label>
							<input
								type="password"
								id="senha"
								name="senha"
								placeholder="Mín. 8 caracteres"
								className={`border-2 rounded-lg px-4 py-2 bg-white text-slate-900 text-sm font-normal
									focus:outline-none transition-all duration-300 placeholder:text-gray-400 ${
										erros.senha
											? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
											: "border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
									}`}
								value={usuario.senha}
								onChange={atualizarEstado}
							/>
							{erros.senha && (
								<span className="text-red-500 text-xs">{erros.senha}</span>
							)}
						</div>

						<div className="flex flex-col w-1/2">
							<label
								htmlFor="confirmarSenha"
								className="text-gray-700 text-sm font-semibold"
							>
								Confirmar Senha
							</label>
							<input
								type="password"
								id="confirmarSenha"
								name="confirmarSenha"
								placeholder="Digite novamente"
								className={`border-2 rounded-lg px-4 py-2 bg-white text-slate-900 text-sm font-normal
									focus:outline-none transition-all duration-300 placeholder:text-gray-400 ${
										erros.confirmarSenha
											? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
											: "border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
									}`}
								value={confirmarSenha}
								onChange={handleConfirmaSenha}
							/>
							{erros.confirmarSenha && (
								<span className="text-red-500 text-xs">{erros.confirmarSenha}</span>
							)}
						</div>
					</div>

					{/* Botões */}
					<div className="flex justify-between gap-4 w-full mt-1">
						<button
							type="button"
							className="rounded-lg bg-gray-200 hover:bg-gray-300 
								active:scale-95 py-2 w-1/2 text-gray-800 font-semibold text-sm
								transition-all duration-200"
							onClick={retornar}
						>
							Cancelar
						</button>
						<button
							type="submit"
							disabled={isLoading}
							className="rounded-lg bg-linear-to-r from-emerald-600 to-emerald-700 flex justify-center items-center
								hover:from-emerald-700 hover:to-emerald-800 active:scale-95
								disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed
								py-2 w-1/2 text-white font-semibold text-sm
								transition-all duration-300"
						>
							{isLoading ? (
								<ClipLoader color="#ffffff" size={20} />
							) : (
								<span>Cadastrar</span>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Cadastro