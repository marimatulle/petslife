# Petslife - Carteira de Vacinação Virtual para Pets
## Introdução:
O projeto consiste em uma carteira de vacinação virtual para pets, que visa facilitar o acompanhamento das vacinas e cuidados de saúde dos animais de estimação. Neste README, explicarei o que o projeto faz, seu objetivo e como utilizá-lo.
## Objetivo:
O objetivo principal do projeto é facilitar a vida dos donos de pet e veterinários, tendo a carteira de vacinação em qualquer lugar, sem precisar ficar levando papéis e assim facilitando também o controle e o acesso as informações de saúde do animal.
## Tecnologias utilizadas:
- ReactJS
- Tailwind CSS
- Firebase
## Funcionalidades:
1) Cadastro e Login:
- O sistema permite o cadastro e login de dois tipos de usuários: donos de pets e veterinários;
- No cadastro são exibidos dois botões, aonde será selecionado entre "Sou Veterinário" ou "Sou Tutor";
- Se selecionado "Sou Veterinário", obrigatoriamente precisará ser preenchido o CRMV no formulário de cadastro.
2) Perfil:
- Ambos usuários têm acesso ao perfil, onde podem:
  - Alterar a foto de perfil;
  - Visualizar o nome completo, username e, no caso de veterinários, o CRMV;
  - Adicionar outros usuários (donos de pets ou veterinários);
  - O botão de logout, o botão que leva até as carteiras e o search de usuários ficam no topo da página.
3) Carteira de Vacinação:
- Para usuários donos de pet:
  - Existe um botão "+" para criar uma nova carteira;
  - Os dados do pet incluem:
    - Nome do pet;
    - Espécie;
    - Raça;
    - Breve descrição;
    - Foto do pet.
  - Os donos de pets não podem fazer upload dos comprovantes de vacinação.
- Para usuários veterinários:
  - Na página de carteiras, aparecem apenas as carteiras dos pets que eles atendem;
  - O veterinário pode fazer upload dos comprovantes de vacinação.
- Ambos os usuários possuem um search para pesquisar o pet pelo nome.
4) Amigos:
- Ambos os usuários têm sua página de amigos, onde ficam as pessoas adicionadas;
- Na página de amigos pode ser desfeita a amizade com outro usuário e também pode acessar e visualizar o perfil de outro usuário;
- O intuito é de veterinários e donos de pets se conectarem, para assim o veterinário conseguir fazer upload dos comprovantes na carteira do pet, mas caso um dono de pet queira ter outro dono de pet adicionado ele poderá.
## Utilização:
1) Acesse o site e faça o cadastro;
2) Faça o login com suas credenciais;
3) Crie uma carteira para cada pet, preenchendo os detalhes necessários;
4) Adicione o veterinário à sua conta;
5) O veterinário fará o upload dos comprovantes de vacinação na carteira.
