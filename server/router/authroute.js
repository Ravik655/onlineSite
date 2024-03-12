import Express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  orderStatusController,
  getOrderController,
  getAllOrderController,
  // approveOrderController,
  // rejectOrderController,
} from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middlewear/authmiddlewear.js";

// router object
const router = Express.Router();

// routing
// register||method post

router.post("/register", registerController);

// login ||post
router.post("/login", loginController);

// forgot password  ||method post

router.post("/forgot-password", forgotPasswordController);

// test route
router.get("/test", requireSignIn, isAdmin, testController);

//user Auth route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
// Admin Auth route
router.get("/Admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// update user profile
router.put("/profile", requireSignIn, updateProfileController);

// order
router.get("/Order", requireSignIn, getOrderController);

// All order
router.get("/all-Order", requireSignIn, isAdmin, getAllOrderController);

// order status update
router.put(
  "/status-update/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
