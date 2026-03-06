import {
	AtIcon,
	BowlFoodIcon,
	ForkKnifeIcon,
	LightbulbIcon,
	SparkleIcon,
	TrendUpIcon,
	UserIcon,
} from "@phosphor-icons/react"
import { useContext, useEffect, useMemo } from "react"
import { Link, useNavigate } from "react-router-dom"

import { AuthContext } from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"
import { IMC_FAIXAS } from "./ImcFaixas"

function Perfil() {
	const navigate = useNavigate()

	const { usuario, isLogout } = useContext(AuthContext)

	useEffect(() => {
		if (usuario.token === "") {
			if (!isLogout) {
				ToastAlerta("Você precisa estar logado!", "info")
			}
			navigate("/")
		}
	}, [usuario.token])

	// Calcula e encontra a faixa de IMC
	const faixaIMC = useMemo(() => {
		if (!usuario.imc || usuario.imc === 0) return null
		return IMC_FAIXAS.find((faixa) => usuario.imc <= faixa.max)
	}, [usuario.imc])

	const temDadosIMC = usuario.peso && usuario.altura && usuario.imc

	return (
		<div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200 py-8">
			<div className="container mx-auto px-4">
				<div className="max-w-5xl mx-auto">
					{/* Card Principal */}
					<div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
						{/* Imagem de Capa com Gradiente */}
						<div className="relative h-48 overflow-hidden">
							<img
								className="w-full h-full object-cover"
								src="https://ik.imagekit.io/vzr6ryejm/fitness/fundo_05.jpg"
								alt="Capa do Perfil"
							/>
							<div className="absolute inset-0 bg-linear-to-t from-emerald-900/70 via-emerald-900/40 to-transparent"></div>
						</div>

						{/* Container Principal */}
						<div className="relative px-6 pb-8">
							{/* Foto de Perfil */}
							<div className="flex justify-center">
								<div className="relative -mt-16">
									<img
										className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover bg-gray-100"
										src={usuario.foto}
										alt={`Foto de perfil de ${usuario.nome}`}
									/>
									{/* Indicador Online */}
									<div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 rounded-full border-3 border-white shadow-md"></div>
								</div>
							</div>

							{/* Informações do Usuário */}
							<div className="text-center mt-4">
								<h1 className="text-2xl font-bold text-gray-800 mb-1">
									{usuario.nome}
								</h1>
								<p className="text-sm text-gray-500">@{usuario.usuario}</p>
							</div>

							{/* Cards de Informações Básicas */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 max-w-2xl mx-auto">
								{/* Card Nome */}
								<div className="bg-linear-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
									<div className="flex items-center gap-3 mb-2">
										<div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center">
											<UserIcon
												size={18}
												weight="bold"
												className="text-white"
											/>
										</div>
										<h3 className="text-xs font-semibold text-emerald-900">
											Nome Completo
										</h3>
									</div>
									<p className="text-base font-medium text-gray-800 ml-12">
										{usuario.nome}
									</p>
								</div>

								{/* Card Usuário */}
								<div className="bg-linear-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
									<div className="flex items-center gap-3 mb-2">
										<div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center">
											<AtIcon
												size={18}
												weight="bold"
												className="text-white"
											/>
										</div>
										<h3 className="text-xs font-semibold text-emerald-900">
											Usuário
										</h3>
									</div>
									<p className="text-base font-medium text-gray-800 ml-12">
										{usuario.usuario}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Grid de Cards - IMC e Plano de Dieta */}
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						{/* Card IMC - 2 colunas */}
						<div className="lg:col-span-2">
							<div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full">
								<div className="bg-linear-to-r from-emerald-600 to-emerald-700 p-5">
									<div className="flex items-center justify-between">
										<div>
											<h3 className="text-lg font-bold text-white mb-1">
												Seu Índice de Massa Corporal
											</h3>
											<p className="text-emerald-100 text-sm">
												Monitoramento da sua saúde física
											</p>
										</div>
										<div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
											<TrendUpIcon
												size={24}
												weight="bold"
												className="text-white"
											/>
										</div>
									</div>
								</div>

								<div className="p-6">
									{temDadosIMC ? (
										<>
											{/* Grid de Métricas */}
											<div className="grid grid-cols-3 gap-4 mb-6">
												<div className="bg-linear-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200 hover:shadow-md transition-shadow">
													<div className="text-slate-500 text-xs mb-1 font-semibold uppercase tracking-wide">
														Peso Atual
													</div>
													<div className="text-3xl font-bold text-slate-800 mb-1">
														{usuario.peso}
													</div>
													<div className="text-slate-400 text-xs font-medium">
														quilogramas
													</div>
												</div>

												<div className="bg-linear-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200 hover:shadow-md transition-shadow">
													<div className="text-slate-500 text-xs mb-1 font-semibold uppercase tracking-wide">
														Altura
													</div>
													<div className="text-3xl font-bold text-slate-800 mb-1">
														{usuario.altura}
													</div>
													<div className="text-slate-400 text-xs font-medium">
														metros
													</div>
												</div>

												<div
													className={`${
														faixaIMC?.cor ||
														"bg-linear-to-br from-emerald-500 to-emerald-600"
													} rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105`}
												>
													<div className="text-white/90 text-xs mb-1 font-semibold uppercase tracking-wide">
														IMC
													</div>
													<div className="text-3xl font-bold mb-1">
														{usuario.imc?.toFixed(1)}
													</div>
													<div className="text-white/90 text-xs font-medium">
														kg/m²
													</div>
												</div>
											</div>

											{/* Classificação e Descrição */}
											{faixaIMC && (
												<>
													<div className="bg-linear-to-br from-slate-50 to-slate-100 rounded-xl p-5 border border-slate-200 mb-4">
														<div className="flex items-start gap-4">
															<img
																src={faixaIMC.imagem}
																alt={faixaIMC.categoria}
																className="w-24 h-24 shrink-0 drop-shadow-md"
															/>
															<div className="flex-1">
																<div className="flex items-center gap-2 mb-3">
																	<span
																		className={`w-3 h-3 rounded-full ${faixaIMC.cor} shadow-sm animate-pulse`}
																	></span>
																	<h4 className="text-lg font-bold text-slate-800">
																		{faixaIMC.categoria}
																	</h4>
																</div>
																<p className="text-sm text-slate-700 leading-relaxed mb-3">
																	{faixaIMC.descricao}
																</p>
															</div>
														</div>
													</div>

													{/* Card de Dica */}
													<div className="bg-linear-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
														<div className="flex items-start gap-3">
															<div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center shrink-0">
																<LightbulbIcon
																	size={20}
																	weight="bold"
																	className="text-white"
																/>
															</div>
															<div className="flex-1">
																<h5 className="text-sm font-bold text-amber-900 mb-1">
																	Recomendação Personalizada
																</h5>
																<p className="text-xs text-amber-800 leading-relaxed">
																	{faixaIMC.dica}
																</p>
															</div>
														</div>
													</div>
												</>
											)}
										</>
									) : (
										<div className="text-center py-12">
											<div className="w-20 h-20 bg-linear-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
												<TrendUpIcon size={40} className="text-slate-400" />
											</div>
											<p className="text-slate-700 font-semibold mb-2 text-lg">
												Dados Incompletos
											</p>
											<p className="text-sm text-slate-500 max-w-sm mx-auto">
												Para calcular seu IMC e receber recomendações
												personalizadas, complete seu perfil informando peso
												e altura
											</p>
										</div>
									)}
								</div>
							</div>
						</div>

						{/* Card Plano de Dieta - 1 coluna */}
						<div>
							<div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col">
								<div className="bg-linear-to-r from-purple-600 to-purple-700 p-5">
									<div className="flex items-center justify-between">
										<div>
											<h3 className="text-lg font-bold text-white mb-1">
												Dieta Inteligente
											</h3>
											<p className="text-purple-100 text-sm">Gerada por IA</p>
										</div>
										<div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
											<ForkKnifeIcon
												size={24}
												weight="bold"
												className="text-white"
											/>
										</div>
									</div>
								</div>

								<div className="p-6 flex-1 flex flex-col justify-between">
									<div>
										<div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200 mb-5">
											<div className="flex items-start gap-3 mb-3">
												<div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center shrink-0">
													<BowlFoodIcon
														size={22}
														weight="bold"
														className="text-white"
													/>
												</div>
												<div>
													<h4 className="text-sm font-bold text-slate-800 mb-1">
														Plano Alimentar Personalizado
													</h4>
													<p className="text-xs text-slate-600 leading-relaxed">
														Desenvolvido com inteligência artificial
														baseado no seu perfil, objetivos e
														necessidades nutricionais
													</p>
												</div>
											</div>
										</div>

										<div className="text-center mb-4">
											<div className="inline-block p-3 bg-purple-50 rounded-full mb-3">
												<img
													src="https://ik.imagekit.io/vzr6ryejm/fitness/plan.svg"
													alt="Plano Alimentar IA"
													className="w-14 h-14"
												/>
											</div>
										</div>
									</div>

									<Link to="/dieta">
										<button className="w-full bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group cursor-pointer">
											<SparkleIcon
												size={20}
												weight="bold"
												className="group-hover:scale-110 transition-transform duration-300"
											/>
											<span>Gerar Meu Plano</span>
										</button>
									</Link>

									<div className="bg-amber-50 rounded-xl p-4 border border-amber-200 mt-5">
										<div className="flex items-start gap-3">
											<div className="text-amber-600 shrink-0 mt-0.5">
												<svg
													className="w-5 h-5"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path
														fillRule="evenodd"
														d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
														clipRule="evenodd"
													/>
												</svg>
											</div>
											<p className="text-xs text-amber-800 leading-relaxed">
												<strong className="font-semibold">
													Aviso importante:
												</strong>{" "}
												Este plano é uma ferramenta de apoio e não substitui
												a consulta com um nutricionista profissional.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Perfil
