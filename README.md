# React-Chat-App

Este projeto é um aplicativo de chat em tempo real desenvolvido para afins de aprendizado em React, Socket.IO e melhor compreensão sobre gerenciamento de estado. O aplicativo permite que usuários se comuniquem em tempo real, trocando mensagens de texto e imagens.

> Todo o projeto foi feito de acordo com o vídeo tutorial → [MERN Stack Project: Realtime Chat App Tutorial - React.js & Socket.io](https://youtu.be/ntKkVrQqBYY)

## Tecnologias Utilizadas:

### Front-end:

- React: Biblioteca JavaScript para construção de interfaces de usuário.
- React Router DOM: Para gerenciamento de rotas no aplicativo.
- Tailwind CSS: Framework CSS para estilização utilitária.
- DaisyUI: Biblioteca de componentes para Tailwind CSS.
- Lucide React: Biblioteca de ícones.
- React Hot Toast: Biblioteca para notificações toast.
- Zustand: Biblioteca para gerenciamento de estado global.
- Axios: Cliente HTTP para fazer requisições à API.
- Socket.IO Client: Para comunicação em tempo real com o servidor.

### Back-end:

- Node.js: Ambiente de execução JavaScript para o servidor.
- Express: Framework web para Node.js.
- MongoDB: Banco de dados NoSQL para persistência de dados.
- Cloudinary: Serviço de armazenamento e gerenciamento de imagens.
- bcryptjs: Para criptografia de senhas.
- jsonwebtoken: Para autenticação com tokens JWT.
- cookie-parser: Middleware para analisar cookies.
- cors: Middleware para habilitar Cross-Origin Resource Sharing (CORS).
- dotenv: Para carregar variáveis de ambiente de um arquivo .env.
- Socket.IO: Para comunicação em tempo real com o cliente.

## Para executar o Projeto

### Front-End

- Crie um arquivo .env na pasta _client_ e insira:

```
MODE=development
```

Para iniciar localmente, no terminal, execute um a um:

```
cd client
npm install
npm run dev
```

### Back-End

- Crie um arquivo .env na pasta _server_ e insira:

```
MONGODB_URI=...
PORT=5000
JWT_SECRET=...

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

NODE_ENV=development
```

Para iniciar localmente, no terminal, execute um a um:

```
cd server
npm install
npm run dev
```

Teste aqui → [Chat App](https://react-chat-app-snbq.onrender.com/)
