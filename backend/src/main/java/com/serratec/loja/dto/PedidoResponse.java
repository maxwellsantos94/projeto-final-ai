package com.serratec.loja.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record PedidoResponse(
        Long id,
        String cliente,
        String cidade,
        BigDecimal valorTotal,
        List<String> produtos,
        String status,
        String perfilCliente,
        String recomendacoes,
        String cupomDesconto,
        String mensagemIA,
        LocalDateTime criadoEm,
        LocalDateTime analisadoEm
) {}
