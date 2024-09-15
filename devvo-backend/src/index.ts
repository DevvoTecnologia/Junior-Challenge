import dotenv from "dotenv";

import app from "./server";

dotenv.config();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}, http://localhost:${port}`);
});
