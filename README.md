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
- **JavaScript (ES6)** — validações, manipulação do DOM e lógica das telas
- **Axios 1.21.1** (via CDN, com versão fixada) — comunicação com a API
- **Git e GitHub** — versionamento; publicação no GitHub Pages

## Funcionalidades

### Acesso

- Login integrado à API, com senha criptografada no servidor
- Menu de navegação com controle por perfil (a opção "Usuários" aparece apenas para administradores)
- Proteção das telas internas e botão de sair
- Nome do usuário logado exibido no topo das telas

### Clientes

- Listagem de clientes carregada do banco de dados
- Busca de clientes por nome ou CPF
- Cadastro e edição de clientes, com validação de campos obrigatórios e CPF duplicado
- Registro do usuário responsável pelo cadastro de cada cliente
- Exclusão de clientes com confirmação

### Usuários (somente administrador)

- Listagem de usuários com nome, e-mail e tipo (sem exibir a senha)
- Cadastro de usuário com seleção do tipo (administrador ou atendente)
- Edição de usuário, com a senha opcional (em branco, a senha atual é mantida)
- Remoção de usuário com confirmação; a API impede remover o próprio usuário
  logado, o último administrador e usuários com clientes cadastrados

### Experiência de uso

- Estado de carregamento: durante o envio, o botão fica desabilitado e exibe
  "Salvando..." ou "Entrando...", voltando ao normal ao final
- Mensagens de erro vindas da API, com o campo correspondente destacado em
  vermelho, sem perder os dados preenchidos

## Organização do código

```
├── index.html              login
├── principal.html          lista de clientes
├── cadastro.html           cadastro e edição de clientes
├── usuarios.html           lista de usuários
├── usuario-cadastro.html   cadastro e edição de usuários
├── css/
│   └── style.css
└── js/
    ├── services/           camada de serviço (comunicação com a API)
    │   ├── api.js              instância base do Axios (endereço da API)
    │   ├── authServices.js     login
    │   ├── clienteServices.js  operações de clientes
    │   └── usuarioServices.js  operações de usuários
    ├── menu.js             menu, proteção das telas e nome do usuário
    ├── script.js           tela de login
    ├── principal.js        lista de clientes
    ├── cadastro.js         cadastro e edição de clientes
    ├── usuarios.js         lista e remoção de usuários
    └── usuario-cadastro.js cadastro e edição de usuários
```

As telas não chamam a API diretamente: elas usam as funções da camada de
serviço (por exemplo, `clienteService.listar()`), e os serviços usam a
instância base do Axios. Assim, nenhuma tela repete o endereço da API nem
os métodos HTTP.

Nos arquivos HTML, os scripts são carregados nesta ordem: Axios, `api.js`,
serviço da tela, `menu.js` e o script da própria tela.

## API

Este front-end consome a API do projeto, disponível em:
https://github.com/marcelinodesigner34-creator/Sistema-gerenciamento-clientes-api

O endereço da API é definido uma única vez, no `baseURL` do arquivo
`js/services/api.js` (por padrão, `http://localhost:3000`).

## Como executar

1. Inicie a API seguindo as instruções do repositório dela
2. Abra este projeto com um servidor local (por exemplo, a extensão Live Server do VS Code)
3. Acesse o `index.html` e entre com um usuário cadastrado

Usuários de teste (dados fictícios do `seed.sql` da API):

| Perfil        | E-mail          | Senha |
| ------------- | --------------- | ----- |
| Administrador | maria@gmail.com | 1234  |
| Atendente     | joao@gmail.com  | 5678  |

## Decisões de implementação

- **Login por e-mail:** a classe Usuário do diagrama de classes não possui CPF;
  por isso a autenticação é feita apenas por e-mail.
- **Persistência:** os dados, antes mantidos em memória (Entrega 2), passaram a
  ser gravados em banco PostgreSQL por meio da API.
- **Camada de serviço e Axios (Entrega 4):** as chamadas `fetch` feitas
  diretamente nas telas foram substituídas por serviços por recurso, usando
  uma instância base do Axios.
- **Versão fixa do Axios:** o endereço do CDN indica a versão exata
  (`axios@1.21.1`), para que o sistema use sempre a versão testada, e não a
  mais recente publicada.
- **Validação pela API:** nas telas de usuário, os campos obrigatórios são
  validados pela API, que informa o campo com erro; a tela usa essa
  informação para destacar o campo correspondente.
- **Controle de acesso:** a restrição das telas de usuário ao administrador
  é feita na interface. A API ainda não utiliza token de autenticação, o que
  fica registrado como melhoria futura.
- **Versão publicada:** a página no GitHub Pages depende da API em execução.
  A publicação da API está prevista para a Entrega 5.

## Links

- Trello: https://trello.com/b/xM3PrzMS/sistema-de-gerenciamento-de-clientes
- Front-end publicado: https://marcelinodesigner34-creator.github.io/Sistema-gerenciamento-clientes/
