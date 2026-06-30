package com.serratec.loja.config;

import com.serratec.loja.model.Produto;
import com.serratec.loja.repository.ProdutoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedProdutos(ProdutoRepository repository) {
        return args -> {
            if (repository.count() > 0) {
                return;
            }

            repository.save(criarProduto(
                    "Notebook Gamer",
                    "Notebook Intel i7, 16GB RAM, RTX 4060, SSD 512GB",
                    "3499.90",
                    "Notebooks",
                    "💻"
            ));
            repository.save(criarProduto(
                    "Mouse Gamer",
                    "Mouse óptico 16000 DPI, RGB, 8 botões programáveis",
                    "189.90",
                    "Periféricos",
                    "🖱️"
            ));
            repository.save(criarProduto(
                    "Teclado Mecânico",
                    "Switch blue, retroiluminação RGB, layout ABNT2",
                    "449.90",
                    "Periféricos",
                    "⌨️"
            ));
            repository.save(criarProduto(
                    "Headset Gamer",
                    "Som surround 7.1, microfone removível, USB",
                    "299.90",
                    "Áudio",
                    "🎧"
            ));
            repository.save(criarProduto(
                    "SSD 1TB NVMe",
                    "Leitura 3500MB/s, ideal para upgrade de notebook",
                    "459.90",
                    "Armazenamento",
                    "💾"
            ));
            repository.save(criarProduto(
                    "Monitor 27\" 144Hz",
                    "Painel IPS, Full HD, FreeSync, HDMI e DisplayPort",
                    "1299.90",
                    "Monitores",
                    "🖥️"
            ));
            repository.save(criarProduto(
                    "Webcam Full HD",
                    "1080p 60fps, microfone integrado, ideal para home office",
                    "249.90",
                    "Periféricos",
                    "📷"
            ));
            repository.save(criarProduto(
                    "Mochila para Notebook",
                    "Compartimento acolchoado até 17\", impermeável",
                    "159.90",
                    "Acessórios",
                    "🎒"
            ));
        };
    }

    private Produto criarProduto(String nome, String descricao, String preco, String categoria, String emoji) {
        Produto produto = new Produto();
        produto.setNome(nome);
        produto.setDescricao(descricao);
        produto.setPreco(new BigDecimal(preco));
        produto.setCategoria(categoria);
        produto.setImagemUrl(emoji);
        return produto;
    }
}
