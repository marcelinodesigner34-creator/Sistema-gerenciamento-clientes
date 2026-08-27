# Sistema-gerenciamento-clientes
Projeto Integrador II - Tecnologia em Sistemas para Internet UESPI/NEAD - Polo Olho D'Água do Piauí

Sistema de cadastro e gerenciamento de clientes para pequenos negócios e profissionais autônomos, com controle de acesso por perfil de usuário.

## Integrantes
- Marcelino Lopes de Oliveira
- Antonio Monteiro da Silva
- Rogerio Gomes Feitosa
- Francisco Sillas Carvalho 

## Tecnologias utilizadas
- HTML5 - estruturação das telas
- CSS3 - estilização e layout com Flexbox
- JavaScript (ES6) - validações, autenticação e manipulação do DOM
- Git e GitHub - versionamento e repositório remoto

## Funcionalidades implementadas 
- Tela de login com autenticação de usuário
- Formulário de cadastro de cliente com validação de campos obrigatórios
- verificação de CPF duplicado

## Decisões de implementação
- Login por e-mail: o protótipo previa autenticação por e-mail ou cpf, mas a classe Usuário do diagrama de classes não possui o atributo CPF. Optou-se por manter o login apenas por e-mail.
- Persistência: os dados são armazenados em memória (array). A presistência em banco será implementada na Entrega 3, junto com a API Node.

## Link do quadro Trello
https://trello.com/b/xM3PrzMS/sistema-de-gerenciamento-de-clientes
