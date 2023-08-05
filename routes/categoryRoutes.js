import express from "express";
import { isAdmin, requireSighIn } from "./../middlewears/authMiddlewear.js";
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryControlle,
} from "../controllers/categoryController.js";

const router = express.Router();

//* routes 1: POST-create category
router.post(
  "/create-category",
  requireSighIn,
  isAdmin,
  createCategoryController
);

// * route 2: PUT- Update category
router.put(
  "/update-category/:id",
  requireSighIn,
  isAdmin,
  updateCategoryControlle
);

// * route 3: GET-get all category
router.get("/get-category", categoryController);

// * route 4: GET-get Single category
router.get("/single-category/:slug", singleCategoryController);

// * route 5: DELETE-delete category
router.delete(
  "/delete-category/:id",
  requireSighIn,
  isAdmin,
  deleteCategoryController
);

export default router;
