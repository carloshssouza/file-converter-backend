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
git clone https://github.com/carloshssouza/file-converter-backend.git
cd file-converter-backend

# Instale as dependências
npm install
```

## Configuração

```bash
# Crie um arquivo .env na raiz do projeto
touch .env
```
Copie e cole o conteúdo o conteúdo abaixo para o arquivo .env
```bash
RABBITMQ_URL=amqp://localhost:5672
UPLOAD_DIR=./tmp/uploads
PORT=8000 
```

## Executando o Projeto

### Sem Docker

1. Inicie o RabbitMQ
2. Inicie a API:
```bash
npm run start:prod
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
POST /upload
```

**Body (multipart/form-data):**
- `file`: Arquivo de imagem
- `outputFormat`: Formato de saída (jpeg, png, webp, tiff, avif)

**Exemplo:** 
`http://localhost:3000/upload?outputFormat=png`
```bash
curl -X POST http://localhost:3000/upload \
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