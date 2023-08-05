import express from "express";
import { isAdmin, requireSighIn } from "./../middlewears/authMiddlewear.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// route 1  POST: create product
router.post(
  "/create-product",
  requireSighIn,
  isAdmin,
  formidable(),
  createProductController
);

// route 2 GET: get products
router.get("/get-product", getProductController);

// route 3 GET: Single products
router.get("/get-product/:slug", getSingleProductController);

// route 4 GET: get Photo
router.get("/product-photo/:pid", productPhotoController);

// route 5 DELETE: Delete product
router.delete("/delete-product/:pid", deleteProductController);

// route 6  PUT: Update product
router.put(
  "/update-product/:pid",
  requireSighIn,
  isAdmin,
  formidable(),
  updateProductController
);

// route 7 POST:Fillter product
router.post("/product-filters", productFiltersController);

//route 8 GET:product count
router.get("/product-count", productCountController);

//route 9 GET:product per page
router.get("/product-list/:page", productListController);

// route 10 GET:Search Product
router.get("/search/:keyword", searchProductController);

// route 11 GET:Similler Producy
router.get("/related-product/:pid/:cid", relatedProductController);

// route 12 GET:Category wise Products
router.get("/product-category/:slug", productCategoryController);

// * route 13  GET:Payment Getway
// token
router.get("/braintree/token", braintreeTokenController);

// *Payment Getway route 14 POST:payment
router.post("/braintree/payment", requireSighIn, braintreePaymentController);

export default router;
