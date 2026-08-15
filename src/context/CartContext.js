"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { readLocalStorage, writeLocalStorage } from "@/lib/storage";

const STORAGE_KEY = "swagger:cart";

const CartContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.items };

    case "ADD_ITEM": {
      const { product, quantity = 1 } = action;
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity,
          },
        ],
      };
    }

    case "REMOVE_ITEM":
      return { items: state.items.filter((item) => item.id !== action.id) };

    case "SET_QUANTITY": {
      if (action.quantity <= 0) {
        return { items: state.items.filter((item) => item.id !== action.id) };
      }

      return {
        items: state.items.map((item) =>
          item.id === action.id
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };
    }

    case "CLEAR_CART":
      return { items: [] };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch({ type: "HYDRATE", items: readLocalStorage(STORAGE_KEY, []) });
  }, []);

  useEffect(() => {
    writeLocalStorage(STORAGE_KEY, state.items);
  }, [state.items]);

  const value = useMemo(() => {
    const itemCount = state.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const subtotal = state.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return {
      items: state.items,
      itemCount,
      subtotal,
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
  }, [state.items, isOpen]);

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
