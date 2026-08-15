"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { usePersistedReducer } from "@/hooks/usePersistedReducer";

const STORAGE_KEY = "swagger:cart";
const MAX_QUANTITY = 99;

function normalizeQuantity(quantity) {
  const value = Math.floor(Number(quantity));
  if (!Number.isFinite(value)) return 1;
  return Math.min(MAX_QUANTITY, Math.max(1, value));
}

function reducer(items, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity = 1 } = action;
      const addedQuantity = normalizeQuantity(quantity);
      const existing = items.find((item) => item.id === product.id);

      if (existing) {
        return items.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: normalizeQuantity(item.quantity + addedQuantity),
              }
            : item
        );
      }

      return [
        ...items,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: addedQuantity,
        },
      ];
    }

    case "REMOVE_ITEM":
      return items.filter((item) => item.id !== action.id);

    case "SET_QUANTITY": {
      const quantity = Math.floor(Number(action.quantity));

      if (!Number.isFinite(quantity) || quantity <= 0) {
        return items.filter((item) => item.id !== action.id);
      }

      return items.map((item) =>
        item.id === action.id
          ? { ...item, quantity: normalizeQuantity(quantity) }
          : item
      );
    }

    case "CLEAR_CART":
      return [];

    default:
      return items;
  }
}

const CartContext = createContext(null);

export function CartProvider({ children, validProductIds }) {
  const pruneStaleItems = (items) =>
    validProductIds
      ? items.filter((item) => validProductIds.includes(item.id))
      : items;

  const [items, dispatch] = usePersistedReducer(
    STORAGE_KEY,
    reducer,
    [],
    pruneStaleItems
  );
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return {
      items,
      itemCount,
      total,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem: (product, quantity = 1) => {
        dispatch({ type: "ADD_ITEM", product, quantity });
        setIsOpen(true);
      },
      removeItem: (id) => dispatch({ type: "REMOVE_ITEM", id }),
      setQuantity: (id, quantity) =>
        dispatch({ type: "SET_QUANTITY", id, quantity }),
      clearCart: () => dispatch({ type: "CLEAR_CART" }),
    };
  }, [items, isOpen, dispatch]);

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }

  return context;
}
