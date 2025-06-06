
# Guia Prático Docker e Docker Compose Moderno (v2)

## Índice
- [Introdução ao Docker](#introdução-ao-docker)
- [Por que usar Docker?](#por-que-usar-docker)
- [Dockerfile básico para Node.js](#dockerfile-básico-para-nodejs)
- [Comandos Docker essenciais](#comandos-docker-essenciais)
- [Docker Compose Moderno (v2)](#docker-compose-moderno-v2)
- [Instalando o Docker Compose V2 no Linux](#instalando-o-docker-compose-v2-no-linux)
- [Exemplo de arquivo docker-compose.yml para Node.js](#exemplo-de-arquivo-docker-composeyml-para-nodejs)
- [Comandos Docker Compose](#comandos-docker-compose)
- [Dicas e cuidados](#dicas-e-cuidados)

---

## Introdução ao Docker

Docker é uma plataforma para criar, distribuir e rodar aplicações dentro de **containers** isolados, que incluem todas as dependências e configurações necessárias. Isso garante que sua aplicação funcione da mesma forma em qualquer lugar.

---

## Por que usar Docker?

- Ambiente consistente em todos os lugares (desenvolvimento, teste, produção).
- Isolamento das aplicações.
- Facilita deploy e escalabilidade.
- Compartilhamento de imagens prontas via Docker Hub.
- Simplifica a instalação e configuração do ambiente.

---

## Dockerfile básico para Node.js

```Dockerfile
# Usa a imagem oficial Node.js
FROM node:18

# Define diretório de trabalho
WORKDIR /app

# Copia arquivos de dependência
COPY package*.json ./

# Instala todas as dependências (incluindo dev)
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .

# Expõe a porta que a aplicação usa
EXPOSE 3000

# Comando para rodar o nodemon (ou outro script)
CMD ["npm", "run", "dev"]
```

---

## Comandos Docker essenciais

- **Construir uma imagem a partir do Dockerfile:**

  ```bash
  docker build -t nome-da-imagem .
  ```

- **Listar imagens:**

  ```bash
  docker images
  ```

- **Rodar container da imagem (mapeando portas):**

  ```bash
  docker run -p 3000:3000 nome-da-imagem
  ```

- **Rodar container com volume para desenvolvimento (sincroniza código local):**

  ```bash
  docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules nome-da-imagem
  ```

- **Listar containers rodando:**

  ```bash
  docker ps
  ```

- **Parar container:**

  ```bash
  docker stop <container_id>
  ```

- **Remover container parado:**

  ```bash
  docker container prune
  ```

- **Remover imagem:**

  ```bash
  docker rmi nome-da-imagem
  ```

---

## Docker Compose Moderno (v2)

Docker Compose é uma ferramenta para definir e rodar múltiplos containers Docker usando um arquivo de configuração YAML.

O Docker Compose moderno (v2) é distribuído como **plugin oficial do Docker**, não depende mais de Python e é usado pelo comando:

```bash
docker compose
```

(sem hífen)

---

## Instalando o Docker Compose V2 no Linux

Se o comando `docker compose` não estiver disponível, instale o plugin manualmente:

```bash
mkdir -p ~/.docker/cli-plugins
curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 -o ~/.docker/cli-plugins/docker-compose
chmod +x ~/.docker/cli-plugins/docker-compose
```

Depois verifique:

```bash
docker compose version
```

---

## Exemplo de arquivo `docker-compose.yml` para Node.js

```yaml
version: "3.8"

services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./:/app
      - /app/node_modules
    command: npm run dev
```

Este arquivo:

- Constrói a imagem a partir do `Dockerfile` local.
- Mapeia a porta 3000.
- Sincroniza o código local para dentro do container.
- Preserva a pasta `node_modules` do container para não ser sobrescrita pelo volume local.
- Roda o comando `npm run dev` (ex: com nodemon).

---

## Comandos Docker Compose

- **Subir o ambiente:**

  ```bash
  docker compose up
  ```

- **Subir em modo detached (em background):**

  ```bash
  docker compose up -d
  ```

- **Parar e remover containers, redes e volumes criados:**

  ```bash
  docker compose down
  ```

- **Ver logs:**

  ```bash
  docker compose logs -f
  ```

---

## Minhas dicas 

- **Comando para verificar se o container está rodando:**
  ```bash
  docker ps
  ```
#### Opção 1: Usar mongo shell dentro do container**
- **Comando para usar no docker**
  ```bash
  docker exec -it meu-mongo mongo
  ```
#### Opção 2: Usar o cliente mongo na sua máquina
- **Comando para usar localmente (na maquina)**
  ```bash
  mongo --host localhost --port 27017
  ```

## Dicas e cuidados

- Sempre evite nome de imagens com letras maiúsculas ou espaços. Use somente letras minúsculas, números, traços `-` ou underline `_`.
- Ao usar volumes para desenvolvimento, preserve `node_modules` para não perder dependências.
- Use o `docker compose` moderno sempre que possível, pois é mais rápido e estável.
- Mantenha seu Docker atualizado.
- Para ambientes de produção, crie imagens otimizadas e minimize dependências de desenvolvimento.

---

# FIM

---

Se quiser, posso ajudar a personalizar esse arquivo para o seu projeto, gerar scripts prontos ou até mesmo um tutorial passo a passo mais detalhado. Quer?
