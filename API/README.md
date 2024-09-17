
### Documentaçãp:

- **Tecnologias Utilizadas**: Typescript, React, vite, MongoDB, Mongoose, Express, axios, cors, ts-node, eslint, dotenv, nodemon.
- **Instalação**: Para o backend, acesse: CD API // CD src // npm install. Para o frontend, acesse CD frontend // cd src // npm install.
- **Configuração do `.env`**: = `MONGODB_URI=mongodb://localhost:27017/nome-do-banco
PORT=3000
`
- **Rotas da API**: 1. Criar um Anel.

         POST /rings

         Cria um novo anel com base nos parâmetros fornecidos e gera uma imagem aleatória.

         no body vemos algo assim:
         {
         "ringName": "Nome do Anel",
         "powerName": "Poder",
         "ownerName": "Amanda",
         "builtBy": "Elfos"
         }


- **Estrutura de Diretórios**: O projeto segue uma arquitetura organizada, inspirada pelos princípios SOLID, visando facilitar a escalabilidade e manutenção. Abaixo está uma explicação dos principais diretórios e sua função no sistema.

1. /controllers
Este diretório contém os controladores, responsáveis por gerenciar a lógica das requisições e interações com o usuário. Cada controlador executa as operações principais, como criação, leitura, atualização e exclusão de anéis, e faz a ponte entre as camadas de serviço e a interface HTTP.

2. /repositories
Os repositórios são responsáveis pela comunicação direta com o banco de dados. Cada repositório implementa as operações de persistência e busca de dados do MongoDB, encapsulando essa lógica para que outras partes da aplicação não precisem lidar diretamente com o banco de dados.

3. /models
Este diretório contém as definições dos modelos de dados usando Mongoose. Os modelos representam as entidades do sistema (neste caso, os anéis), mapeando como essas entidades são armazenadas e manipuladas no MongoDB.

4. /services
Os serviços implementam a lógica de negócios, isolando as regras que definem como a aplicação deve funcionar. Os controladores chamam os serviços para realizar operações mais complexas que envolvem múltiplos repositórios ou validações.

5. /protocols
Este diretório contém interfaces que ajudam a definir contratos entre diferentes camadas, garantindo que a aplicação siga os princípios de Dependency Inversion e Interface Segregation do SOLID. As interfaces garantem que a implementação de repositórios, serviços, e controladores possam ser facilmente alteradas sem impactar outras partes do sistema.
