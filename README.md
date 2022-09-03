<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Cursos e Tags

Esse case tem a finaliade de praticar o framework [NestJS](https://nestjs.com/) e outras tecnologias Back-End. Trata-se de uma API REST que realiza um CRUD(cadastro, busca, edição e remoção) de dados relacionados a Cursos e Tags em um banco de dados. Além do [NodeJS](https://nodejs.org/pt-br/) e do [NestJS](https://nestjs.com/), foi ultilzado o banco de dados [PostgreSQL](https://www.postgresql.org/), o framework [typeORM](https://typeorm.io/) para realizar a manipulação do banco de dados, o framework [Jest](https://jestjs.io/pt-BR/) para testes unitários e testes ponta a ponta e2e. Por fim, o projeto desenvolvido utilizando containers [Docker](https://docs.docker.com/).

## Tecnologias e Técnicas 🛠
- [NodeJS](https://nodejs.org/pt-br/)
- [NestJS](https://nestjs.com/)
- [typeORM](https://typeorm.io/)
- [Jest](https://jestjs.io/pt-BR/)
- [PostgreSQL](https://www.postgresql.org/)
- Testes Unitários
- Testes ponta a ponta e2e
- Migração em banco de dados
- Relação entre tabelas muitos p/ muitos 
- POO
- S-O-L-I-D
- Conteinerização com Docker

## ✔️ Features


- [x] Cadastrar um curso com ou sem tags relacionadas a ele.
- [x] Consultar todos cursos ou apenas um 1 passando um id.
- [x] Editar um curso ou as tags relacionadas a ele passando um id.
- [x] Deletar um curso passando um id.

## Modelagem do banco de dados 🎲

O banco de dadas é modelado com 2 entidades: Courses e Tags, cada uma tem sua respectiva tabela, além de uma tabela pivo auxiliar, pois a relacão entre cursos e tags é do tipo muito p/ muitos.


<p align="center">
  <img src="https://user-images.githubusercontent.com/98994187/188250644-3869a466-546b-449e-ba8f-0878ced0a5da.png" width="300" alt="Nest Logo" />
</p>

## Rodar e testar o case com o Docker 🐳

Caso tenha o docker em sua maquina, dê o sequinte comando, o servidor rodará na porta 3000.

Para iniciar o servidor
```
docker compose up
```
Para rodar os testes 
```
npm run test
```
Para rodar os testes ponta a ponta e2e
```
npm run test:e2e
```

Após iniciar o servidor, é possivel testar todos os endpoints no arquivo api.http no qual estão configurados e prontos para uso, bastando substituir os ids nas requisições quando necessario. O arquivo se encotra na raiz do projeto. 

<p align="center">
  <img src="https://user-images.githubusercontent.com/98994187/188251471-e9f8ff97-a5b6-42d6-acbb-0aab5f60ee1c.png" width="600" height="400" alt="Nest Logo" />
</p>

<h2 id="desenvolvedores">👨‍💻 Desenvolvedores</h2>
<table>         
<td><a href="https://github.com/future4code/silveira-Adeir-Maia"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/98994187?v=4" width="100px;" alt="Imagem profile Adeir Moreira desenvolvedor"/><br /><sub><b>Adeir Moreira</b></sub></a><br />   
</table>
