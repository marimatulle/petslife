# Petslife - Carteira de Vacinação Virtual para Pets
## Introdução:
O projeto consiste em uma carteira de vacinação virtual para pets, que visa facilitar o acompanhamento das vacinas e cuidados de saúde dos animais de estimação. Neste README, explicarei o que o projeto faz, seu objetivo e como utilizá-lo.
## Objetivo:
O objetivo principal do projeto é facilitar a vida dos donos de pet e veterinários, tendo a carteira de vacinação em qualquer lugar, sem precisar ficar levando papéis e assim facilitando também o controle e o acesso as informações de saúde do animal.
## Tecnologias utilizadas:
- React.js
- Tailwind CSS
- Firebase
## Funcionalidades:
1) Cadastro e Login:
- O sistema permite o cadastro e login de dois tipos de usuários: donos de pets e veterinários;
- No cadastro são exibidos dois botões, aonde será selecionado entre "Sou Veterinário" ou "Sou Tutor";
- Se selecionado "Sou Veterinário", obrigatoriamente precisará ser preenchido o CRMV no formulário de cadastro.
2) Página do Usuário:
- Ambos usuários têm acesso à página do usuário, onde podem:
  - Alterar a foto de perfil e a foto de capa;
  - Visualizar o nome completo, username e, no caso de veterinários, o CRMV;
  - Adicionar outros usuários (donos de pet ou veterinários);
  - O botão de logout fica na página do usuário.
3) Carteira de Vacinação:
- Para usuários donos de pet:
  - Existe um botão "+" para criar uma nova carteira;
  - Os dados do pet incluem:
    - Nome do pet;
    - Espécie;
    - Raça;
    - Breve descrição;
    - Foto do pet.
  - Os donos de pet não podem fazer upload dos comprovantes de vacinação.
- Para usuários veterinários:
  - Na página de carteiras, aparecem apenas as carteiras dos pets que eles atendem;
  - O veterinário pode fazer upload dos comprovantes de vacinação.
- Ambos os usuários possuem um search para pesquisar o pet pelo nome.
## Utilização:
1) Acesse o site e faça o cadastro;
2) Faça o login com suas credenciais;
3) Crie uma carteira para cada pet, preenchendo os detalhes necessários;
4) Adicione o veterinário à sua conta;
5) O veterinário fará o upload dos comprovantes de vacinação na carteira.
