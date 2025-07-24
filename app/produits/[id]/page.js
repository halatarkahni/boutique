"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
export default function ProductDetails({ params }) {
const { id } = useParams(); // Récupérer l'ID depuis l'URL
const [product, setProduct] = useState(null); // Détails du produit
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const router = useRouter();
// Charger les détails du produit depuis l'API
useEffect(() => {
const fetchProduct = async () => {
try {
const response = await fetch(`https://fakestoreapi.com/products/${id}`);
if (!response.ok) throw new Error("Erreur lors du chargement du produit.");
const data = await response.json();
setProduct(data);
}
catch (err) { setError(err.message);}
finally { setLoading(false);}
};
if (id) fetchProduct();
}, [id]);
const handleAddToCart = () => {
if (product) {
// Rediriger vers la page du panier avec les informations du produit dans les query params
router.push(`/cart/${product.id}?title=${encodeURIComponent(product.title)}&price=${product.price}&image=${product.image}`); } };
if (loading) return <p>Chargement des détails du produit...</p>;
if (error) return <p className="text-red-500">{error}</p>;
return (<div className="p-6 max-w-3xl mx-auto">

<h1 className="text-3xl font-bold mb-4">Détails Produit</h1>
{product && (
<div className="bg-white p-4 rounded shadow">
<h2 className="text-2xl font-bold">{product.title}</h2>
<img src={product.image} alt={product.title} className="w-full h-64 object-cover

rounded my-4"/>

<p className="text-lg text-gray-700 mb-4">${product.price}</p>
<button onClick={handleAddToCart}
className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition

duration-300"> Ajouter au Panier </button>

</div>
)} </div>);}
