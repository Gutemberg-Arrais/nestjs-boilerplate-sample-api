<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descrição

Este é um boilerplate baseado no framework [NestJS](https://github.com/nestjs/nest) para desenvolvimento rápido de aplicações backend. Este projeto serve como ponto de partida para construir APIs escaláveis e bem estruturadas, seguindo as melhores práticas de desenvolvimento.

O boilerplate inclui configurações pré-definidas para:

- Conexão com banco de dados PostgreSQL
- Cache com Redis
- Estrutura modular pronta para expansão
- Configurações de ambiente via arquivos .env

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Docker e Docker Compose (para PostgreSQL e Redis)

## Instalação

```bash
# Instalar dependências
$ npm install

# Configurar variáveis de ambiente
# Copie o arquivo .env.example para .env e ajuste as configurações conforme necessário
$ cp .env.example .env

# As principais variáveis a serem configuradas são:
# - DATABASE_NAME, DATABASE_HOST, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD
# - CACHE_HOST, CACHE_PORT, CACHE_TTL, CACHE_TIMEOUT
```

## Configuração do Docker

Para facilitar o desenvolvimento, você pode usar Docker para executar o PostgreSQL e Redis. Crie um arquivo `docker-compose.yml` na raiz do projeto com o seguinte conteúdo:

```yaml
version: '3'

services:
  postgres:
    image: postgres:13
    ports:
      - '5432:5432'
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:6
    ports:
      - '6379:6379'
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

Inicie os containers com:

```bash
$ docker-compose up -d
```

## Executando a aplicação

```bash
# Modo de desenvolvimento
$ npm run start

# Modo de desenvolvimento com hot-reload
$ npm run start:dev

# Modo de produção
$ npm run start:prod
```

## Estrutura do projeto

O boilerplate segue a estrutura modular recomendada pelo NestJS:

```
src/
├── app.controller.ts      # Controlador principal
├── app.module.ts          # Módulo principal
├── app.service.ts         # Serviço principal
├── database.module.ts     # Configuração do banco de dados
├── main.ts                # Ponto de entrada da aplicação
└── modules/               # Módulos da aplicação
```

## Testes

```bash
# Testes unitários
$ npm run test

# Testes e2e
$ npm run test:e2e

# Cobertura de testes
$ npm run test:cov
```

## Expandindo o boilerplate

Para adicionar novos recursos à sua aplicação:

1. Crie novos módulos na pasta `src/modules/`
2. Adicione os módulos ao `AppModule` em `src/app.module.ts`
3. Implemente controladores, serviços e entidades conforme necessário

## Suporte

NestJS é um projeto de código aberto licenciado sob MIT. Ele pode crescer graças aos patrocinadores e ao apoio de incríveis apoiadores. Se você gostaria de se juntar a eles, por favor [leia mais aqui](https://docs.nestjs.com/support).

## Contato

- Autor - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## Licença

NestJS é [licenciado sob MIT](LICENSE).
