import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import apiV1Router from "./routes/apiV1Router";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", apiV1Router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
