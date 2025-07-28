"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex justify-between items-center">
      
      {/* Titre */}
      <h1 className="text-xl font-bold"></h1>

      {/* Menu de navigation */}
      <nav className="space-x-50">
        <Link href="/" className="hover:underline">Accueil</Link>
        <Link href="/products" className="hover:underline">Nos Produits</Link>
        <Link href="/contact" className="hover:underline">Contact</Link>
      </nav>

      {/* Icône panier */}
      <Link href="/cart">
        <img
          src="/images/panier.png"
          alt="Panier"
          className="h-8 w-8 cursor-pointer hover:opacity-75"
        />
      </Link>
    </header>
  );
}
