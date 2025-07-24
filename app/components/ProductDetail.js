import React from 'react'

export default function ProductDetail({ title, image, price, description }) {
    return (
        <div className="p-6 max-w-lg mx-auto bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            <img src={image} alt={title} className="w-full h-64 object-cover mb-4" />
            <p className="text-lg font-semibold text-gray-700">${price}</p>
            <p className="text-gray-500 mt-4">{description}</p>
        </div>
    )
}


