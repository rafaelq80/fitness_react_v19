import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SyncLoader } from 'react-spinners'
import { AuthContext } from '../../../contexts/AuthContext'
import type Exercicio from '../../../models/Exercicio'
import { listar } from '../../../services/Services'
import { ToastAlerta } from '../../../utils/ToastAlerta'
import CardExercicios from '../cardexercicios/CardExercicios'

function ListarExercicios() {
	const navigate = useNavigate()

	const [exercicios, setExercicios] = useState<Exercicio[]>([])

	const { usuario, handleLogout } = useContext(AuthContext)
	const token = usuario.token

	async function buscarExercicios() {
		try {
			await listar('/exercicios', setExercicios, {
				headers: {
					Authorization: token,
				},
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
		buscarExercicios()
	}, [exercicios.length])

	return (
		<>
			{exercicios === undefined && (
				<div className="flex justify-center py-8">
					<SyncLoader color="#064e3b" size={32} />
				</div>
			)}

			<div
				className="
               flex 
                justify-center
                "
			>
				<div className="my-4 container flex flex-col">
					{exercicios.length === 0 && (
						<span className="text-3xl text-center my-8">
							Nenhum exercicio foi encontrado
						</span>
					)}

					<div className="container mx-auto my-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-8">
						{exercicios.map((exercicio) => (
							<CardExercicios
								key={exercicio.id}
								exercicio={exercicio}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default ListarExercicios
