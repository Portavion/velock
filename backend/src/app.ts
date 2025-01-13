import express, { Application } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/users", userRouter);

app.listen(port, () => {
  console.log(`Server is live at http://localhost:${port}`);
});
