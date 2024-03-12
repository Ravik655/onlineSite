import Express from "express";
import { isAdmin,requireSignIn } from "../middlewear/authmiddlewear.js";
import {
  ProductCategoryContoller,
  ProductCountController,
  ProductFilterController,
  ProductListController,
  SearchProductController,
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  relatedProductController,
  updateProductController,
} from "../controller/createProductController.js";
import formidable from "express-formidable";

const router = Express.Router();

// router
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// get router
router.get("/get-product", getProductController);

// single get route
router.get("/get-product/:slug", getSingleProductController);

// get photo
router.get("/product-photo/:pid", productPhotoController);

// delete product
router.delete("/delete-product/:pid", deleteProductController);

// updating product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//  filter product
router.post("/filter-product", ProductFilterController);

// product count
router.get("/product-count", ProductCountController);

// product  list
router.get("/product-list/:page", ProductListController);

// Search Product
router.get("/search/:keyword", SearchProductController);

// related Product
router.get("/related-product/:pid/:cid", relatedProductController);

// category wise product

router.get("/product-category/:slug", ProductCategoryContoller);

// payments router

// token
router.get("/braintree/token", braintreeTokenController);

// payments
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

export default router;
