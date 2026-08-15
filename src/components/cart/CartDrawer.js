"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartLineItem from "./CartLineItem";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";

export default function CartDrawer() {
  const { items, total, isOpen, closeCart } = useCart();
  const panelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") closeCart();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}
    >
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-overlay transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho de compras"
        tabIndex={-1}
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-border bg-surface transition-transform duration-300 focus:outline-none ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Carrinho {items.length > 0 && `(${items.length})`}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Fechar carrinho"
            className="flex h-9 w-9 items-center justify-center rounded-md text-subtle hover:bg-surface-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X size={18} strokeWidth={1.6} aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex h-full items-center">
              <EmptyState
                title="Seu carrinho está vazio"
                description="Adicione produtos para vê-los aqui."
              />
            </div>
          ) : (
            <ul>
              {items.map((item) => (
                <CartLineItem key={item.id} item={item} />
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5">
            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="text-muted">Total</span>
              <span className="text-base font-semibold text-foreground">
                {formatPrice(total)}
              </span>
            </div>
            <Button
              type="button"
              variant="primary"
              className="w-full"
              disabled
              title="Checkout ainda não disponível nesta demo"
            >
              Finalizar Compra
            </Button>
            <button
              type="button"
              onClick={closeCart}
              className="mt-3 w-full text-center text-xs uppercase tracking-wide text-muted hover:text-foreground"
            >
              Continuar comprando
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
