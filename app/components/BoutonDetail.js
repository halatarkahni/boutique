

import { useRouter } from 'next/navigation';
import React from 'react';

export default function BoutonDetail({id}) {
    const router=useRouter();
  return (
    <button

     //onClick={() => router.push(`/products/${id}`)}

     onClick={() => router.push(`/products/${id}`)}
      className="bg-blue-500 text-white px-4 py-2
    rounded hover:bg-blue-700
     transition-colors duration-300 mt-4">
Voir détails
</button>
  )
}
