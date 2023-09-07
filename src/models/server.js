const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const userRoutes = require("../routes/user.routes");
const authRoutes = require("../routes/auth.routes");
const { dbConnection } = require("../database/config");
const insertIntoRole = require("../database/init/role.init");



class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.usersPath = "/api/users";
    this.authPath = "/api/auth";

    //dbConnection
    this.databaseConnection();
    //middlewares
    this.middlewares();
    //routes
    this.routes();
    //inits
    this.init();
  }

  async databaseConnection(){
  await dbConnection();
  }

  middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, "../public")));
  }

  init(){
  insertIntoRole()
  }

  routes() {
    this.app.use(this.usersPath, userRoutes);
    this.app.use(this.authPath,authRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`-> Server listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
