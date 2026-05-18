import express from "express";
import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProductById,
} from "../controllers/productController.js";
import authenticate from "../middleware/authMiddleware.js";

const productRouter = express.Router();

//Get all products
productRouter.get("/", getProducts);

//Get products by id
productRouter.get("/:id", getProductById);

//Update products by id
productRouter.put("/:id", updateProductById);

//delete products by id
productRouter.delete("/:id", deleteProductById);

//Create product
productRouter.post("/", authenticate, createProduct);

export default productRouter;
