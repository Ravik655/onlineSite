import express from "express";
import { isAdmin, requireSignIn } from "../middlewear/authmiddlewear.js";
import {
  categoryController,
  createCategoryController,
  updateCategoryController,
  singleCategoryController,
  deleteCategroyController,
} from "../controller/categoryController.js";

const router = express.Router();
// create
router.post(
  "/create-category",
  requireSignIn,
  // isAdmin,
  createCategoryController
);

// update
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// get all category

router.get("/get-category", categoryController);

// single
router.get("/single-category/:slug", singleCategoryController);

// Delete
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategroyController
);

export default router;
