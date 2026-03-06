import CatalogoExercicios from '../../components/catalogoexercicios/CatalogoExercicios'
import ModalExercicio from '../../components/exercicios/modalexercicio/ModalExercicio'

function Home() {
	return (
		<>
			<div className="relative min-h-[70vh] bg-linear-to-br from-slate-100 via-slate-200 to-slate-300 overflow-hidden">
				{/* Elementos decorativos de fundo */}
				<div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl"></div>
				<div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
				
				<div className="container mx-auto px-8 relative z-10">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[60vh]">
						{/* Coluna de conteúdo */}
						<div className="flex flex-col gap-6 items-center lg:items-start justify-center py-8 lg:py-4">
							{/* Badge decorativo */}
							<div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
								<span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
								Sua jornada fitness começa aqui
							</div>
							
							<h2 className="text-5xl lg:text-6xl font-bold text-emerald-900 leading-tight">
								Seja bem vinde!
							</h2>
							
							<p className="text-xl lg:text-2xl text-emerald-800/90 font-light">
								Transforme seus objetivos em conquistas diárias!
							</p>

							{/* Estatísticas rápidas */}
							<div className="flex gap-6 mt-4 flex-wrap">
								<div className="text-center">
									<div className="text-3xl font-bold text-emerald-900">500+</div>
									<div className="text-sm text-emerald-700">Exercícios</div>
								</div>
								<div className="text-center">
									<div className="text-3xl font-bold text-emerald-900">10k+</div>
									<div className="text-sm text-emerald-700">Usuários</div>
								</div>
								<div className="text-center">
									<div className="text-3xl font-bold text-emerald-900">24/7</div>
									<div className="text-sm text-emerald-700">Suporte</div>
								</div>
							</div>

							<div className="flex justify-center lg:justify-start gap-4 mt-4">
								<ModalExercicio />
							</div>
						</div>

						{/* Coluna de imagem */}
						<div className="flex justify-center items-center relative">
							{/* Círculo decorativo atrás da imagem */}
							<div className="absolute w-80 h-80 bg-emerald-500/20 rounded-full blur-2xl"></div>
							
							<div className="relative">
								<img
									src="https://ik.imagekit.io/vzr6ryejm/fitness/home.png?updatedAt=1729954739936"
									alt="Imagem Página Home"
									className="w-full max-w-md h-auto drop-shadow-2xl relative z-10 transform hover:scale-105 transition-transform duration-500"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<CatalogoExercicios />
		</>
	)
}

export default Home