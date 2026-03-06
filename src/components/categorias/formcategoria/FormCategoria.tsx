import { type ChangeEvent, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import AuthContext from '../../../contexts/AuthContext'
import type Categoria from '../../../models/Categoria'
import { atualizar, cadastrar, listar } from '../../../services/Services'
import { ToastAlerta } from '../../../utils/ToastAlerta'

function FormCategoria() {
	const navigate = useNavigate()

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isEditing, setIsEditing] = useState<boolean>(false)
	const [categoria, setCategoria] = useState<Categoria>({} as Categoria)

	const { id } = useParams<{ id: string }>()

	const { usuario, handleLogout } = useContext(AuthContext)
	const token = usuario.token

	async function buscarPorId(id: string) {
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

	useEffect(() => {
		if (token === '') {
			ToastAlerta('Você precisa estar logado!', 'info')
			navigate('/')
		}
	}, [token])

	useEffect(() => {
		if (id !== undefined) {
			buscarPorId(id)
			setIsEditing(true)
		}
	}, [id])

	function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
		setCategoria({
			...categoria,
			[e.target.name]: e.target.value,
		})
	}

	async function gerarNovaCategoria(e: ChangeEvent<HTMLFormElement>) {
		e.preventDefault()
		setIsLoading(true)

		if (id !== undefined) {
			try {
				await atualizar(`/categorias`, categoria, setCategoria, {
					headers: {
						Authorization: token,
					},
				})
				ToastAlerta('Categoria atualizada com sucesso', 'sucesso')
			} catch (error: any) {
				if (error.toString().includes('401')) {
					handleLogout()
				} else {
					ToastAlerta('Erro ao atualizar a Categoria!', 'erro')
				}
			}
		} else {
			try {
				await cadastrar(`/categorias`, categoria, setCategoria, {
					headers: {
						Authorization: token,
					},
				})
				ToastAlerta('Categoria cadastrada com sucesso', 'sucesso')
			} catch (error: any) {
				if (error.toString().includes('401')) {
					handleLogout()
				} else {
					ToastAlerta('Erro ao cadastrar a Categoria!', 'erro')
				}
			}
		}

		setIsLoading(false)
		retornar()
	}

	function retornar() {
		navigate('/categorias')
	}

	return (
		<div className="container flex flex-col mx-auto items-center">
			{/* Header */}
			<h1 className="text-4xl text-center my-4 font-bold text-emerald-900">
				{isEditing ? 'Editar Categoria' : 'Cadastrar Categoria'}
			</h1>

			{/* Form Container */}
			<div className="flex flex-col w-1/2 gap-4 mb-8">
				<form
					className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl"
					onSubmit={gerarNovaCategoria}
				>
					{/* Descrição */}
					<div className="flex flex-col gap-2 mb-4">
						<label
							htmlFor="descricao"
							className="text-sm font-semibold text-gray-700"
						>
							Descrição da Categoria
						</label>
						<input
							id="descricao"
							value={categoria.descricao || ''}
							onChange={atualizarEstado}
							type="text"
							placeholder="Insira a descrição da categoria"
							name="descricao"
							required
							className="border-2 bg-white rounded-lg px-4 py-2.5 text-sm focus:outline-none border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
						/>
					</div>

					{/* Ícone */}
					<div className="flex flex-col gap-2 mb-6">
						<label
							htmlFor="icone"
							className="text-sm font-semibold text-gray-700"
						>
							URL do Ícone
						</label>
						<input
							id="icone"
							value={categoria.icone || ''}
							onChange={atualizarEstado}
							type="text"
							placeholder="https://exemplo.com/icone.svg"
							name="icone"
							required
							className="border-2 bg-white rounded-lg px-4 py-2.5 text-sm focus:outline-none border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
						/>
						<p className="text-xs text-gray-500 mt-1">
							Insira a URL completa da imagem do ícone (SVG, PNG ou JPG)
						</p>
					</div>

					{/* Botão Submit */}
					<div className="flex justify-center pt-3">
						<button
							type="submit"
							disabled={isLoading}
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

export default FormCategoria