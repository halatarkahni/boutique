/*import BoutonDetail from "./BoutonDetail";

export default function ProductCard({id, image, title, price }) {

return (
<div className="border rounded shadow-lg hover:shadow-xl transition-shadow
duration-300 p-4">

<img src={image} alt={title} className="h-40 w-full object-cover rounded"/>
<h3 className="mt-4 text-lg font-bold">{title}</h3>
<p className="text-primary font-semibold">${price}</p>
<BoutonDetail id={id}/>

</div>
);
}*/

import BoutonBack from "./BoutonBack";
import BoutonDetail from "./BoutonDetail";
export default function ProductCard({ product }) {
return (
<div className="border p-4 rounded shadow">
<img src={product.image} alt={product.title} className="h-40 mx-auto
object-contain mb-4" />
<h2 className="font-semibold text-lg mb-2">{product.title}</h2>
<p className="text-sm text-gray-600 mb-2">{product.category}</p>
<p className="font-bold">{product.price.toFixed(2)} €</p>
<BoutonDetail id={product.id}/>
</div>
);
}