import { SkipBackIcon, SparkleIcon, FireIcon, ForkKnifeIcon } from '@phosphor-icons/react'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SyncLoader } from 'react-spinners'
import { AuthContext } from '../../../contexts/AuthContext'
import { listar } from '../../../services/Services'
import { ToastAlerta } from '../../../utils/ToastAlerta'
import CardRefeicao from '../cardrefeicao/CardRefeicao'
import type Dieta from '../../../models/Dieta'

function ListarDieta() {
	const navigate = useNavigate()

	const [dieta, setDieta] = useState<Dieta | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [erro, setErro] = useState(false)

	const { usuario, handleLogout } = useContext(AuthContext)
	const token = usuario.token

	async function buscarDieta() {
		setIsLoading(true)
		setErro(false)

		try {
			const response: any = {}
			await listar(`/usuarios/gerardieta/${usuario.id}`, (data: any) => {
				Object.assign(response, data)
			}, {
				headers: { Authorization: token },
			})
			
			// Verifica se a resposta tem a estrutura esperada
			if (response.planoAlimentar) {
				setDieta(response.planoAlimentar)
			} else if (response.refeicoes) {
				// Se vier direto com refeicoes
				setDieta(response)
			} else {
				console.error('Estrutura de resposta inesperada:', response)
				setErro(true)
			}
		} catch (error: any) {
			console.error('Erro ao buscar dieta:', error)
			if (error.toString().includes('401')) {
				handleLogout()
			} else {
				setErro(true)
			}
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (token === '') {
			ToastAlerta('Você precisa estar logado!', 'info')
			navigate('/login')
		}
	}, [token])

	useEffect(() => {
		buscarDieta()
	}, [])

	// Verifica se existem refeições válidas
	const temRefeicoes = dieta?.refeicoes && Array.isArray(dieta.refeicoes) && dieta.refeicoes.length > 0

	return (
		<div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-8">
			<div className="container mx-auto px-4">
				<div className="max-w-4xl mx-auto">
					{isLoading ? (
						<div className="flex flex-col items-center justify-center py-20">
							<div className="mb-6">
								<SyncLoader color="#7c3aed" size={16} />
							</div>
							<p className="text-slate-600 font-medium animate-pulse">
								Gerando seu plano alimentar personalizado...
							</p>
						</div>
					) : erro || !temRefeicoes ? (
						<div className="bg-white rounded-2xl shadow-lg overflow-hidden">
							<div className="bg-linear-to-r from-red-600 to-red-700 p-6">
								<div className="flex items-center gap-3">
									<div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
										<svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
										</svg>
									</div>
									<div>
										<h2 className="text-xl font-bold text-white">
											Não foi possível gerar a dieta
										</h2>
										<p className="text-red-100 text-sm">
											Ocorreu um erro ao processar sua solicitação
										</p>
									</div>
								</div>
							</div>
							
							<div className="p-8 text-center">
								<div className="mb-6">
									<div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
										<ForkKnifeIcon size={40} className="text-red-600" />
									</div>
									<p className="text-slate-700 mb-2">
										Não conseguimos gerar seu plano alimentar no momento.
									</p>
									<p className="text-sm text-slate-500">
										Por favor, tente novamente mais tarde ou entre em contato com o suporte.
									</p>
								</div>

								<div className="flex justify-center gap-8">
									<button
										onClick={buscarDieta}
										className="bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
									>
										<SparkleIcon size={20} weight="bold" />
										<span>Tentar Novamente</span>
									</button>

									<button
										onClick={() => navigate(-1)}
										className="inline-flex items-center gap-2 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-200 cursor-pointer"
									>
										<SkipBackIcon size={20} weight="bold" />
										<span>Voltar ao Perfil</span>
									</button>
								</div>
							</div>
						</div>
					) : (
						<>
							{/* Cabeçalho */}
							<div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
								<div className="bg-linear-to-r from-purple-600 to-purple-700 p-6">
									<div className="flex items-center justify-between">
										<div>
											<h1 className="text-2xl font-bold text-white mb-2">
												Seu Plano Alimentar Diário
											</h1>
											<p className="text-purple-100 text-sm">
												Criado especialmente para você com Inteligência Artificial
											</p>
										</div>
										<div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
											<SparkleIcon size={28} weight="bold" className="text-white" />
										</div>
									</div>
								</div>

								{/* Total de Calorias */}
								<div className="p-6 bg-linear-to-br from-purple-50 to-purple-100 border-t-4 border-purple-600">
									<div className="flex items-center justify-center gap-4">
										<div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
											<FireIcon size={24} weight="bold" className="text-white" />
										</div>
										<div className="text-center">
											<p className="text-sm text-purple-700 font-semibold mb-1">
												Total Calórico Diário
											</p>
											<p className="text-3xl font-bold text-purple-900">
												{dieta.totalCalorias} <span className="text-lg font-medium">kcal</span>
											</p>
										</div>
									</div>
								</div>
							</div>

							{/* Listagem de Refeições */}
							<div className="space-y-4 mb-6">
								{dieta.refeicoes.map((refeicao, index) => (
									<CardRefeicao
										key={`${refeicao.nome}-${index}`}
										refeicao={refeicao}
									/>
								))}
							</div>

							{/* Aviso Legal */}
							<div className="bg-amber-50 rounded-xl p-5 border border-amber-200 mb-6">
								<div className="flex items-start gap-3">
									<div className="text-amber-600 shrink-0 mt-0.5">
										<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
											<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
										</svg>
									</div>
									<div className="flex-1">
										<h3 className="text-sm font-bold text-amber-900 mb-1">
											Importante: Orientação Profissional
										</h3>
										<p className="text-xs text-amber-800 leading-relaxed">
											Este plano alimentar foi gerado por Inteligência Artificial (Google Gemini) 
											e serve como uma ferramenta de apoio. Para um acompanhamento adequado e 
											personalizado às suas necessidades específicas, consulte sempre um nutricionista 
											ou profissional de saúde qualificado.
										</p>
									</div>
								</div>
							</div>

							{/* Botão de Voltar */}
							<div className="flex justify-center">
								<button
									onClick={() => navigate(-1)}
									className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-200 cursor-pointer"
								>
									<SkipBackIcon size={20} weight="bold" />
									<span>Voltar ao Perfil</span>
								</button>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default ListarDieta