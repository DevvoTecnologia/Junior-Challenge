import "dotenv/config";

import express from "express";
import authRoutes from "./routes/auth.routes";
import portadorRoutes from "./routes/user.routes";
import ringRoutes from "./routes/ring.routes";
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);


// Rotas
app.use(authRoutes);
app.use(portadorRoutes);
app.use(ringRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
