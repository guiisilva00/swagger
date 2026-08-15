"use client";

import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { readLocalStorage, writeLocalStorage } from "@/lib/storage";

const STORAGE_KEY = "swagger:favorites";

const FavoritesContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "HYDRATE":
      return { ids: action.ids };

    case "TOGGLE": {
      const exists = state.ids.includes(action.id);
      return {
        ids: exists
          ? state.ids.filter((id) => id !== action.id)
          : [...state.ids, action.id],
      };
    }

    default:
      return state;
  }
}

export function FavoritesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { ids: [] });

  useEffect(() => {
    dispatch({ type: "HYDRATE", ids: readLocalStorage(STORAGE_KEY, []) });
  }, []);

  useEffect(() => {
    writeLocalStorage(STORAGE_KEY, state.ids);
  }, [state.ids]);

  const value = useMemo(
    () => ({
      ids: state.ids,
      count: state.ids.length,
      isFavorite: (id) => state.ids.includes(id),
      toggleFavorite: (id) => dispatch({ type: "TOGGLE", id }),
    }),
    [state.ids]
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
