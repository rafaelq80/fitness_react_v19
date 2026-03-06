import Popup from "reactjs-popup"
import "reactjs-popup/dist/index.css"
import FormExercicio from "../formexercicio/FormExercicio"

function ModalExercicio() {
	return (
		<>
			<Popup
				trigger={
					<button className="group relative px-8 py-3 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2">
						<span className="text-xl group-hover:scale-110 transition-transform duration-300">
							+
						</span>
						<span>Novo Exercício</span>
					</button>
				}
				modal
				contentStyle={{
					borderRadius: "1rem",
					padding: "0",
					border: "none",
					boxShadow:
						"0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
					maxWidth: "600px",
					width: "90%",
					maxHeight: "90vh",
					overflow: "auto",
				}}
				overlayStyle={{
					background: "rgba(0, 0, 0, 0.5)",
					backdropFilter: "blur(4px)",
				}}
			>
				<FormExercicio />
			</Popup>
		</>
	)
}

export default ModalExercicio
