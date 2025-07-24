import ProductList from "../components/ProductList";

export default async function Products() {
    const res = await fetch('https://fakestoreapi.com/products');
    // Gestion des erreurs
    if (!res.ok) { return <p className="text-center text-red-500">Erreur lors du chargement des produits.</p>; }
    const products = await res.json();
    return (
        <>
        <ProductList produits={products}/>
        </>
    );
}