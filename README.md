# File Converter Backend

Serviço backend para conversão de arquivos de imagem usando NestJS e RabbitMQ.

## Tecnologias

- NestJS
- RabbitMQ
- Sharp
- Docker
- TypeScript

## Requisitos

- Node.js 20+
- npm
- Docker (opcional)

## Instalação

```bash
# Clone o repositório
git clone [URL_DO_REPOSITÓRIO]
cd file-converter-backend

# Instale as dependências
npm install
```

## Executando o Projeto

### Sem Docker

1. Inicie o RabbitMQ
2. Inicie a API:
```bash
npm run start:api
```
3. Em outro terminal, inicie o worker:
```bash
npm run start:worker
```

### Com Docker

```bash
docker-compose up --build
```

## Uso da API

### Endpoint de Upload

```
POST /files/upload
```

**Body (multipart/form-data):**
- `file`: Arquivo de imagem
- `outputFormat`: Formato de saída (jpeg, png, webp, tiff, avif)

**Exemplo:**
```bash
curl -X POST http://localhost:3000/files/upload \
  -F "file=@imagem.jpg" \
  -F "outputFormat=png"
```

## Estrutura do Projeto

```
file-converter-backend/
├── apps/
│   ├── api/           # API REST
│   └── worker/        # Processador de arquivos
├── tmp/
│   ├── uploads/       # Arquivos enviados
│   └── outputs/       # Arquivos convertidos
└── docker-compose.yml
```

## Monitoramento

- RabbitMQ Management UI: http://localhost:15672
  - Usuário: guest
  - Senha: guest 