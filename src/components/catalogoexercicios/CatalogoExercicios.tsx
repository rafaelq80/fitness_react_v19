import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../contexts/AuthContext'
import type Categoria from '../../models/Categoria'
import type Exercicio from '../../models/Exercicio'
import { listar } from '../../services/Services'
import { ToastAlerta } from '../../utils/ToastAlerta'
import CardExercicios from '../exercicios/cardexercicios/CardExercicios'
import { SyncLoader } from 'react-spinners'

function CatalogoExercicios() {
	const navigate = useNavigate()
	const { usuario, handleLogout } = useContext(AuthContext)
	const token = usuario.token

	const [categorias, setCategorias] = useState<Categoria[]>([])
	const [todosExercicios, setTodosExercicios] = useState<Exercicio[]>([])
	const [exerciciosFiltrados, setExerciciosFiltrados] = useState<Exercicio[]>([])
	const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	async function buscarCategorias() {
		try {
			await listar(`/categorias`, setCategorias, {
				headers: { Authorization: token },
			})
		} catch (error: any) {
			if (error.toString().includes('401')) {
				handleLogout()
				ToastAlerta('Sessão expirada, faça login novamente', 'info')
			}
		}
	}

	async function buscarExercicios() {
		try {
			setIsLoading(true)
			setError(null)

			await listar('/exercicios', setTodosExercicios, {
				headers: { Authorization: token },
			})
		} catch (error: any) {
			if (error.toString().includes('401')) {
				handleLogout()
				ToastAlerta('Sessão expirada, faça login novamente', 'info')
			} else {
				setError('Erro ao buscar exercícios')
				ToastAlerta('Erro ao buscar exercícios', 'erro')
			}
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (todosExercicios.length > 0) {
			if (categoriaSelecionada === null) {
				setExerciciosFiltrados(todosExercicios)
			} else {
				const exerciciosFiltrados = todosExercicios.filter(
					(exercicio) => exercicio.categoria?.id === categoriaSelecionada
				)
				setExerciciosFiltrados(exerciciosFiltrados)
			}
		}
	}, [categoriaSelecionada, todosExercicios])

	useEffect(() => {
		if (token === '') {
			ToastAlerta('Você precisa estar logado!', 'info')
			navigate('/login')
		} else {
			buscarCategorias()
			buscarExercicios()
		}
	}, [token])

	const handleCategoriaClick = (categoriaId: number | null) => {
		setCategoriaSelecionada(categoriaId)
	}

	const renderExercicios = () => {
		if (!Array.isArray(exerciciosFiltrados)) {
			console.error('exercicios não é um array:', exerciciosFiltrados)
			return (
				<div className="text-center py-10">
					<p className="text-xl text-gray-600">
						Erro ao carregar exercícios
					</p>
				</div>
			)
		}

		if (exerciciosFiltrados.length === 0) {
			return (
				<div className="text-center py-16">
					<div className="inline-block p-6 bg-white rounded-2xl shadow-md">
						<p className="text-xl text-gray-600 font-medium">
							Nenhum exercício foi encontrado{' '}
							{categoriaSelecionada !== null && 'nesta categoria'}
						</p>
					</div>
				</div>
			)
		}

		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
				{exerciciosFiltrados.map((exercicio) => (
					<CardExercicios key={exercicio.id} exercicio={exercicio} />
				))}
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-linear-to-b from-slate-100 to-slate-200">
			{/* Seção de Filtros de Categorias */}
			<div className="bg-linear-to-r from-emerald-900 via-emerald-800 to-emerald-900 shadow-lg">
				<div className="container mx-auto px-4 py-6">
					{/* Título da seção */}
					<div className="text-center mb-6">
						<h3 className="text-2xl font-bold text-white mb-2">
							Escolha sua Categoria
						</h3>
						<p className="text-emerald-200 text-sm">
							Filtre os exercícios por categoria ou veja todos
						</p>
					</div>

					{/* Botões de categorias */}
					<div className="flex flex-wrap justify-center gap-4">
						<button
							onClick={() => handleCategoriaClick(null)}
							className={`group relative px-6 py-4 w-28 h-28 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer ${
								categoriaSelecionada === null
									? 'bg-white text-emerald-900 shadow-xl scale-105 ring-4 ring-emerald-400'
									: 'bg-white/90 text-emerald-800 hover:bg-white hover:shadow-lg hover:scale-105'
							}`}
						>
							<div className="text-3xl">📋</div>
							<span className="text-sm font-semibold">Todos</span>
							{categoriaSelecionada === null && (
								<div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
							)}
						</button>

						{categorias.map((categoria) => (
							<button
								key={categoria.id}
								onClick={() => handleCategoriaClick(categoria.id)}
								className={`group relative px-4 py-4 w-28 h-28 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer ${
									categoriaSelecionada === categoria.id
										? 'bg-white text-emerald-900 shadow-xl scale-105 ring-4 ring-emerald-400'
										: 'bg-white/90 text-emerald-800 hover:bg-white hover:shadow-lg hover:scale-105'
								}`}
							>
								<img
									src={categoria.icone}
									alt={categoria.descricao}
									className="w-12 h-12 object-contain transition-transform group-hover:scale-110"
								/>
								<span className="text-xs font-semibold text-center leading-tight">
									{categoria.descricao}
								</span>
								{categoriaSelecionada === categoria.id && (
									<div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
								)}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Seção de Exercícios */}
			<div className="container mx-auto px-4 py-8">
				{isLoading ? (
					<div className="flex flex-col items-center justify-center py-20">
						<SyncLoader color="#064e3b" size={15} margin={4} />
					</div>
				) : (
					<div className="space-y-6">
						{error ? (
							<div className="text-center py-10">
								<div className="inline-block p-6 bg-red-50 rounded-2xl shadow-md border-2 border-red-200">
									<p className="text-xl text-red-600 font-medium">
										{error}
									</p>
								</div>
							</div>
						) : (
							<>
								{/* Contador de resultados */}
								<div className="flex justify-between items-center mb-6">
									<h2 className="text-2xl font-bold text-emerald-900">
										{categoriaSelecionada === null
											? 'Todos os Exercícios'
											: `Exercícios de ${
													categorias.find(
														(c) => c.id === categoriaSelecionada
													)?.descricao || 'Categoria'
											  }`}
									</h2>
									<span className="px-4 py-2 bg-emerald-100 text-emerald-900 rounded-full text-sm font-semibold">
										{exerciciosFiltrados.length}{' '}
										{exerciciosFiltrados.length === 1
											? 'exercício'
											: 'exercícios'}
									</span>
								</div>
								{renderExercicios()}
							</>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default CatalogoExercicios