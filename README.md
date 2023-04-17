# FoodStyles NodeJs Backend

This is the Backend App for the FoodSyles Challenge.

Built with:

- [NestJs](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [Postgres](https://www.postgresql.org/)

## Running the App

```bash
npm install

cp .env.example .env

npx prisma generate

npm run start:dev
```

## Docker File

Get started by running

```bash
docker build -t nest-api .

docker run -p 3001:3001 --env-file .env -d nest-api
```

## Docker Compose

```bash
docker-compose up
# or detached
docker-compose up -d
```
