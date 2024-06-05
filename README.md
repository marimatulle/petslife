# Petslife - Carteira de Vacinação Virtual para Pets
## Introdução:
O projeto consiste em uma carteira de vacinação virtual para pets, que visa facilitar o acompanhamento das vacinas e cuidados de saúde dos animais de estimação. Neste README, explicarei o que o projeto faz, seu objetivo e como utilizá-lo.
## Objetivo:
O objetivo principal do projeto é facilitar a vida dos tutores e veterinários, tendo a carteira de vacinação em qualquer lugar, sem precisar ficar levando papéis e assim facilitando também o controle e o acesso as informações de saúde do animal.
## Tecnologias utilizadas:
- ReactJS
- Tailwind CSS
- Firebase
## Funcionalidades:
1) Cadastro e Login:
- O sistema permite o cadastro e login de dois tipos de usuários: tutores e veterinários;
- No cadastro são exibidos dois botões, aonde será selecionado entre "Sou Veterinário" ou "Sou Tutor";
- Se selecionado "Sou Veterinário", obrigatoriamente precisará ser preenchido o CRMV no formulário de cadastro.
2) Perfil:
- Ambos usuários têm acesso ao perfil, onde podem:
  - Alterar a foto de perfil;
  - Visualizar o nome completo, username e, no caso de veterinários, o CRMV;
  - Adicionar outros usuários
  - Os botões de logout, cards, profile e o search de usuários ficam no topo da página.
3) Carteira de Vacinação:
- Para os tutores:
  - Existe um botão "+" para criar uma nova carteira;
  - Os dados do pet incluem:
    - Nome;
    - Espécie;
    - Raça;
    - Sexo;
    - Idade;
    - Cor;
    - Se é castrado;
    - Doenças pré-existentes;
    - Foto do pet.
  - Os tutores não podem fazer upload dos comprovantes de vacinação.
- Para os veterinários:
  - Na página de carteiras, aparecem apenas as carteiras dos pets que eles atendem, no caso dos pets dos tutores que eles tem adicionado como amigos;
  - O veterinário pode fazer upload dos comprovantes de vacinação.
- Ambos os usuários possuem um search para pesquisar o animal pelo nome.
4) Amigos:
- Ambos os usuários possuem dois botões no perfil, o de amigos e o de solicitações;
- No perfil de um usuário pesquisado, pode ser enviada uma solicitação de amizade, cancelada a solicitação ou desfeita a amizade (no caso de veterinário se conectando com tutor ou vice versa), no caso de tutor pesquisando outro tutor ou veterinário pesquisando outro veterinário, eles apenas poderão visualizar o perfil um do outro sem a funcionalidade de amizade, pois o intuito da aplicação é conectar tutores com veterinários para assim o veterinário fazer upload dos comprovantes de vacinação na carteira do pet;
## Utilização:
1) Acesse o site e faça o cadastro;
2) Faça o login com suas credenciais;
3) Crie uma carteira para cada pet, preenchendo as informações necessárias;
4) Adicione o veterinário à sua conta;
5) O veterinário fará o upload dos comprovantes de vacinação na carteira.
