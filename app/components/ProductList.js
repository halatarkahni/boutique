"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  // ✅ Nouveaux états pour le prix min et max
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Étape 1 : récupération des produits
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
      });
    // Étape 2 : récupération des catégories
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((cats) => setCategories(["all", ...cats]));
  }, []);

  // Étapes 3 & 4 : filtrage et tri
  useEffect(() => {
    let temp = [...products];

    // ✅ Filtrage par catégorie
    if (selectedCat !== "all") {
      temp = temp.filter((p) => p.category === selectedCat);
    }

    // ✅ Filtrage par recherche
    if (search) {
      temp = temp.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // ✅ Filtrage par prix minimum
    if (minPrice !== "") {
      temp = temp.filter((p) => p.price >= parseFloat(minPrice));
    }

    // ✅ Filtrage par prix maximum
    if (maxPrice !== "") {
      temp = temp.filter((p) => p.price <= parseFloat(maxPrice));
    }

    // ✅ Tri par prix ou par titre
    if (sort === "asc") {
      temp.sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
      temp.sort((a, b) => b.price - a.price);
    } else if (sort === "az") {
      temp.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "za") {
      temp.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFiltered(temp);
  }, [selectedCat, search, sort, minPrice, maxPrice, products]);

  // ✅ Fonction pour réinitialiser tous les filtres
  const resetFilters = () => {
    setSelectedCat("all");
    setSearch("");
    setSort("");
    setMinPrice("");
    setMaxPrice("");
    setFiltered(products); // Remet la liste complète
  };

  return (
    <div className="p-4">
      {/* Filtres */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        {/* Catégories */}
        <select
          className="border p-2 rounded"
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.toUpperCase()}
            </option>
          ))}
        </select>

        {/* Recherche */}
        <input
          type="text"
          placeholder="🔍 Rechercher..."
          className="border p-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Tri */}
        <select
          className="border p-2 rounded"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">-- Trier --</option>
          <option value="asc">Prix ↑</option>
          <option value="desc">Prix ↓</option>
          <option value="az">Titre A → Z</option>
          <option value="za">Titre Z → A</option>
        </select>

        {/* Prix min et max */}
        <input
          type="number"
          placeholder="Prix min"
          className="border p-2 rounded w-24"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Prix max"
          className="border p-2 rounded w-24"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        {/* ✅ Bouton Réinitialiser */}
        <button
          className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition"
          onClick={resetFilters}
        >
          Réinitialiser les filtres
        </button>
      </div>

      {/* Affichage des produits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.length > 0 ? (
          filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>Aucun produit trouvé.</p>
        )}
      </div>
    </div>
  );
}
