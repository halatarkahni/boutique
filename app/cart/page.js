"use client";
import { useState, useEffect } from "react";
export default function Cart() {
const [cart, setCart] = useState([]); // État local pour le panier
// Charger le panier depuis localStorage au chargement de la page
useEffect(() => {
const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
setCart(savedCart);
}, []);
const handleRemoveFromCart = (productId) => {
// Supprimer un produit du panier
const updatedCart = cart.filter((item) => item.id !== productId);
setCart(updatedCart);
localStorage.setItem("cart", JSON.stringify(updatedCart)); // Mettre à jour localStorage
};
const calculateTotal = () =>
cart.reduce((total, item) => total + item.price * item.quantity, 0);
return (
<div className="p-6 max-w-3xl mx-auto">
<h1 className="text-3xl font-bold mb-4"> Panier</h1>
{cart.length === 0 ? (<p>Votre panier est vide.</p>)
: (
<div className="bg-white p-4 rounded shadow">
{cart.map((item) => (
<div key={item.id}
className="flex justify-between items-center mb-4">
<div className="flex items-center">
<img
src={item.image}
alt={item.title}
className="w-16 h-16 object-cover rounded"/>
<div className="ml-4">
<h2 className="text-lg font-bold"> {item.title}</h2>
<p className="text-gray-500">
Quantité : {item.quantity} x ${item.price} </p>
</div>
</div>
<button onClick={
() => handleRemoveFromCart(item.id)}
className="text-red-500
hover:underline">Supprimer
</button>
</div>
))}
<div className="text-right">
<p className="text-xl font-bold">
Total :
${calculateTotal().toFixed(2)}
</p>
</div>
</div>
)}
</div>
);
}