// BARRA DE NAVEGAÇÃO QUE IRÁ FICAR EM CIMA DA PÁGINA
// PONTO IMPORTANTE, NO NEXT.JS NÃO UTILIZA REACT ROULER, ELE JÁ VEM COM O SISTEMA DE ROTAS PRONTOS
// NO  NEXT.JS É USADO NEXT/LINK, NÃO LINK FROM REACT-ROUTER-DOM PARA IMPORTAR


import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
          >
            Absolute Cinema
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Início
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
