# Estrutura de Pastas de um Projeto Node.js

Este documento apresenta uma estrutura padrão para organizar um projeto Node.js, com índice, resumo e explicação detalhada de cada parte da arquitetura.

---

## 📑 Índice

1. [Resumo Geral](#resumo-geral)  
2. [Estrutura Completa de Pastas](#estrutura-completa-de-pastas)  
3. [Explicação Detalhada por Pasta e Arquivo](#explicacao-detalhada-por-pasta-e-arquivo)  

---

## 📌 Resumo Geral

Organizar seu projeto Node.js com uma arquitetura modular e clara traz diversos benefícios:

- Facilita a manutenção e o entendimento do código, tanto para você quanto para outros devs.
- Permite o reaproveitamento de código.
- Ajuda a escalar o projeto com organização.
- Torna testes unitários e integrados mais simples de implementar.

A estrutura abaixo é uma prática comum quando se usa Express, MongoDB (Mongoose) ou outro ORM/ODM, mas pode ser adaptada para outras necessidades.

---

## Estrutura Completa de Pastas

```
meu-projeto/
│
├── node_modules/          
├── public/                
│   ├── css/
│   ├── js/
│   └── imagens/
│
├── src/                   
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── middlewares/
│   └── utils/
│
├── views/                 
├── docs/                  
│
├── .env                   
├── .gitignore             
├── package.json           
├── package-lock.json      
└── server.js              
```

---

## Explicação Detalhada por Pasta e Arquivo

### 📁 `node_modules/`
- Contém todas as dependências instaladas pelo npm/yarn.
- Nunca versionar essa pasta no Git (inclua em `.gitignore`).
- Exemplo: ao rodar `npm install express`, os arquivos ficam aqui.

---

### 📁 `public/`
- Arquivos estáticos públicos: CSS, JS, imagens, fontes.
- Usado para frontend servir conteúdo estático.
- Express pode servir essa pasta com `app.use(express.static('public'))`.

Exemplo:

```
public/
├── css/
│   └── style.css
├── js/
│   └── app.js
└── imagens/
    └── logo.png
```

No HTML, referencie: `<link rel="stylesheet" href="/css/style.css">`

---

### 📁 `src/` — Código-fonte principal da aplicação

#### 📂 `controllers/`  
- Controladores recebem as requisições, chamam serviços e retornam respostas.
- Exemplo de uso:

```js
// src/controllers/userController.js
const userService = require('../services/userService');

exports.getUsers = async (req, res) => {
  try {
    const users = await userService.findAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};
```

---

#### 📂 `models/`  
- Define os modelos de dados, schemas para MongoDB/Mongoose, ou tabelas para Sequelize.
- Exemplo com Mongoose:

```js
// src/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
```

---

#### 📂 `routes/`  
- Define as rotas e mapeia para os controladores.
- Exemplo:

```js
// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);

module.exports = router;
```

No `server.js`, você registra as rotas:

```js
const userRoutes = require('./src/routes/userRoutes');
app.use('/api', userRoutes);
```

---

#### 📂 `services/`  
- Contém a lógica de negócio, comunicação com banco, regras específicas.
- Mantém os controladores limpos.
- Exemplo:

```js
// src/services/userService.js
const User = require('../models/User');

exports.findAllUsers = async () => {
  return await User.find();
};

exports.createUser = async (data) => {
  const user = new User(data);
  return await user.save();
};
```

---

#### 📂 `middlewares/`  
- Funções que interceptam requisições para autenticação, validação, logging, etc.
- Exemplo middleware de autenticação:

```js
// src/middlewares/authMiddleware.js
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Não autorizado' });
  }
  next();
};
```

No `server.js`:

```js
const authMiddleware = require('./src/middlewares/authMiddleware');
app.use(authMiddleware);
```

---

#### 📂 `utils/`  
- Funções auxiliares reutilizáveis, helpers, formatações.
- Exemplo:

```js
// src/utils/formatDate.js
exports.formatDate = (date) => {
  return new Date(date).toLocaleDateString('pt-BR');
};
```

---

### 📁 `views/`
- Templates HTML para renderização no servidor.
- Pode ser com EJS, Pug, Handlebars etc.
- Exemplo: `res.render('index', { title: 'Home' })`

---

### 📁 `docs/`
- Documentação do projeto, anotações, dicas, comandos úteis, manuais.
- Ajuda a equipe e futuros colaboradores.

---

### Arquivos principais no root

- `.env`: variáveis sensíveis (ex: senhas, tokens, URLs). Use com [dotenv](https://www.npmjs.com/package/dotenv).
- `.gitignore`: lista o que o Git deve ignorar (ex: node_modules, .env).
- `package.json` e `package-lock.json`: gerenciam dependências e scripts.
- `server.js` ou `app.js`: arquivo inicial que configura o Express, conecta banco e sobe o servidor.

---

> Ter uma estrutura clara ajuda qualquer desenvolvedor (incluindo você mesmo no futuro) a entender e dar manutenção no projeto com facilidade.
