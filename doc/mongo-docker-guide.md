# Guia Completo: MongoDB no Docker

Este guia reúne os comandos e dicas essenciais para rodar, acessar e configurar MongoDB dentro de um container Docker.

---

## 1. Rodar o MongoDB no Docker

- **Comando para iniciar o container MongoDB padrão:**

  ```bash
  docker run -d --name meu-mongo -p 27017:27017 mongo
  ```

  > Explicação:  
  > - `-d`: roda o container em background (detached)  
  > - `--name meu-mongo`: nome personalizado para o container  
  > - `-p 27017:27017`: mapeia a porta do container para a porta local  
  > - `mongo`: usa a imagem oficial do MongoDB  

---

## 2. Verificar se o container está rodando

- **Comando para listar containers ativos:**

  ```bash
  docker ps
  ```

---

## 3. Acessar o MongoDB

### Opção 1: Usar o shell do MongoDB dentro do container

- **Comando para acessar o shell MongoDB dentro do container:**

  ```bash
  docker exec -it meu-mongo mongo
  ```

- **Exemplo de comandos dentro do shell MongoDB:**

  ```js
  show dbs
  use test
  db.collection.insertOne({ nome: "danilo" })
  db.collection.find()
  ```

### Opção 2: Usar o cliente MongoDB localmente

- **Comando para conectar ao MongoDB usando o cliente local:**

  ```bash
  mongo --host localhost --port 27017
  ```

- Ou utilize ferramentas gráficas como [MongoDB Compass](https://www.mongodb.com/products/compass) conectando na URI:

  ```
  mongodb://localhost:27017
  ```

---

## 4. MongoDB com autenticação (usuário e senha)

- **Comando para iniciar MongoDB com usuário root e senha:**

  ```bash
  docker run -d --name meu-mongo -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=senha123 \
    mongo
  ```

- **Para conectar com autenticação, use:**

  ```bash
  mongo --host localhost --port 27017 -u admin -p senha123 --authenticationDatabase admin
  ```

- Ou via URI:

  ```
  mongodb://admin:senha123@localhost:27017
  ```

---

## 5. Persistência de dados com volumes

- **Para garantir que os dados não sejam perdidos quando o container parar, use volumes:**

  ```bash
  docker run -d --name meu-mongo -p 27017:27017 \
    -v mongodata:/data/db \
    mongo
  ```

---

## 6. Parar e remover o container MongoDB

- **Parar o container:**

  ```bash
  docker stop meu-mongo
  ```

- **Remover o container:**

  ```bash
  docker rm meu-mongo
  ```

---

## 7. Exemplo básico de `docker-compose.yml`

Se preferir usar Docker Compose para facilitar, aqui vai um exemplo simples:

```yaml
version: "3.8"
services:
  mongo:
    image: mongo
    container_name: meu-mongo
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: senha123
    volumes:
      - mongodata:/data/db

volumes:
  mongodata:
```

- Para rodar, salve esse arquivo e execute:

  ```bash
  docker-compose up -d
  ```

---

## Dicas Extras

- Use o comando `docker logs meu-mongo` para ver os logs do container e verificar erros.  
- Para acessar o shell do container (não o mongo shell, mas o terminal Linux do container), rode:  

  ```bash
  docker exec -it meu-mongo bash
  ```  
- Lembre-se que o MongoDB só estará acessível no host enquanto o container estiver rodando e a porta estiver mapeada.  

---

Se quiser, posso ajudar a criar scripts mais avançados, configurar replica sets, backups ou integrar com sua aplicação Node.js. Só avisar!  
