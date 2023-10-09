import express from "express";
import "express-async-errors";
import cors from "cors";
import { userRoutes } from "./core/shared/routes/user-routes";
import { error } from "./core/shared/errors/error";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// registrando as rotas do sistema
app.use(userRoutes);

// middleware para lidar com erros
app.use(error);

app.listen(3333, () => {
  console.log("Server is running on port 3333");
});
