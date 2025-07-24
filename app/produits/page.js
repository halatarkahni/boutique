"use client";
import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) {
          throw new Error("Erreur lors du chargement des produits.");
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false); // Arrêt du chargement
      }
    };
    setTimeout(()=>(fetchProducts()),2000);
  }, []);
  if (loading) {
    return (
      <div className="p-4 text-center">
        <p className="text-xl font-semibold">Chargement des produits...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500 text-xl font-semibold">
          Erreur lors du chargement des produits.
        </p>
      </div>
    );
  }
  return (<ProductList produits={products} />);
}