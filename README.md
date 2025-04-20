# AN E COMMERCE ASSIGNMENT PROJECT
 
## 1. About this project:

- This project use Node version **_20.13.1_**
- This project contains folders:
  - **_backend:_** This folder is for _Backend Service Development_
- In the root directory:
  - **_.env.example:_** This file is an example of _.env_ file. Remember to copy and modify it before running this project.
  - **_docker-compose.yml:_** This file is used for setting up development environment
  - **_.gitignore:_** We all know why we need this file :)

## 2. How to run?

- First of all, we need to run this command line to create **_.env_** file

```
cp .env.example .env
```

- Then, run docker compose file to setup development environment

```
docker compose up -d
```

- In this docker compose, I set up a Postgres and an UI to manage the Postgres called Adminer

- Postgres is running on port 5433, if there is any app running on this port, modify the docker-compose.yml file

- Adminer is running on port 8080, if there is any app running on this port, modify the docker-compose.yml file. Login with the information in **_.env_** file

- Finally, run project by running this command line. Backend will run on port 3000 or you can modify it in **_.env_** file

```
cd backend
npm run start:dev
```

**_Note_** You can use Typeorm to generate, create, migrate or revert migration by these line

```
npm run migration:run
npm run migration:generate
npm run migration:create
npm run migration:revert
```

## 3. About Pagination
- Some APIs should be paginated to limit payload return. With those APIs, you not only can paginate but also sort and filter. Below is how to call those APIs.

- **Type: Query Params**
  - ***page:*** Page number you want to get (from 0)
  - ***size:*** Size of each page you want to get
  - ***sort:*** You can sort by a field (asc or desc) (empty if you dont want to sort)
  - ***filter:*** You can filter by a field (with operator and value) or many fields (empty if you dont want to filter)

- ***Syntax:***
```
  {endpoint}?page={page index}&size={page size}&sort={field name to sort}:(asc|desc)&filter={field name to filter}:{operator}:{value}
```
  - You can add more filter by adding more &filter to query param list
- ***Operation Support:***
  - 
```
  EQUALS = 'eq',
  NOT_EQUALS = 'neq',
  GREATER_THAN = 'gt',
  GREATER_THAN_OR_EQUALS = 'gte',
  LESS_THAN = 'lt',
  LESS_THAN_OR_EQUALS = 'lte',
  LIKE = 'like',
  NOT_LIKE = 'nlike',
  IN = 'in',
  NOT_IN = 'nin',
  IS_NULL = 'isnull',
  IS_NOT_NULL = 'isnotnull'
```
