/*"use client";
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
// "produits est un tableau d'objets"
export default function ProductList({ produits }) {
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        if (!res.ok) {
          throw new Error("Erreur lors du chargement des produits.");
        }
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false); // Arrêt du chargement
      }
    };
    setTimeout(() => (fetchCategories()), 500);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-center text-3xl font-bold mb-8">Produits</h1>
      <select>
          {
          categories.map((cat) => (
            <option value="${cat}">{cat}</option>
          ))
          }
        </select>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
        {produits.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
          />
        ))}
      </div>
    </div>
  )
}
*/


version(2)

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
    if (selectedCat !== "all") {
      temp = temp.filter((p) => p.category === selectedCat);
    }
    if (search) {
      temp = temp.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (sort === "asc") {
      temp.sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
      temp.sort((a, b) => b.price - a.price);
    }
    setFiltered(temp);
  }, [selectedCat, search, sort, products]);
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
        {/* Tri par prix */}
        <select
          className="border p-2 rounded"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">-- Trier --</option>
          <option value="asc">Prix ↑</option>
          <option value="desc">Prix ↓</option>
        </select>
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