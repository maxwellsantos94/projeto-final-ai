package com.serratec.loja.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import java.util.List;

public record PedidoRequest(
        @NotBlank String cliente,
        @NotBlank String cidade,
        @NotNull @Positive BigDecimal valorTotal,
        @NotEmpty List<String> produtos
) {}
