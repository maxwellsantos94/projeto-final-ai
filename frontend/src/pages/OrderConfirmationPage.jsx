import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import OrderConfirmation from '../components/OrderConfirmation';
import { buscarPedido } from '../services/api';

function OrderConfirmationPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(location.state?.pedido ?? null);
  const [loading, setLoading] = useState(!location.state?.pedido);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    if (location.state?.pedido) return;

    buscarPedido(id)
      .then(setPedido)
      .catch((e) => setErro(e.message))
      .finally(() => setLoading(false));
  }, [id, location.state]);

  if (loading) {
    return (
      <div className="page-container confirmation-page">
        <div className="loading-screen" aria-live="polite">
          <div className="spinner" aria-hidden="true" />
          <p>Carregando pedido...</p>
        </div>
      </div>
    );
  }

  if (erro || !pedido) {
    return (
      <div className="page-container confirmation-page">
        <div role="alert" className="alert alert-error">
          {erro || 'Pedido não encontrado'}
        </div>
        <button type="button" className="btn btn-primary" onClick={() => navigate('/')}>
          Voltar para a loja
        </button>
      </div>
    );
  }

  return (
    <div className="page-container confirmation-page">
      <OrderConfirmation
        pedido={pedido}
        onVoltar={() => navigate('/')}
      />
    </div>
  );
}

export default OrderConfirmationPage;
