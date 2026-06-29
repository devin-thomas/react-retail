import { CartItemRow } from "../components/cart/CartItemRow";
import { CartSummaryCard } from "../components/cart/CartSummaryCard";
import { StatePanel } from "../components/common/StatePanel";
import { useCart } from "../hooks/useCart";

export function CartPage() {
  const { cartItems, itemCount, total, removeItem, updateQuantity } = useCart();

  if (cartItems.length === 0) {
    return (
      <StatePanel>Your cart is empty. Add a product to continue.</StatePanel>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_360px]">
      <section className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tight text-slate-950">
            Cart
          </h1>
          <p className="text-sm text-slate-600">
            Update quantities, remove items, and verify totals before checkout.
          </p>
        </div>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <CartItemRow
              item={item}
              key={item.id}
              onQuantityChange={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>
      </section>
      <CartSummaryCard itemCount={itemCount} total={total} />
    </div>
  );
}
