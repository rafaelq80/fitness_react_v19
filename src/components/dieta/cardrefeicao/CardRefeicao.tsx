import { CookingPotIcon, ListChecksIcon, FireIcon, ClockIcon } from '@phosphor-icons/react'
import type Refeicao from '../../../models/Refeicao'


interface CardRefeicaoProps {
	refeicao: Refeicao
}

// Função para obter o ícone e cor baseado no tipo de refeição
const getRefeicaoStyle = (nome: string) => {
	const nomeLower = nome.toLowerCase()
	
	if (nomeLower.includes('café') || nomeLower.includes('manhã')) {
		return { cor: 'from-amber-500 to-amber-600', bgCor: 'bg-amber-50', borderCor: 'border-amber-200', textCor: 'text-amber-900' }
	}
	if (nomeLower.includes('lanche matinal')) {
		return { cor: 'from-orange-500 to-orange-600', bgCor: 'bg-orange-50', borderCor: 'border-orange-200', textCor: 'text-orange-900' }
	}
	if (nomeLower.includes('almoço')) {
		return { cor: 'from-emerald-500 to-emerald-600', bgCor: 'bg-emerald-50', borderCor: 'border-emerald-200', textCor: 'text-emerald-900' }
	}
	if (nomeLower.includes('lanche') && nomeLower.includes('tarde')) {
		return { cor: 'from-blue-500 to-blue-600', bgCor: 'bg-blue-50', borderCor: 'border-blue-200', textCor: 'text-blue-900' }
	}
	if (nomeLower.includes('jantar')) {
		return { cor: 'from-red-500 to-red-600', bgCor: 'bg-red-50', borderCor: 'border-red-200', textCor: 'text-red-900' }
	}
	if (nomeLower.includes('ceia')) {
		return { cor: 'from-indigo-500 to-indigo-600', bgCor: 'bg-indigo-50', borderCor: 'border-indigo-200', textCor: 'text-indigo-900' }
	}
	
	return { cor: 'from-slate-500 to-slate-600', bgCor: 'bg-slate-50', borderCor: 'border-slate-200', textCor: 'text-slate-900' }
}

function CardRefeicao({ refeicao }: CardRefeicaoProps) {
	const estilo = getRefeicaoStyle(refeicao.nome)

	return (
		<div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
			{/* Cabeçalho da Refeição */}
			<div className={`bg-linear-to-r ${estilo.cor} p-5`}>
				<div className="flex items-center justify-between">
					<div className="flex-1">
						<h3 className="text-xl font-bold text-white mb-1">
							{refeicao.nome}
						</h3>
						<p className="text-white/90 text-sm font-medium">
							{refeicao.prato}
						</p>
					</div>
					<div className={`w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm`}>
						<CookingPotIcon size={28} weight="bold" className="text-white" />
					</div>
				</div>
			</div>

			{/* Conteúdo do Card */}
			<div className="p-6">
				<div className="grid md:grid-cols-2 gap-6">
					{/* Coluna Esquerda - Ingredientes */}
					<div>
						<div className="flex items-center gap-2 mb-4">
							<div className={`w-9 h-9 bg-linear-to-br ${estilo.cor} rounded-lg flex items-center justify-center shadow-sm`}>
								<ListChecksIcon size={18} weight="bold" className="text-white" />
							</div>
							<h4 className="font-bold text-slate-800 text-base">
								Ingredientes
							</h4>
						</div>
						
						<div className={`${estilo.bgCor} ${estilo.borderCor} border rounded-xl p-4`}>
							<ul className="space-y-2">
								{refeicao.ingredientes.map((ingrediente, index) => (
									<li 
										key={index} 
										className="flex items-start gap-2 text-sm text-slate-700"
									>
										<span className={`${estilo.textCor} mt-1 shrink-0`}>•</span>
										<span>{ingrediente}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
					
					{/* Coluna Direita - Modo de Preparo */}
					<div>
						<div className="flex items-center gap-2 mb-4">
							<div className={`w-9 h-9 bg-linear-to-br ${estilo.cor} rounded-lg flex items-center justify-center shadow-sm`}>
								<ClockIcon size={18} weight="bold" className="text-white" />
							</div>
							<h4 className="font-bold text-slate-800 text-base">
								Modo de Preparo
							</h4>
						</div>
						
						<div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4">
							<p className="text-sm text-slate-700 leading-relaxed">
								{refeicao.modoPreparo}
							</p>
						</div>

						{/* Info de Calorias */}
						<div className={`bg-linear-to-br ${estilo.cor} rounded-xl p-4 text-white shadow-md`}>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
										<FireIcon size={22} weight="bold" className="text-white" />
									</div>
									<div>
										<p className="text-xs text-white/80 font-medium uppercase tracking-wide mb-0.5">
											Valor Calórico
										</p>
										<p className="text-2xl font-bold">
											{refeicao.calorias} <span className="text-sm font-medium">kcal</span>
										</p>
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

export default CardRefeicao