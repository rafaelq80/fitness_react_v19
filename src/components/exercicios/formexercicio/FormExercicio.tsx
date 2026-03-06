import { type ChangeEvent, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { atualizar, cadastrar, listar } from '../../../services/Services'

import { ClipLoader } from 'react-spinners'
import { AuthContext } from '../../../contexts/AuthContext'
import type Categoria from '../../../models/Categoria'
import type Exercicio from '../../../models/Exercicio'
import { ToastAlerta } from '../../../utils/ToastAlerta'

function FormExercicio() {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isEditing, setIsEditing] = useState<boolean>(false)
	const [categorias, setCategorias] = useState<Categoria[]>([])

	const [categoria, setCategoria] = useState<Categoria>({
		id: 0,
		descricao: '',
		icone: '',
	})

	const [exercicio, setExercicio] = useState<Exercicio>({} as Exercicio)

	const { id } = useParams<{ id: string }>()
	const { usuario, handleLogout } = useContext(AuthContext)
	const token = usuario.token

	async function buscarExercicioPorId(id: string) {
		try {
			await listar(`/exercicios/${id}`, setExercicio, {
				headers: {
					Authorization: token,
				},
			})
		} catch (error: any) {
			if (error.toString().includes('401')) {
				handleLogout()
			} else {
				ToastAlerta('Exercício não Encontrado!', 'erro')
				retornar()
			}
		}
	}

	async function buscarCategoriaPorId(id: string) {
		try {
			await listar(`/categorias/${id}`, setCategoria, {
				headers: {
					Authorization: token,
				},
			})
		} catch (error: any) {
			if (error.toString().includes('401')) {
				handleLogout()
			} else {
				ToastAlerta('Categoria não Encontrada!', 'erro')
				retornar()
			}
		}
	}

	async function buscarCategorias() {
		try {
			await listar(`/categorias`, setCategorias, {
				headers: { Authorization: token },
			})
		} catch (error: any) {
			if (error.toString().includes('401')) {
				handleLogout()
			}
		}
	}

	useEffect(() => {
		if (token === '') {
			ToastAlerta('Você precisa estar logado!', 'info')
			navigate('/')
		}
	}, [token])

	useEffect(() => {
		buscarCategorias()
		if (id !== undefined) {
			buscarExercicioPorId(id)
			setIsEditing(true)
		}
	}, [id])

	useEffect(() => {
		if (categoria.id !== 0) {
			setExercicio((prevState) => ({
				...prevState,
				categoria: categoria,
				usuario: usuario,
			}))
		}
	}, [categoria])

	function handleCategoriaChange(e: ChangeEvent<HTMLSelectElement>) {
		const selectedId = e.target.value
		if (selectedId) {
			buscarCategoriaPorId(selectedId)
		}
	}

	function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
		const { type, value, name } = e.target

		let tempo: string | number = value

		switch (type) {
			case 'number':
			case 'range':
				tempo = value === '' ? '' : parseFloat(Number(value).toFixed(2))
				break
			case 'date':
				tempo = value
				break
			default:
				if (!isNaN(Number(value)) && value !== '') {
					tempo = parseFloat(Number(value).toFixed(2))
				}
		}

		setExercicio((prevState) => ({
			...prevState,
			[name]: tempo,
		}))
	}

	function retornar() {
		navigate('/exercicios')
	}

	async function gerarNovoExercicio(e: ChangeEvent<HTMLFormElement>) {
		e.preventDefault()
		setIsLoading(true)

		if (id !== undefined) {
			try {
				await atualizar(`/exercicios`, exercicio, setExercicio, {
					headers: {
						Authorization: token,
					},
				})
				ToastAlerta('Exercício atualizado com sucesso', 'sucesso')
			} catch (error: any) {
				if (error.toString().includes('401')) {
					handleLogout()
				} else {
					ToastAlerta('Erro ao atualizar o Exercício!', 'erro')
				}
			}
		} else {
			try {
				await cadastrar(`/exercicios`, exercicio, setExercicio, {
					headers: {
						Authorization: token,
					},
				})
				ToastAlerta('Exercício cadastrado com sucesso', 'sucesso')
			} catch (error: any) {
				if (error.toString().includes('401')) {
					handleLogout()
				} else {
					ToastAlerta('Erro ao cadastrar o Exercício!', 'erro')
				}
			}
		}

		setIsLoading(false)
		retornar()
	}

	const categoriaSelecionado = exercicio.categoria?.id > 0

	return (
		<div
			className={
				isEditing
					? 'container flex flex-col mx-auto items-center'
					: 'flex flex-col bg-white rounded-2xl overflow-hidden'
			}
		>
			{/* Header */}
			<h1 className="text-4xl text-center my-4 font-bold text-emerald-900">
				{isEditing ? 'Editar Exercício' : 'Cadastrar Exercício'}
			</h1>

			{/* Form Container */}
			<div className={isEditing ? 'flex flex-col w-1/2 gap-4 mb-8' : 'px-8 py-6'}>
				<form
					className={
						isEditing
							? 'bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl'
							: 'flex flex-col gap-4'
					}
					onSubmit={gerarNovoExercicio}
				>
					{/* Nome do Exercício */}
					<div className="flex flex-col gap-2">
						<label htmlFor="nome" className="text-sm font-semibold text-gray-700">
							Nome do Exercício
						</label>
						<input
							id="nome"
							value={exercicio.nome || ''}
							onChange={atualizarEstado}
							type="text"
							placeholder="Insira o nome do exercício"
							name="nome"
							required
							className="border-2 bg-white rounded-lg px-4 py-2.5 text-sm focus:outline-none border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
						/>
					</div>

					{/* Tempo */}
					<div className="flex flex-col gap-2">
						<label htmlFor="tempo" className="text-sm font-semibold text-gray-700">
							Tempo do Exercício (minutos)
						</label>
						<input
							id="tempo"
							value={exercicio.tempo || ''}
							onChange={atualizarEstado}
							type="number"
							step=".01"
							placeholder="Adicione o tempo do exercício"
							name="tempo"
							className="border-2 bg-white rounded-lg px-4 py-2.5 text-sm focus:outline-none border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
						/>
					</div>

					{/* Grid de 2 Colunas */}
					<div className="grid grid-cols-2 gap-4">
						{/* Séries */}
						<div className="flex flex-col gap-2">
							<label htmlFor="serie" className="text-sm font-semibold text-gray-700">
								Séries
							</label>
							<input
								id="serie"
								value={exercicio.serie || ''}
								onChange={atualizarEstado}
								type="number"
								step=".01"
								placeholder="Séries"
								name="serie"
								className="border-2 bg-white rounded-lg px-4 py-2.5 text-sm focus:outline-none border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
							/>
						</div>

						{/* Repetições */}
						<div className="flex flex-col gap-2">
							<label htmlFor="repeticao" className="text-sm font-semibold text-gray-700">
								Repetições
							</label>
							<input
								id="repeticao"
								value={exercicio.repeticao || ''}
								onChange={atualizarEstado}
								type="number"
								step=".01"
								placeholder="Repetições"
								name="repeticao"
								className="border-2 bg-white rounded-lg px-4 py-2.5 text-sm focus:outline-none border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
							/>
						</div>

						{/* Peso */}
						<div className="flex flex-col gap-2">
							<label htmlFor="peso" className="text-sm font-semibold text-gray-700">
								Peso (Kg)
							</label>
							<input
								id="peso"
								value={exercicio.peso || ''}
								onChange={atualizarEstado}
								type="number"
								step=".01"
								placeholder="Peso (Kg)"
								name="peso"
								className="border-2 bg-white rounded-lg px-4 py-2.5 text-sm focus:outline-none border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
							/>
						</div>

						{/* Descanso */}
						<div className="flex flex-col gap-2">
							<label htmlFor="descanso" className="text-sm font-semibold text-gray-700">
								Descanso (minutos)
							</label>
							<input
								id="descanso"
								value={exercicio.descanso || ''}
								onChange={atualizarEstado}
								type="number"
								step=".01"
								placeholder="Descanso (min)"
								name="descanso"
								className="border-2 bg-white rounded-lg px-4 py-2.5 text-sm focus:outline-none border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
							/>
						</div>
					</div>

					{/* Foto */}
					<div className="flex flex-col gap-2">
						<label htmlFor="foto" className="text-sm font-semibold text-gray-700">
							URL da Foto do Exercício
						</label>
						<input
							type="text"
							id="foto"
							placeholder="Insira a URL da foto"
							name="foto"
							className="border-2 bg-white rounded-lg px-4 py-2.5 text-sm focus:outline-none border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
							required
							value={exercicio.foto || ''}
							onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
						/>
					</div>

					{/* Categoria */}
					<div className="flex flex-col gap-2">
						<label htmlFor="categoria" className="text-sm font-semibold text-gray-700">
							Categoria
						</label>
						<select
							name="categoria"
							id="categoria"
							className="border-2 bg-white rounded-lg px-4 py-2.5 text-sm focus:outline-none border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
							onChange={handleCategoriaChange}
							value={exercicio.categoria?.id || ''}
						>
							<option value="" disabled>
								Selecione uma Categoria
							</option>
							{categorias.map((categoria) => (
								<option key={categoria.id} value={categoria.id}>
									{categoria.descricao}
								</option>
							))}
						</select>
					</div>

					{/* Botão Submit */}
					<div className="flex justify-center pt-3">
						<button
							type="submit"
							disabled={!categoriaSelecionado || isLoading}
							className="flex justify-center rounded-lg disabled:bg-slate-200 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold w-1/2 mx-auto py-3 transition-all duration-300 shadow-md hover:shadow-lg"
						>
							{isLoading ? (
								<ClipLoader color="#ffffff" size={24} />
							) : (
								<span>{id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default FormExercicio