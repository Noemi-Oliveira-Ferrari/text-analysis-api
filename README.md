# 🧠 Analyze Text API

API para análise de texto com integração à OpenAI. Ela permite:

- Armazenar textos para análise
- Identificar as palavras mais repetidas
- Fazer análise de sentimento do texto
- Consultar se um termo específico está presente no último texto analisado

---

## 🚀 Tecnologias Utilizadas

- **Node.js** – Ambiente de execução JavaScript
- **NestJS** – Framework para construção da API
- **SQLite** – Banco de dados local e leve
- **Knex** – Query builder e gerenciamento de migrations
- **Jest** – Testes unitários
- **Swagger** – Documentação automática da API
- **OpenAI API** – Para análise de sentimento
- **Insomnia** – Testes de rotas com collection pronta disponível

---

## ▶️ Como Rodar o Projeto

Siga os passos abaixo para rodar o projeto localmente:

### 1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/analyze-text-api.git
cd analyze-text-api
```

### 2. Instale as dependências:

```bash
npm install
```

### 3. Configure a variável de ambiente com sua chave da OpenAI:

Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

```bash
OPENAI_API_KEY=
```

### 4. Execute as migrations para criar as tabelas no banco SQLite:

```bash
npm run db:migrate
```

### 5. Inicie o servidor

```bash
npm run start
```

---

## 🌐 Documentação da API (Swagger)

A documentação da API estará disponível em:
http://localhost:3000/api

---

## 💻 Testes com Insomnia

Este projeto inclui uma collection do Insomnia com todos os endpoints da API.
Basta importar o arquivo .json no Insomnia e começar a testar.

---

## 💻 Testes com JEST

Este projeto inclui 100% de cobertura de testes unitários com JEST.
