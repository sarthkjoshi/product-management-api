import express from "express";
import {
  createCategory,
  getCategories,
} from "../controllers/categoryController.js";

import authenticate from "../middleware/authMiddleware.js";

const categoryRouter = express.Router();

//Get all categories
categoryRouter.get("/", getCategories);

//Create new category
categoryRouter.post("/", authenticate, createCategory);

export default categoryRouter;
