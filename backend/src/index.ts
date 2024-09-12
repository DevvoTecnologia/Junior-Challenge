import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import { associations } from "./db/models/associations";
import { resolve } from "path";
import errorHandler from "./middlewares/errorHandler";

dotenv.config();

const app = express();

routes(app);
app.use(errorHandler);

associations();

app.use("/ring-file", express.static(resolve(__dirname, "..", "uploads")));

app.listen(process.env.PORT || 3100, () => {
	console.log(`${process.env.APP_NAME} running on port ${process.env.PORT}`);
});

app.get("/", () => {
	console.log("to no ar");
});

export default app;
