import express, { Application } from "express";
import dotenv from "dotenv";
// import userRouter from "./routes/userRouter";

import bodyParser from "body-parser";
import apiV1Router from "./routes/apiV1Router";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/v1/", apiV1Router);

app.listen(port, () => {
  console.log(`Server is live at http://localhost:${port}`);
});
