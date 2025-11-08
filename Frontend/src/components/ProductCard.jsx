import React from "react";

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
        <p className="text-sm text-slate-500 mb-3">{product.description}</p>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-bold text-blue-700">${product.price}</span>
        <button
          onClick={() => onAdd(product.id)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium"
        >
          Add
        </button>
      </div>
    </div>
  );
}
