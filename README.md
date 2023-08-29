# Teste Kanban

Esse projeto consiste em um diretório ("back") contendo as regras
de negócio, criado utilizando express, e um diretório ("front") contendo
a interface gráfica, criado utilizando Angular.

Ambos os projetos utilizam Typescript.

No docker-compose, é criado um container para o back, um para o front, e um para o banco de dados (MySQL).
Esse banco de dados cria automaticamente o banco de dados, através do arquivo create-database.sql.
Optei por não utilizar as migrações do Sequelize por uma questão de tempo, pois nunca configurei isso antes, e me senti
mais confortável lidando diretamente com o SQL.

## Como rodar

O jeito mais simples é utilizando o docker-compose, que já está configurado.

Antes de executar, entretanto, é necessário copiar o arquivo 
.env.example para .env, e modificar as variáveis de acesso para as que você
realmente irá utilizar.

Dentro da pasta back, é necessário fazer o mesmo, copiar o arquivo
.env.example e modificar as variáveis de acesso.

(Isso é um ponto a ser melhorado no projeto, passar as variáveis no back através do docker-compose (ver TODO))

A seguir, basta rodar o comando:

```bash
docker-compose up --build
```

### Acessando a aplicação

A aplicação estará disponível em http://localhost:4200 (ou em outra porta, caso você tenha modificado no arquivo .env)

### TODO:

[] Criar testes, tanto no back quanto no front

[] Melhorar a forma de passar as variáveis de ambiente para o back

[] Melhorar o visual do front-end

[] Criar função para editar card (infelizmente, por motivo de tempo, para não atrasar a entrega, acabei não implementando)
