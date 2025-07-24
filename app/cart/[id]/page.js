"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
export default function Cart({ params }) {
const { id } = useParams(); // Récupérer l'ID depuis l'URL
const searchParams = useSearchParams(); // Récupérer les paramètres d'URL
const [cart, setCart] = useState([]); // État local pour le panier
// Charger le produit depuis les query params
const product = {
id,
title: searchParams.get("title"),
price: parseFloat(searchParams.get("price")),
image: searchParams.get("image"),
};

// Ajouter le produit au panier
const handleAddToCart = () => {
setCart((prevCart) => {
const exists = prevCart.find((item) => item.id === product.id);
if (exists) {
// Si le produit existe, augmenter sa quantité
return prevCart.map((item) =>
item.id === product.id
? { ...item, quantity: item.quantity + 1 }
: item
);
}
// Ajouter un nouveau produit avec une quantité de 1
return [...prevCart, { ...product, quantity: 1 }];
});
};

// Supprimer un produit du panier
const handleRemoveFromCart = (productId) => {
setCart((prevCart) => prevCart.filter((item) => item.id

!== productId));
};
// Calculer le total du panier
const calculateTotal = () =>
cart.reduce((total, item) => total + item.price *

item.quantity, 0);

return (
<div className="p-6 max-w-3xl mx-auto">
{/* Affichage des détails du produit ajouté */}
<h1 className="text-3xl font-bold mb-4">Détails Produit</h1>
<div className="bg-white p-4 rounded shadow mb-6">
<h2 className="text-2xl font-bold">{product.title}</h2>
<img
src={product.image}
alt={product.title}
className="w-full h-64 object-cover rounded my-4"
/>
<p className="text-lg text-gray-700 mb-4">${product.price}</p>

<button onClick={handleAddToCart} className="bg-blue-500 text-white px-4 py-2
rounded hover:bg-blue-700 transition duration-300">
Ajouter au Panier
</button>
</div>
{/* Affichage du panier */}
<h1 className="text-3xl font-bold mb4">Panier</h1>
{cart.length === 0?(<p>Votre panier est vide.</p>):
(<div className="bg-white p-4 rounded shadow">
{cart.map((item) => (
<div key={item.id} className="flex justify-between items-center mb-4">
<div className="flex items-center">
<img
src={item.image}
alt={item.title}
className="w-16 h-16 object-cover rounded"/>
<div className="ml-4">
<h2 className="text-lg font-bold"> {item.title}</h2>
<p className="text-gray-500">Quantité :
{item.quantity} x ${item.price}</p>
</div>
</div>
<button
onClick={() =>
handleRemoveFromCart(item.id)}
className="text-red-500 hover:underline">
Supprimer
</button>
</div>))}
<div className="text-right">
<p className="text-xl font-bold">
Total : ${calculateTotal().toFixed(2)}
</p>
</div>
</div>

)}
</div>
);
}