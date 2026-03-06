import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react";
import { useContext, type ReactNode } from "react";
import AuthContext from "../../contexts/AuthContext";

function Footer() {
  let data = new Date().getFullYear();

  const { usuario } = useContext(AuthContext);

  let component: ReactNode;

  if (usuario.token !== "") {
    component = (
      <footer className="bg-linear-to-r from-emerald-900 via-emerald-800 to-emerald-900 text-white shadow-2xl mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            {/* Título e Copyright */}
            <div>
              <h3 className="text-xl font-bold mb-1">
                Aplicativo Fitness
              </h3>
              <p className="text-emerald-200 text-sm">
                Copyright © {data}
              </p>
            </div>

            {/* Redes Sociais */}
            <div className="flex items-center gap-6">
              <span className="text-sm font-medium text-emerald-100">
                Acesse nossas redes sociais
              </span>
              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/school/generationbrasil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-full transition-all duration-300 hover:bg-white/20 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <LinkedinLogoIcon 
                    size={24} 
                    weight="bold" 
                    className="text-white hover:text-emerald-300 transition-colors duration-300"
                  />
                </a>
                
                <a
                  href="https://www.instagram.com/generationbrasil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-full transition-all duration-300 hover:bg-white/20 hover:scale-110"
                  aria-label="Instagram"
                >
                  <InstagramLogoIcon 
                    size={24} 
                    weight="bold"
                    className="text-white hover:text-emerald-300 transition-colors duration-300"
                  />
                </a>
                
                <a
                  href="https://www.facebook.com/generationbrasil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-full transition-all duration-300 hover:bg-white/20 hover:scale-110"
                  aria-label="Facebook"
                >
                  <FacebookLogoIcon 
                    size={24} 
                    weight="bold"
                    className="text-white hover:text-emerald-300 transition-colors duration-300"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return <>{component}</>;
}

export default Footer;