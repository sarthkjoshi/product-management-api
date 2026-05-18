import express from "express";
import cors from "cors";

import productRouter from "./routes/productRoutes.js";
import authRouter from "./routes/authRoutes.js";

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/products/", productRouter);
app.use("/auth", authRouter);

//Server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on PORT : ${PORT}`);
});
