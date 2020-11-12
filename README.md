# Typescript Backend Auth Boilerplate

## Project's Structure

```md
├──src
| ├── config
| | ├── DB.ts
| | └── ...
| ├── controllers
| | ├── UserController.ts
| | └── ...
| ├── interfaces
| | ├── UserInterface.ts
| | └── ...
| ├── middlewares
| | ├── AuthMiddleware.ts
| | └── ...
| ├── models
| | ├── UserModel.ts
| | └── ...
| ├── routes
| | ├── UserRoutes.ts
| | └── ...
| ├── utils
| | ├── GenerateToken.ts
| | └── ...
| └── Server.ts
├ .env
├ .gitignore
├ app.ts
├ package.json
├ README.md
└ tsconfig.json
```

## Installation & Activation

In order to install and activate the boilerplate, follow the instructions below please:

1. download/clone this repository
2. create `.env` in the root directory.
3. `.env` should contain the following environment variables:

   `NODE_ENV=development`

   `PORT=<any_available_port>`

   `MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/proshop?retryWrites=true&w=majority`

   `JWT_SECRET=<any_JWT_SECRET>`

4. run `npm install` to install all dependencies
5. run `npm run dev` to watch the server

## Available Scripts

```md
   "scripts": {
   "start": "node dist/app.js", //start app.js (after build)
   "dev": "nodemon ./app.ts", //watch server (developer mode)
   "build": "tsc && cp --copy-contents .env dist/.env" //build project to get 'dist/' directory
   },
```
