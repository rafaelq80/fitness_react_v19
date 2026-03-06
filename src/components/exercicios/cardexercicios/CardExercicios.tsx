import { PencilIcon, TrashIcon } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import type Exercicio from '../../../models/Exercicio'

interface CardExercicioProps {
	exercicio: Exercicio
}

function CardExercicios({ exercicio }: CardExercicioProps) {
	return (
		<div className="flex flex-col max-w-sm overflow-hidden transition-all duration-300 bg-white shadow-md rounded-2xl hover:shadow-2xl hover:-translate-y-1">
			{/* Header do Card */}
			<div className="flex items-center justify-between p-4 text-white bg-linear-to-r from-emerald-800 to-emerald-600">
				<div className="flex items-center gap-3">
					<div className="p-1 bg-white rounded-full shadow-md">
						<img
							src={exercicio.categoria?.icone}
							alt={exercicio?.categoria?.descricao}
							className="object-contain w-9 h-9"
						/>
					</div>
					{exercicio.categoria && (
						<p className="text-base font-semibold">
							{exercicio.categoria.descricao}
						</p>
					)}
				</div>
				<div className="flex gap-2">
					<Link to={`/atualizarexercicio/${exercicio.id}`}>
						<button className="p-2 transition-all duration-200 rounded-full hover:bg-white/20">
							<PencilIcon
								size={20}
								weight="bold"
								className="text-white hover:text-emerald-200"
							/>
						</button>
					</Link>

					<Link to={`/deletarexercicio/${exercicio.id}`}>
						<button className="p-2 transition-all duration-200 rounded-full hover:bg-white/20">
							<TrashIcon 
								size={20} 
								weight="bold"
								className="text-white hover:text-red-300" 
							/>
						</button>
					</Link>
				</div>
			</div>

			{/* Imagem do Exercício */}
			<div className="relative p-6 bg-linear-to-br from-amber-100 to-amber-200">
				<img
					src={exercicio.foto}
					className="object-fit w-full h-48 rounded-xl drop-shadow-lg"
					alt={exercicio.nome}
				/>
			</div>

			{/* Conteúdo do Card */}
			<div className="flex flex-col flex-1 p-5">
				{/* Nome do Exercício */}
				<div className="flex items-center justify-center mb-4 min-h-12">
					<h3 className="text-lg font-bold tracking-wide text-center text-gray-800 uppercase">
						{exercicio.nome}
					</h3>
				</div>

				{/* Informações do Treino */}
				<div className="p-4 space-y-2 border shadow-sm bg-linear-to-br from-emerald-50 to-emerald-100 rounded-xl border-emerald-200">
					<h4 className="flex items-center gap-2 mb-3 text-sm font-bold text-emerald-900">
						<span className="w-1 h-4 rounded bg-emerald-600"></span>
						Detalhes do Treino
					</h4>
					
					<div className="grid grid-cols-2 gap-2 text-sm">
						{exercicio.tempo !== 0 && (
							<div className="flex items-center gap-2">
								<span className="font-medium text-emerald-700">⏱️</span>
								<span className="text-gray-700">
									<strong>{exercicio.tempo}</strong> min
								</span>
							</div>
						)}
						
						{exercicio.serie !== 0  && (
							<div className="flex items-center gap-2">
								<span className="font-medium text-emerald-700">🔢</span>
								<span className="text-gray-700">
									<strong>{exercicio.serie}</strong> séries
								</span>
							</div>
						)}
						
						{exercicio.repeticao !== 0  && (
							<div className="flex items-center gap-2">
								<span className="font-medium text-emerald-700">🔁</span>
								<span className="text-gray-700">
									<strong>{exercicio.repeticao}</strong> vezes
								</span>
							</div>
						)}
						
						{exercicio.descanso !== 0  && (
							<div className="flex items-center gap-2">
								<span className="font-medium text-emerald-700">⏸️</span>
								<span className="text-gray-700">
									<strong>{exercicio.descanso}</strong> min
								</span>
							</div>
						)}
						
						{exercicio.peso !== 0  && (
							<div className="flex items-center gap-2">
								<span className="font-medium text-emerald-700">🏋️</span>
								<span className="text-gray-700">
									<strong>{exercicio.peso}</strong> kg
								</span>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Botão de Ação */}
			<button
				className="flex items-center justify-center w-full gap-2 py-3 font-semibold text-white transition-all duration-300 shadow-md cursor-pointer bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 hover:shadow-lg"
				onClick={() => console.log('Adicionar ao treino')}
			>
				<span className="text-lg">✓</span>
				Adicionar ao Treino
			</button>
		</div>
	)
}

export default CardExercicios