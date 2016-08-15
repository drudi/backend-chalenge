# Implementação do Desafio backend Viva Decora


Conforme sugerido no enunciado do desafio, o projeto utilizou:

- Django
- Django REST Framework
- AngularJS para o frontend (TODO)

Utilizou-se o banco de dados MySQL para persistência de dados, e docker/docker-compose para gerenciar e organizar as várias partes da aplicação. Os arquvos estáticos são servidos através do nginx (utilizando a imagem docker oficial através do docker-compose).

# Rodando a aplicação

Antes de iniciar a aplicação, é necessário popular o banco de dados. Além da migration inicial do Django, uma migration adicional popula o banco com alguns objetos iniciais.

```shell
docker-compose run api ./wait-for-it.sh db:3306 -t 120 -- python manage.py migrate
```

Para rodar os testes automatizados e verificar o resultado no terminal, basta executar o seguinte comando:

```shell
docker-compose run api ./wait-for-it.sh db:3306 -t 60 -- ./runtests.sh
```

E finalmente, para rodar toda a aplicação, basta executar:

```shell
docker-compose up
```

O frontend da aplicação pode ser acessado no endereço local (http://127.0.0.1). Já a API fica disponível na porta 8000 (http://127.0.0.1:8000)

Seguem alguns exemplos de utilização da API:

*EXEMPLOS* (TODO)
