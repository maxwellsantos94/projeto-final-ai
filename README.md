# TechStore — Loja Virtual com IA (n8n + Spring Boot + React)

Aplicação de e-commerce de produtos eletrônicos. Ao finalizar um pedido, o Spring Boot envia os dados para o n8n, que usa IA (Gemini) para analisar a compra e devolver perfil do cliente, recomendações e mensagem personalizada.

## Arquitetura

```
React (5173)  →  POST /pedidos  →  Spring Boot (8080)  →  PostgreSQL/H2
                                        ↓
                                   Webhook n8n (5678)
                                        ↓
                                   Gemini IA
                                        ↓
                              PUT /pedidos/{id}/analise
                                        ↓
                              React exibe análise (polling)
```

## Pré-requisitos

- Java 17+
- Maven 3.8+
- Node.js 18+
- n8n (Docker ou npm)
- Conta Google AI Studio (Gemini API Key gratuita): https://aistudio.google.com/apikey

## 1. Backend (Spring Boot)

```bash
cd backend
mvn spring-boot:run
```

API disponível em `http://localhost:8080`

### Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/produtos` | Lista produtos eletrônicos |
| POST | `/pedidos` | Cria pedido e dispara webhook n8n |
| GET | `/pedidos/{id}` | Consulta pedido (com análise IA) |
| PUT | `/pedidos/{id}/analise` | Recebe análise do n8n |

### Banco de dados

Por padrão usa **H2 em memória** (zero configuração).

Para **PostgreSQL**:

```bash
docker compose up -d
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=postgres
```

Console H2: http://localhost:8080/h2-console (JDBC: `jdbc:h2:mem:loja`, user: `sa`, senha vazia)

### Variáveis de ambiente (opcional)

```bash
N8N_WEBHOOK_URL=http://localhost:5678/webhook/pedido-loja
```

## 2. Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Acesse: http://localhost:5173

## 3. n8n — O que você precisa fazer manualmente

> **Esta parte não pode ser automatizada pelo código.** Siga os passos abaixo.

### 3.1 Instalar e iniciar o n8n

**Opção A — Docker (recomendado):**

```bash
docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n n8nio/n8n
```

**Opção B — npm:**

```bash
npm install -g n8n
n8n start
```

Acesse: http://localhost:5678

### 3.2 Criar credencial do Gemini

1. Acesse https://aistudio.google.com/apikey e gere uma API Key gratuita
2. No n8n: **Settings → Credentials → Add Credential**
3. Busque **Google Gemini** (ou **Google PaLM API**)
4. Cole a API Key e salve

### 3.3 Importar ou criar o workflow

**Importar (mais rápido):**

1. No n8n: **Workflows → Import from File**
2. Selecione `n8n/workflow-pedido-loja.json`
3. Ajuste os nós conforme abaixo

**Ou criar manualmente** com estes 4 nós:

#### Nó 1 — Webhook

- Tipo: **Webhook**
- HTTP Method: **POST**
- Path: `pedido-loja`
- Response Mode: **Immediately**

Após salvar, copie a URL de produção (ex: `http://localhost:5678/webhook/pedido-loja`).

#### Nó 2 — IA (Gemini)

- Tipo: **Basic LLM Chain** ou **AI Agent** com modelo **Google Gemini**
- Prompt:

```
Você é um consultor de vendas de uma loja virtual de eletrônicos.
Analise o pedido recebido abaixo.
Retorne APENAS um JSON válido (sem markdown) contendo:
- perfilCliente
- produtosRecomendados (array)
- mensagemPersonalizada
- cupomDesconto

Pedido: {{ JSON.stringify($json.body) }}
```

#### Nó 3 — Code (processar JSON da IA)

```javascript
const input = $input.first().json;
const raw = input.output || input.text || JSON.stringify(input);

let parsed;
try {
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  parsed = JSON.parse(jsonMatch ? jsonMatch[0] : raw);
} catch (e) {
  parsed = {
    perfilCliente: 'Cliente Tech',
    produtosRecomendados: ['Headset Gamer', 'SSD 1TB'],
    mensagemPersonalizada: 'Obrigado pela compra!',
    cupomDesconto: 'TECH10'
  };
}

const pedidoId = $('Webhook Pedido').first().json.body.id;
const recomendacoes = Array.isArray(parsed.produtosRecomendados)
  ? parsed.produtosRecomendados.join(', ')
  : (parsed.produtosRecomendados || '');

return [{
  json: {
    pedidoId,
    perfilCliente: parsed.perfilCliente,
    recomendacoes,
    cupomDesconto: parsed.cupomDesconto || 'TECH10',
    mensagemIA: parsed.mensagemPersonalizada
  }
}];
```

#### Nó 4 — HTTP Request

- Method: **PUT**
- URL: `http://localhost:8080/pedidos/{{ $json.pedidoId }}/analise`
  - Se n8n estiver no Docker e Spring no host Windows: use `http://host.docker.internal:8080/pedidos/...`
- Body (JSON):

```json
{
  "perfilCliente": "{{ $json.perfilCliente }}",
  "recomendacoes": "{{ $json.recomendacoes }}",
  "cupomDesconto": "{{ $json.cupomDesconto }}",
  "mensagemIA": "{{ $json.mensagemIA }}"
}
```

### 3.4 Ativar o workflow

1. Clique em **Active** (toggle no canto superior direito)
2. Confirme que o webhook está em modo **Production**

### 3.5 Configurar URL do webhook no Spring Boot

Se a URL do webhook for diferente da padrão, defina:

```bash
# Windows PowerShell
$env:N8N_WEBHOOK_URL="http://localhost:5678/webhook/pedido-loja"
mvn spring-boot:run
```

## 4. Testar o fluxo completo

1. Inicie PostgreSQL (opcional), Spring Boot, n8n e React
2. Ative o workflow no n8n
3. Acesse http://localhost:5173
4. Adicione produtos ao carrinho e finalize o pedido
5. Na tela de confirmação, aguarde a análise IA (polling a cada 3s)
6. Verifique no n8n: **Executions** deve mostrar a execução bem-sucedida

### Teste manual da API (sem frontend)

```bash
curl -X POST http://localhost:8080/pedidos ^
  -H "Content-Type: application/json" ^
  -d "{\"cliente\":\"Maria\",\"cidade\":\"Petrópolis\",\"valorTotal\":820,\"produtos\":[\"Notebook Gamer\",\"Mouse Gamer\"]}"
```

## Acessibilidade (Frontend)

- Link "Pular para o conteúdo principal" (skip link)
- Labels em todos os campos de formulário
- `aria-label`, `aria-live`, `role="alert"` para feedback dinâmico
- HTML semântico (`main`, `nav`, `article`, `dl`)
- Foco visível (`:focus-visible`)
- Suporte a `prefers-reduced-motion` e `prefers-contrast`

## Estrutura do projeto

```
├── backend/          # Spring Boot
├── frontend/         # React + Vite
├── n8n/              # Workflow exportável
├── docker-compose.yml
└── README.md
```

## Solução de problemas

| Problema | Solução |
|----------|---------|
| Análise IA não aparece | Verifique se n8n está ativo e o workflow executou sem erro |
| Spring não alcança n8n | Confirme `N8N_WEBHOOK_URL` e se o webhook está em Production |
| n8n não alcança Spring | Use `host.docker.internal:8080` se n8n estiver no Docker |
| Erro Gemini | Verifique credencial e cota da API gratuita |
| CORS | Frontend usa proxy Vite; acesse via localhost:5173 |
