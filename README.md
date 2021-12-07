
## Índice
* [General info](#general-info)
* [Tecnologias](#tecnologias)
* [Setup](#setup)
* [Documentação](#documentação)

## Informações Gerais
API em NestJS que consiste em administração de usuários
* O Usuário pode fazer um cadastro comum com: nome, email e senha
* O Usuário terá permissões de login: Administrador ou Comum
* O Usuário pode fazer login ou logout
* O Usuário Administrador poderá listar alguns dados dos demais Usuários comuns, mantendo seus dados sensíveis seguros
* O Usuário Comum não tem acesso aos dados dos outros usuários
* O Usuário pode enviar um email para recuperar sua senha


![GitHub repo size](https://img.shields.io/github/repo-size/carolineccorrea/api-nestjs)
![GitHub](https://img.shields.io/github/license/carolineccorrea/api-nestjs)
![GitHub language count](https://img.shields.io/github/languages/count/carolineccorrea/api-nestjs)
![GitHub top language](https://img.shields.io/github/languages/top/carolineccorrea/api-nestjs)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=carolineccorrea_api-nestjs&metric=alert_status)](https://sonarcloud.io/dashboard?id=carolineccorrea_api-nestjs)


## 🚀 Technologias
Projeto foi criado com: 
* [Nest Framework](https://nestjs.com)
* [PostgreSQL](https://www.postgresql.org)
* [Swagger](https://swagger.io)
* [Jest](https://jestjs.io)
---

## 📰 Documentação
Swagger Open API 🔥

```
$ npm run dev:server
$ localhost:3000/docs
```
---

## 🔧 Testes
Testes realizados com Jest 🔥

```
$ npm test
```
---

## Setup
Para rodar esse projeto, use localmente npm:

```
$ git clone https://github.com/carolineccorrea/api-nestjs.git
$ cd api-nestjs
$ npm install
$ npm run dev:server
```
---

## O servidor inciará na porta:3000 - acesse <http://localhost:3000> 

## AUTENTICAÇÃO DE USUÁRIO
 
 * CADASTRO
 * http://localhost:3000/auth/signup

```
{
  "name": "Fulano",
  "email": "seuemail@gmail.com",
  "password": "12345678",
  "passwordConfirmation": "12345678"	
}
```


* FAZER LOGIN
* http://localhost:3000/auth/signin

```
{
  "email": "seuemail@gmail.com",
  "password": "12345678"
}

```


* CADASTRAR ADMINISTRADOR
* http://localhost:3000/users

```
{
  "name": "admin",
  "email": "admin@email.com",
  "password": "admin",
  "passwordConfirmation": "admin"	
}

```

* Um Administrador pode Listar Usuários ( necesário token do admin )
```
{
  "name": "admin",
  "email": "admin@email.com",
  "password": "admin",
  "passwordConfirmation": "admin"	
}

```



* ENVIAR EMAIL DE RECUPERAÇÃO DE SENHA ( use um email válido para receber a mensagem na sua caixa de entrada )
* http://localhost:3000/auth/send-recover-email

```
{
  "email": "seuemail@gmail.com"
}

```

* RECUPERAR A SENHA ( o token vai o cabeçalho )
* http://localhost:3000/auth/reset-password/:token

```
{
  "password": "startrek1234",
  "passwordConfirmation": "startrek1234"
}

```


---
Desenvolvido por Caroline Correa 👽
