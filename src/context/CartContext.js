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

function sameLine(item, id, size) {
  return item.id === id && item.size === size;
}

function reducer(items, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity = 1, size = null } = action;
      const addedQuantity = normalizeQuantity(quantity);
      const existing = items.find((item) => sameLine(item, product.id, size));

      if (existing) {
        return items.map((item) =>
          sameLine(item, product.id, size)
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
          size,
        },
      ];
    }

    case "REMOVE_ITEM":
      return items.filter((item) => !sameLine(item, action.id, action.size));

    case "SET_QUANTITY": {
      const quantity = Math.floor(Number(action.quantity));

      if (!Number.isFinite(quantity) || quantity <= 0) {
        return items.filter(
          (item) => !sameLine(item, action.id, action.size)
        );
      }

      return items.map((item) =>
        sameLine(item, action.id, action.size)
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
  const normalizeHydrated = (items) => {
    // Items saved before size support existed have no `size` key at all
    // (`undefined`), which would no longer match the `null` used for
    // sizeless products today — normalize on read so old carts keep working.
    const normalized = items.map((item) => ({
      ...item,
      size: item.size ?? null,
    }));

    return validProductIds
      ? normalized.filter((item) => validProductIds.includes(item.id))
      : normalized;
  };

  const [items, dispatch] = usePersistedReducer(
    STORAGE_KEY,
    reducer,
    [],
    normalizeHydrated
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
      addItem: (product, quantity = 1, size = null) => {
        dispatch({ type: "ADD_ITEM", product, quantity, size });
        setIsOpen(true);
      },
      removeItem: (id, size = null) =>
        dispatch({ type: "REMOVE_ITEM", id, size }),
      setQuantity: (id, size, quantity) =>
        dispatch({ type: "SET_QUANTITY", id, size, quantity }),
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
