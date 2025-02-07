# AN E COMMERCE ASSIGNMENT PROJECT

## 1. About this project: 
- This project use Node version ***20.13.1***
- This project contains folders:
    * ***backend:*** This folder is for *Backend Service Development*
- In the root directory:
    * ***.env.example:*** This file is an example of *.env* file. Remember to copy and modify it before running this project.
    * ***docker-compose.yml:*** This file is used for setting up development environment
    * ***.gitignore:*** We all know why we need this file :)

## 2. How to run?
- First of all, we need to run this command line to create ***.env*** file

```
cp .env.example .env
```

- Then, run docker compose file to setup development environment

```
docker compose up -d
```

- In this docker compose, I set up a Postgres and an UI to manage the Postgres called Adminer

- Postgres is running on port 5432, if there is any app running on this port, modify the docker-compose.yml file

- Adminer is running on port 8080, if there is any app running on this port, modify the docker-compose.yml file. Login with the information in ***.env*** file

- Finally, run project by running this command line. Backend will run on port 3000 or you can modify it in ***.env*** file

```
cd backend
npm run start:dev
```

***Note*** You can use Typeorm to generate, create, migrate or revert migration by these line
```
npm run migration:run
npm run migration:generate
npm run migration:create
npm run migration:revert
```

Thank you!!!

*** Ai chạy lỗi hú mình phát nhé, cảm ơn ***