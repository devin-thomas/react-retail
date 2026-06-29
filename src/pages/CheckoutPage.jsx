import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckoutForm } from "../components/checkout/CheckoutForm";
import { CheckoutSummary } from "../components/checkout/CheckoutSummary";
import { StatePanel } from "../components/common/StatePanel";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { useSubmitOrderMutation } from "../hooks/queries/useSubmitOrderMutation";

export function CheckoutPage() {
  const navigate = useNavigate();
  const { profileName } = useAuth();
  const { cartItems, clearCart, total } = useCart();
  const [customer, setCustomer] = useState({
    name: profileName,
    email: "",
    address: "",
  });

  const orderMutation = useSubmitOrderMutation({
    onSuccess: (order) => {
      clearCart();
      navigate("/checkout/success", { replace: true, state: { order } });
    },
  });

  if (cartItems.length === 0) {
    return (
      <StatePanel>Your cart is empty. Add items before checking out.</StatePanel>
    );
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setCustomer((currentCustomer) => ({
      ...currentCustomer,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    orderMutation.mutate({
      customer,
      items: cartItems,
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <CheckoutSummary cartItems={cartItems} total={total} />
      <CheckoutForm
        customer={customer}
        errorMessage={orderMutation.isError ? orderMutation.error.message : ""}
        isSubmitting={orderMutation.isPending}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
