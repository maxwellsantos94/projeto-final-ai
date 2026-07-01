package com.serratec.loja.config;

import com.serratec.loja.model.Produto;
import com.serratec.loja.repository.ProdutoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedProdutos(ProdutoRepository repository) {
        return args -> {
            if (repository.count() >= 28) {
                return;
            }
            repository.deleteAll();

            List<Produto> produtos = List.of(
                    // Notebooks
                    criarProduto("Notebook Gamer RTX 4060", "Intel i7, 16GB RAM, RTX 4060, SSD 512GB, tela 144Hz", "5499.90", "Notebooks", "💻"),
                    criarProduto("Notebook Gamer RTX 4050", "Intel i5, 8GB RAM, RTX 4050, SSD 512GB", "3999.90", "Notebooks", "💻"),
                    criarProduto("Notebook Ultrafino Pro", "Intel i7, 16GB RAM, SSD 1TB, tela 14\" IPS", "4299.90", "Notebooks", "💻"),
                    criarProduto("Notebook AMD Ryzen 7", "Ryzen 7 7735HS, 16GB RAM, SSD 512GB, Vega integrada", "3299.90", "Notebooks", "💻"),
                    criarProduto("Notebook Office 15\"", "Intel i3, 8GB RAM, SSD 256GB, ideal para estudos", "2199.90", "Notebooks", "💻"),

                    // Periféricos
                    criarProduto("Mouse Gamer Pro", "Sensor 16000 DPI, RGB, 8 botões programáveis", "189.90", "Periféricos", "🖱️"),
                    criarProduto("Mouse Sem Fio Ergonomico", "Conexão 2.4GHz e Bluetooth, bateria 70h", "149.90", "Periféricos", "🖱️"),
                    criarProduto("Teclado Mecânico RGB", "Switch blue, retroiluminação RGB, layout ABNT2", "449.90", "Periféricos", "⌨️"),
                    criarProduto("Teclado Gamer Compacto 60%", "Switch red, ideal para FPS, cabo removível", "329.90", "Periféricos", "⌨️"),
                    criarProduto("Webcam Full HD 1080p", "60fps, microfone integrado, ideal para streaming", "249.90", "Periféricos", "📷"),
                    criarProduto("Mousepad Gamer XXL", "900x400mm, base antiderrapante, bordas costuradas", "89.90", "Periféricos", "🎯"),
                    criarProduto("Hub USB-C 7 em 1", "HDMI, USB 3.0, leitor SD, PD 100W", "199.90", "Periféricos", "🔌"),

                    // Áudio
                    criarProduto("Headset Gamer 7.1", "Som surround, microfone removível, drivers 50mm", "299.90", "Áudio", "🎧"),
                    criarProduto("Headset Wireless Pro", "Bluetooth 5.0, cancelamento de ruído, 30h bateria", "449.90", "Áudio", "🎧"),
                    criarProduto("Caixa de Som Bluetooth", "360° sound, IPX7, 20h bateria, grave reforçado", "279.90", "Áudio", "🔊"),
                    criarProduto("Microfone Condensador USB", "Cardioide, filtro pop incluso, ideal para podcast", "359.90", "Áudio", "🎙️"),

                    // Armazenamento
                    criarProduto("SSD NVMe 1TB", "Leitura 3500MB/s, PCIe 4.0, ideal para games", "459.90", "Armazenamento", "💾"),
                    criarProduto("SSD NVMe 2TB", "Leitura 7400MB/s, PCIe 4.0, alta performance", "799.90", "Armazenamento", "💾"),
                    criarProduto("HD Externo 2TB", "USB 3.0, portátil, backup automático", "399.90", "Armazenamento", "💿"),
                    criarProduto("Pendrive 128GB USB 3.2", "Transferência 200MB/s, compacto e resistente", "79.90", "Armazenamento", "📀"),

                    // Monitores
                    criarProduto("Monitor 27\" 144Hz IPS", "Full HD, FreeSync, HDMI e DisplayPort", "1299.90", "Monitores", "🖥️"),
                    criarProduto("Monitor 24\" 165Hz", "Painel VA, 1ms, curvo, ideal para FPS", "999.90", "Monitores", "🖥️"),
                    criarProduto("Monitor Ultrawide 34\"", "3440x1440, 144Hz, IPS, productividade e games", "2499.90", "Monitores", "🖥️"),
                    criarProduto("Monitor 4K 32\"", "UHD, HDR10, 60Hz, cores profissionais", "2199.90", "Monitores", "🖥️"),

                    // Acessórios
                    criarProduto("Mochila para Notebook 17\"", "Compartimento acolchoado, impermeável, USB externo", "159.90", "Acessórios", "🎒"),
                    criarProduto("Cabo HDMI 2.1 3m", "8K 60Hz, eARC, blindagem tripla", "69.90", "Acessórios", "🔗"),
                    criarProduto("Cooler para Notebook", "6 níveis de ventilação, 5 fans, RGB opcional", "129.90", "Acessórios", "❄️"),
                    criarProduto("Suporte Articulado Monitor", "VESA, ajuste altura/inclinação, braço duplo", "349.90", "Acessórios", "🛠️")
            );

            repository.saveAll(produtos);
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
