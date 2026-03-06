import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { type ReactNode, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {
  const navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    ToastAlerta("Usuário desconectado!", "info");
    navigate("/");
  }

  let component: ReactNode;

  if (usuario.token !== "") {
    component = (
      <div className="w-full bg-linear-to-r from-emerald-900 via-emerald-800 to-emerald-900 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/home" className="shrink-0 transition-transform hover:scale-105 duration-300">
              <img
                src="https://ik.imagekit.io/vzr6ryejm/fitness/logo_fitness.png?updatedAt=1729955274597"
                alt="Logo"
                className="w-60"
              />
            </Link>

            {/* Barra de Pesquisa */}
            <div className="flex-1 flex justify-center items-center mx-8">
              <form 
                className="w-full max-w-2xl relative" 
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("Envio do formulário impedido!");
                }}
              >
                <div className="relative flex items-center">
                  <input
                    className="w-full h-11 rounded-full px-5 py-3 bg-white/95 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white transition-all duration-300 shadow-md"
                    type="search"
                    placeholder="Pesquisar exercício"
                    id="busca"
                    name="busca"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-2 bg-emerald-600 hover:bg-emerald-500 rounded-full w-9 h-9 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md"
                  >
                    <MagnifyingGlassIcon
                      size={18}
                      weight="bold"
                      className="text-white"
                    />
                  </button>
                </div>
              </form>
            </div>

            {/* Menu de Navegação */}
            <div className="flex items-center gap-6">
              <Link 
                to="/exercicios" 
                className="text-sm font-medium hover:text-emerald-300 transition-colors duration-200 relative group"
              >
                Exercícios
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              
              <Link 
                to="/categorias" 
                className="text-sm font-medium hover:text-emerald-300 transition-colors duration-200 relative group"
              >
                Categorias
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              
              <Link 
                to="/cadastrarcategoria" 
                className="text-sm font-medium hover:text-emerald-300 transition-colors duration-200 relative group"
              >
                Cadastrar Categoria
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              
              <Link 
                to="" 
                onClick={logout} 
                className="text-sm font-medium hover:text-emerald-300 transition-colors duration-200 relative group"
              >
                Sair
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              
              {/* Avatar do Usuário */}
              <Link to="/perfil" className="relative group">
                <div className="relative">
                  <img
                    src={usuario.foto}
                    alt={usuario.nome}
                    className="rounded-full w-10 h-10 object-cover border-2 border-emerald-300 transition-all duration-300 group-hover:border-emerald-400 group-hover:scale-110 shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-emerald-900"></div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{component}</>;
}

export default Navbar;