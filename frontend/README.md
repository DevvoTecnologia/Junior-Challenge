# Módulo de Autenticação
O projeto inclui um módulo de autenticação que permite aos usuários se registrarem e fazerem login. Após o registro, um cookie de autenticação é criado para manter os usuários logados. As principais rotas relacionadas à autenticação são:

Registrar: Cria um novo usuário e estabelece um cookie de autenticação.
Login: Autentica um usuário e cria um cookie de sessão.
Logout: Remove o cookie de autenticação e finaliza a sessão.
Validar Token: Verifica a validade do token de sessão.

# Módulo de Gerenciamento de Anéis
A aplicação também possui um módulo completo para o gerenciamento de anéis. As principais funcionalidades deste módulo são:

 - Cadastro de Anéis: Permite criar novos anéis com informações como nome, forjador, portador e descrição.
 - Atualização de Anéis: Permite atualizar as informações dos anéis existentes.
 - Leitura de Anéis: Exibe a lista de anéis cadastrados com seus detalhes.
 - Deleção de Anéis: Permite excluir anéis do sistema.

# Configuração do Projeto

## Requisitos
 - Antes de iniciar, certifique-se de ter o Node.js e o MongoDB instalados em sua máquina.

## Instalação
 - Instale as dependências do backend:
 - cd backend
 - npm install

## Instale as dependências do frontend:
 - cd ../frontend
 - npm install

## Execução
 - Inicie o servidor backend:
 - cd backend
 - npm start

## Inicie o frontend
 - cd ../frontend
 - npm run dev

## Certifique-se de acessa a aplicação no navegador em http://localhost:5173/. Para evitar erros na configuração do CORS