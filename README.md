# Build de um programa em node usando docker

## Esse projeto consiste em gerar um docker que faz todo um app rodar em modo desenvolvimento

Usando docker-compose:
2. Setup do banco de dados
3. Setup do app
1. Setup do ngnix como proxy reverso

## Como testar

```bash 
  git clone git@github.com:ronaldocutrim/docker-express-app.git
```

```bash 
  docker-compose up -d
```

Depois e so abrir localmente no navegador o [localhost:8080](http://localhost:8080)

![Preview do app](./preview.png)

O Docker compose está completamente automatizado, ao inserir dados no input a aplição ira persistir no banco de dados.