import express from "express";
import {
  createCategory,
  getCategories,
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

//Get all categories
categoryRouter.get("/", getCategories);

//Create new category
categoryRouter.post("/", createCategory);

export default categoryRouter;
