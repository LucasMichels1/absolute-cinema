import "./globals.css";
//import { Navbar } from "../components/Navbar";// ESTRANHO NÃO TER DADO CERTO, PORQUE ESTÁ CERTO
import { Navbar } from "@/components/NavBar"; // O @ VAI DIRETO PARA A PASTA SRC, ESTÁ CONFIGURADO NO TSCONFIG.JSON
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Absolute Cinema - Filmes Populares",
  description: "Descubra os filmes mais populares do momento",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="bg-gray-900 min-h-screen">
        <Navbar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
