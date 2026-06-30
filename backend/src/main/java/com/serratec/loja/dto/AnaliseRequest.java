package com.serratec.loja.dto;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public record AnaliseRequest(
        @NotBlank String perfilCliente,
        @NotBlank String recomendacoes,
        String cupomDesconto,
        @NotBlank String mensagemIA
) {}
