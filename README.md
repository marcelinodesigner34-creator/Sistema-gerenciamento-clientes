# Sistema de Gerenciamento de Clientes

Projeto Integrador II — Tecnologia em Sistemas para Internet
UESPI/NEAD — Polo Olho D'Água do Piauí

Interface web do sistema de cadastro e gerenciamento de clientes para
pequenos negócios e profissionais autônomos, com controle de acesso por
perfil de usuário.

## Integrantes

- Marcelino Lopes de Oliveira
- Antonio Monteiro da Silva
- Francisco Sillas Carvalho Oliveira

## Tecnologias

- **HTML5** — estrutura das telas
- **CSS3** — estilização com Flexbox, Grid e media queries
- **JavaScript (ES6)** — validações, manipulação do DOM e integração com a API via `fetch`
- **Git e GitHub** — versionamento; publicação no GitHub Pages

## Funcionalidades

- Login integrado à API, com senha criptografada no servidor
- Menu de navegação com controle por perfil (a opção "Usuários" aparece apenas para administradores)
- Proteção das telas internas e botão de sair
- Listagem de clientes carregada do banco de dados
- Busca de clientes por nome ou CPF
- Cadastro e edição de clientes, com validação de campos obrigatórios e CPF duplicado
- Exclusão de clientes com confirmação

## API

Este front-end consome a API do projeto, disponível em:
https://github.com/marcelinodesigner34-creator/Sistema-gerenciamento-clientes-api

O endereço da API é definido na constante `API_URL` dos arquivos JavaScript
(por padrão, `http://localhost:3000`).

## Como executar

1. Inicie a API seguindo as instruções do repositório dela
2. Abra este projeto com um servidor local (por exemplo, a extensão Live Server do VS Code)
3. Acesse o `index.html` e entre com um usuário cadastrado

## Decisões de implementação

- **Login por e-mail:** a classe Usuário do diagrama de classes não possui CPF;
  por isso a autenticação é feita apenas por e-mail.
- **Persistência:** os dados, antes mantidos em memória (Entrega 2), passaram a
  ser gravados em banco PostgreSQL por meio da API.
- **Telas de usuários:** o gerenciamento de usuários foi planejado para a
  Entrega 4, junto com os endpoints correspondentes na API.
- **Versão publicada:** a página no GitHub Pages depende da API em execução.
  A publicação da API está prevista para a Entrega 5.

## Links

- Trello: https://trello.com/b/xM3PrzMS/sistema-de-gerenciamento-de-clientes
- Front-end publicado: https://marcelinodesigner34-creator.github.io/Sistema-gerenciamento-clientes/