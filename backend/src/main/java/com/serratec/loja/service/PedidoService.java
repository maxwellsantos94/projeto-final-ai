package com.serratec.loja.service;

import com.serratec.loja.dto.*;
import com.serratec.loja.model.Pedido;
import com.serratec.loja.repository.PedidoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PedidoService {

    private static final Logger log = LoggerFactory.getLogger(PedidoService.class);

    private final PedidoRepository pedidoRepository;
    private final RestTemplate restTemplate;
    private final String n8nWebhookUrl;

    public PedidoService(
            PedidoRepository pedidoRepository,
            RestTemplate restTemplate,
            @Value("${n8n.webhook-url}") String n8nWebhookUrl) {
        this.pedidoRepository = pedidoRepository;
        this.restTemplate = restTemplate;
        this.n8nWebhookUrl = n8nWebhookUrl;
    }

    public PedidoResponse criarPedido(PedidoRequest request) {
        Pedido pedido = new Pedido();
        pedido.setCliente(request.cliente());
        pedido.setCidade(request.cidade());
        pedido.setValorTotal(request.valorTotal());
        pedido.setProdutos(request.produtos());
        pedido.setStatus("PENDENTE");

        Pedido salvo = pedidoRepository.save(pedido);
        enviarParaN8n(salvo);

        return toResponse(salvo);
    }

    public PedidoResponse buscarPorId(Long id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Pedido não encontrado: " + id));
        return toResponse(pedido);
    }

    public PedidoResponse atualizarAnalise(Long id, AnaliseRequest request) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Pedido não encontrado: " + id));

        pedido.setPerfilCliente(request.perfilCliente());
        pedido.setRecomendacoes(request.recomendacoes());
        pedido.setCupomDesconto(request.cupomDesconto());
        pedido.setMensagemIA(request.mensagemIA());
        pedido.setStatus("ANALISADO");
        pedido.setAnalisadoEm(LocalDateTime.now());

        return toResponse(pedidoRepository.save(pedido));
    }

    private void enviarParaN8n(Pedido pedido) {
        N8nWebhookPayload payload = new N8nWebhookPayload(
                pedido.getId(),
                pedido.getCliente(),
                pedido.getCidade(),
                pedido.getValorTotal(),
                pedido.getProdutos()
        );

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<N8nWebhookPayload> entity = new HttpEntity<>(payload, headers);

            restTemplate.postForEntity(n8nWebhookUrl, entity, String.class);
            log.info("Pedido {} enviado para n8n com sucesso", pedido.getId());
        } catch (Exception e) {
            log.warn("Falha ao enviar pedido {} para n8n: {}. O pedido foi salvo, mas a análise IA depende do n8n.",
                    pedido.getId(), e.getMessage());
        }
    }

    private PedidoResponse toResponse(Pedido pedido) {
        return new PedidoResponse(
                pedido.getId(),
                pedido.getCliente(),
                pedido.getCidade(),
                pedido.getValorTotal(),
                pedido.getProdutos(),
                pedido.getStatus(),
                pedido.getPerfilCliente(),
                pedido.getRecomendacoes(),
                pedido.getCupomDesconto(),
                pedido.getMensagemIA(),
                pedido.getCriadoEm(),
                pedido.getAnalisadoEm()
        );
    }
}
