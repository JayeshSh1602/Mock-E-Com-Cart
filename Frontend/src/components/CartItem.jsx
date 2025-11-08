import React from "react";

export default function CartItem({ item, onRemove }) {
  return (
    <div className="flex justify-between items-start py-2 border-b border-slate-100">
      <div>
        <div className="font-medium">{item.name}</div>
        <div className="text-xs text-slate-500">
          {item.qty} × ${item.price}
        </div>
      </div>
      <div className="text-right">
        <div className="font-semibold">${item.qty * item.price}</div>
        <button
          onClick={() => onRemove(item.id)}
          className="text-xs text-red-500 hover:underline mt-1"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
