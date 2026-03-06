import { Link } from 'react-router-dom'
import { Pencil, Trash } from '@phosphor-icons/react'
import type Categoria from '../../../models/Categoria'

interface CardCategoriaProps {
	categoria: Categoria
}

function CardCategorias({ categoria }: CardCategoriaProps) {
	return (
		<div className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1">
			{/* Header */}
			<div className="bg-linear-to-r from-emerald-600 to-emerald-700 px-6 py-4">
				<h3 className="text-white font-semibold text-base">
					Categoria
				</h3>
			</div>

			{/* Content */}
			<div className="p-6">
				{/* Icon and Description */}
				<div className="flex items-center gap-4 mb-6">
					{/* Icon Display */}
					<div className="shrink-0 w-16 h-16 bg-linear-to-br from-emerald-50 to-emerald-100 rounded-xl flex items-center justify-center border-2 border-emerald-200 shadow-sm">
						{categoria.icone ? (
							typeof categoria.icone === 'string' && categoria.icone.startsWith('http') ? (
								<img
									src={categoria.icone}
									alt={`Ícone da Categoria ${categoria.descricao}`}
									className="w-10 h-10 object-contain"
								/>
							) : (
								<span className="text-3xl">{categoria.icone}</span>
							)
						) : (
							<span className="text-3xl">📋</span>
						)}
					</div>

					{/* Description */}
					<div className="flex-1 min-w-0">
						<p className="text-xl font-bold text-gray-800 truncate mb-1">
							{categoria.descricao}
						</p>
					</div>
				</div>

				{/* Divider */}
				<div className="h-px bg-gray-200 mb-6" />

				{/* Action Buttons */}
				<div className="flex gap-3">
					<Link
						to={`/atualizarcategoria/${categoria.id}`}
						className="flex-1"
					>
						<button className="w-full px-4 py-2.5 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
							<Pencil size={16} weight="bold" />
							<span>Editar</span>
						</button>
					</Link>

					<Link
						to={`/deletarcategoria/${categoria.id}`}
						className="flex-1"
					>
						<button className="w-full px-4 py-2.5 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
							<Trash size={16} weight="bold" />
							<span>Deletar</span>
						</button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default CardCategorias