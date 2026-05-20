import { prisma } from "../config/prisma.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    if (categories.length === 0) {
      return res.status(200).json({
        statusCode: 200,
        status: "success",
        message: "no categories to show",
        data: [],
      });
    }
    return res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "all categories data",
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      status: "failure",
      message: "internal server error",
      data: [],
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const category = req.body;
    if (!category.categoryName) {
      return res.status(400).json({
        statusCode: 400,
        status: "failure",
        message: "Please enter a category name",
        data: [],
      });
    }

    const createdCategory = await prisma.category.create({ data: req.body });
    return res.status(201).json({
      statusCode: 201,
      status: "success",
      message: "Category created successfully",
      data: [createdCategory],
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      status: "failure",
      message: "internal server error",
      data: [],
    });
  }
};
