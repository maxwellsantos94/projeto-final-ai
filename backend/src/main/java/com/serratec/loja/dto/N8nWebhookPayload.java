package com.serratec.loja.dto;

import java.math.BigDecimal;
import java.util.List;

public record N8nWebhookPayload(
        Long id,
        String cliente,
        String cidade,
        BigDecimal valorTotal,
        List<String> produtos
) {}
