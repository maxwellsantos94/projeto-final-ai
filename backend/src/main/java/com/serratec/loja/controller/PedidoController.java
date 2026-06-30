package com.serratec.loja.controller;

import com.serratec.loja.dto.AnaliseRequest;
import com.serratec.loja.dto.PedidoRequest;
import com.serratec.loja.dto.PedidoResponse;
import com.serratec.loja.service.PedidoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @PostMapping
    public ResponseEntity<PedidoResponse> criarPedido(@Valid @RequestBody PedidoRequest request) {
        PedidoResponse response = pedidoService.criarPedido(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PedidoResponse> buscarPedido(@PathVariable Long id) {
        return ResponseEntity.ok(pedidoService.buscarPorId(id));
    }

    @PutMapping("/{id}/analise")
    public ResponseEntity<PedidoResponse> atualizarAnalise(
            @PathVariable Long id,
            @Valid @RequestBody AnaliseRequest request) {
        return ResponseEntity.ok(pedidoService.atualizarAnalise(id, request));
    }
}
