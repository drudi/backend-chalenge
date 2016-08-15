# Implementação do Desafio backend Viva Decora


Conforme sugerido no enunciado do desafio, o projeto utilizou:

- Django
- Django REST Framework
- AngularJS para o frontend

Utilizou-se o banco de dados MySQL para persistência de dados, e docker/docker-compose para gerenciar e organizar as várias partes da aplicação. A aplicação possui 3 containers docker:

- db: Para um banco de dados MySQL
- api: para o projeto Django
- frontend: Uma imagem Nginx para servir os arquivos estáticos

O docker-compose é utilizado para gerenciar esses 3 containers.

Para configurar os cabeçalhos CORS, utilizou-se a app django-cors-headers. Porém a aplicação oficial não funciona com a versão 1.10 do Django (a versão que estou usando). Por isso, criei um fork do projeto e implementei um "quick-fix" [1]. A alteração se encontra em: https://github.com/drudi/django-cors-headers. 

# Rodando a aplicação

Antes de iniciar a aplicação, é necessário popular o banco de dados. Além da migration inicial do Django, uma migration adicional popula o banco com alguns objetos iniciais.

```shell
docker-compose run api ./wait-for-it.sh db:3306 -t 120 -- python manage.py migrate
```

Para rodar os testes automatizados e verificar o resultado no terminal, basta executar o seguinte comando:

```shell
docker-compose run api ./wait-for-it.sh db:3306 -t 60 -- ./runtests.sh
```

Para construir o container:
```shell
docker-compose build
```

E finalmente, para rodar toda a aplicação, basta executar:

```shell
docker-compose up
```

O frontend da aplicação pode ser acessado no endereço local (http://127.0.0.1). Já a API fica disponível na porta 8000 (http://127.0.0.1:8000)


# Exemplos de utilização da API

Seguem alguns exemplos de utilização da API:

Listar / obter todos os veículos:
```shell

# Listar
curl -XGET -H "Content-type: application/json"  http://localhost:8000/vehicles

# Obter
curl -XGET -H "Content-type: application/json"  http://localhost:8000/vehicles/1

```

Criar um veículo
```shell
curl -XPOST -H "Content-type: application/json" -d '{"manufacturer": "BMW", "model": "G650GS", "color": "branco", "kms": 31000, "engine": "0.650", "vehicle_type": "moto"}' http://localhost:8000/vehicles
```

Criar/listar/obter um Fabricante/Montadora
```shell
# listar
curl -XGET -H "Content-type: application/json" http://localhost:8000/manufacturers

# criar
curl -XPOST -H "Content-type: application/json" -d '{"manufacturer_name": "fabricante_exemplo"}' http://localhost:8000/manufacturers

# obter
curl -XGET -H "Content-type: application/json" http://localhost:8000/manufacturers/1
```

Buscar um veículo
```shell
curl -XGET -H "Content-type: application/json" http://localhost:8000/vehicles/search?enginegte=0.50&enginelte=0.999
```



[1] https://github.com/ottoyiu/django-cors-headers/issues/102
