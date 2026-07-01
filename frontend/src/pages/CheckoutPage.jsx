import { useNavigate } from 'react-router-dom';
import Checkout from '../components/Checkout';
import { useCart } from '../context/CartContext';

function CheckoutPage() {
  const navigate = useNavigate();
  const { carrinho, totalCarrinho, limparCarrinho } = useCart();

  const handlePedidoCriado = (pedido) => {
    limparCarrinho();
    navigate(`/pedido/${pedido.id}`, { state: { pedido } });
  };

  return (
    <div className="page-container checkout-page">
      <Checkout
        itens={carrinho}
        total={totalCarrinho}
        onVoltar={() => navigate(-1)}
        onPedidoCriado={handlePedidoCriado}
      />
    </div>
  );
}

export default CheckoutPage;
