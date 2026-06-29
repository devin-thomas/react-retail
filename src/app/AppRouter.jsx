import { Route, Routes } from "react-router-dom";
import { AppShell } from "./AppShell";
import { ProtectedRoute } from "../routes/ProtectedRoute";
import { CartPage } from "../pages/CartPage";
import { CatalogPage } from "../pages/CatalogPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { CheckoutSuccessPage } from "../pages/CheckoutSuccessPage";
import { LoginPage } from "../pages/LoginPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ProductDetailPage } from "../pages/ProductDetailPage";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout/success"
          element={
            <ProtectedRoute>
              <CheckoutSuccessPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
