import express from "express";
import cors from "cors";

import productRouter from "./routes/productRoutes.js";
import authRouter from "./routes/authRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import limiter from "./config/rateLimiter.js";

const app = express();

//Middlewares
app.use(limiter);
app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/api/products/", productRouter);
app.use("/api/categories/", categoryRouter);

//Server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on PORT : ${PORT}`);
});
