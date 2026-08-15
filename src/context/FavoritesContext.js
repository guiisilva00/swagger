"use client";

import { createContext, useContext, useMemo } from "react";
import { usePersistedReducer } from "@/hooks/usePersistedReducer";

const STORAGE_KEY = "swagger:favorites";

function reducer(ids, action) {
  switch (action.type) {
    case "TOGGLE": {
      const exists = ids.includes(action.id);
      return exists ? ids.filter((id) => id !== action.id) : [...ids, action.id];
    }

    default:
      return ids;
  }
}

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [ids, dispatch] = usePersistedReducer(STORAGE_KEY, reducer, []);

  const value = useMemo(
    () => ({
      ids,
      count: ids.length,
      isFavorite: (id) => ids.includes(id),
      toggleFavorite: (id) => dispatch({ type: "TOGGLE", id }),
    }),
    [ids, dispatch]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites deve ser usado dentro de um FavoritesProvider"
    );
  }

  return context;
}
