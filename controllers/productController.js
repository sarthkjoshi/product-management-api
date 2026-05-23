import { prisma } from "../config/prisma.js";
import redis from "../config/redis.js";
//Get all produts
export const getProducts = async (req, res) => {
  try {
    // 1. Check cache
    const cachedProducts = await redis.get("products");

    if (cachedProducts) {
      console.log("Serving from Redis cache");

      return res.status(200).json({
        source: "cache",
        data: JSON.parse(cachedProducts),
      });
    }

    // 2. Fetch from database
    console.log("Fetching from database");

    const products = await prisma.product.findMany();

    // 3. Store in Redis
    await redis.set("products", JSON.stringify(products), "EX", 3600);

    if (products.length === 0) {
      return res.status(200).json({
        statusCode: 200,
        status: "success",
        message: "no products to show",
        data: [],
      });
    }
    return res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "all product data",
      data: products,
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

//Get  produt by id
export const getProductById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    //Check if entered id is valid or not
    if (isNaN(id)) {
      return res.status(400).json({
        statusCode: 400,
        status: "failure",
        message: "invalid product id",
        data: [],
      });
    }
    const singleProduct = await prisma.product.findUnique({
      where: { productId: id },
    });

    // Check if id is valid but product is found with that particular product id
    if (!singleProduct) {
      return res.status(404).json({
        statusCode: 404,
        status: "failure",
        message: `product with id: ${id} not found`,
        data: [],
      });
    }
    return res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "product data found",
      data: [singleProduct],
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

//Delete a product by id
export const deleteProductById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    //Check if entered id is valid or not
    if (isNaN(id)) {
      return res.status(400).json({
        statusCode: 400,
        status: "failure",
        message: "invalid product id",
        data: [],
      });
    }
    const deletedProduct = await prisma.product.delete({
      where: { productId: id },
    });
    // clear old cache
    await redis.del("products");
    return res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "product data removed successfully",
      data: [deletedProduct],
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

//Update a product by id
export const updateProductById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    //Check if entered id is valid or not
    if (isNaN(id)) {
      return res.status(400).json({
        statusCode: 400,
        status: "failure",
        message: "invalid product id",
        data: [],
      });
    }

    const updatedProduct = await prisma.product.update({
      where: { productId: id },
      data: { ...req.body },
    });
    // clear old cache
    await redis.del("products");
    return res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "product data updated successfully",
      data: [updatedProduct],
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

//Create a product
export const createProduct = async (req, res) => {
  try {
    const product = req.body;

    if (
      !product.productName ||
      !product.description ||
      product.price === undefined ||
      product.categoryId === undefined
    ) {
      return res.status(400).json({
        statusCode: 400,
        status: "failure",
        message: "Missing or invalid product data",
        data: [],
      });
    }
    console.log(req.user.userId);
    const newProduct = await prisma.product.create({
      data: {
        productName: product.productName,
        description: product.description,
        price: product.price,
        userId: req.user.userId,
        categoryId: product.categoryId,
      },
    });
    // clear old cache
    await redis.del("products");
    return res.status(201).json({
      statusCode: 201,
      message: "product data added successfully",
      status: "success",
      data: [newProduct],
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      status: "failure",
      message: "internal server error",
      error: error.message,
      data: [],
    });
  }
};
