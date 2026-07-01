import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ProductsProvider } from './context/ProductsContext';
import MainLayout, { ShopLayout } from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryPage from './pages/CategoryPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';

function App() {
  return (
    <BrowserRouter>
      <ProductsProvider>
        <CartProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route element={<ShopLayout />}>
                <Route path="produtos" element={<ProductsPage />} />
                <Route path="categorias" element={<CategoriesPage />} />
                <Route path="categorias/:slug" element={<CategoryPage />} />
              </Route>
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="pedido/:id" element={<OrderConfirmationPage />} />
            </Route>
          </Routes>
        </CartProvider>
      </ProductsProvider>
    </BrowserRouter>
  );
}

export default App;
