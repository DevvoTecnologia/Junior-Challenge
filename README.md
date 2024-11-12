Rings of Power
Este projeto é dividido em servidor e cliente, e permite gerenciar os anéis de poder, forjadores, portadores e outros dados relacionados.

Requisitos
Docker (para uso do Docker Compose) ou MySQL instalado localmente, conforme configuração.
Node.js e npm
Instalação

1. Configuração do Banco de Dados
   Opção 1: Usando Docker Compose
   Certifique-se de ter o Docker instalado e, na raiz do projeto, execute:

bash
Copiar código
docker compose up
Opção 2: MySQL Local
Execute um servidor MySQL local e configure as variáveis de ambiente no arquivo .env com as credenciais do banco de dados:

plaintext
Copiar código
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=nome_do_banco 2. Instalação e Execução do Servidor
Entre no diretório do servidor:

bash
Copiar código
cd rings-of-power/server
Instale as dependências:

bash
Copiar código
npm install
Execute as migrações do banco de dados:

bash
Copiar código
npm run migration:run
Inicie o servidor (modo de produção) ou em desenvolvimento:

bash
Copiar código
npm start # Produção
npm run dev # Desenvolvimento 3. Instalação e Execução do Cliente
Em um novo terminal, vá para o diretório do cliente:

bash
Copiar código
cd rings-of-power/client
Instale as dependências:

bash
Copiar código
npm install
Inicie o cliente:

bash
Copiar código
npm start
Acesso ao Projeto
Após a instalação e execução, o projeto estará disponível localmente em:

Cliente: http://localhost:3000
