# FoodStyles NodeJs Backend

This is the Backend App for the FoodSyles Challenge.

[Checkout this video about how it works](https://www.loom.com/share/953f468d416a4fa6956dcdf9c1b338bd)

Built with:

- [NestJs](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [Postgres](https://www.postgresql.org/)
- [Swagger](https://swagger.io/)

## Running the App

```bash
npm install

cp .env.example .env

```

- Start the Postgres Database in [Docker](https://www.docker.com/get-started):

  ```sh
  npm run docker
  ```

  > **Note:** The npm script will complete while Docker sets up the container in the background. Ensure that Docker has finished and your container is running before proceeding.

- Initial setup:

  ```sh
  npm run setup
  ```

- Start dev server:

  ```sh
  npm run start:dev
  ```

Swagger API description at:

```
localhost:3001:/api/v1
```
