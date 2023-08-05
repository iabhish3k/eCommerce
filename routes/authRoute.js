import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersControllers,
  getAllOrdersControllers,
  orderStatusController,
} from "../controllers/authController.js";
import { isAdmin, requireSighIn } from "../middlewears/authMiddlewear.js";

// *router object
const router = express.Router();

// TODO: Route 1: Register a user using:POST
router.post("/register", registerController);

//TODO: Route2 : Login User Using:POST
router.post("/login", loginController);

//TODO: Route4 : Forgot Password:POST
router.post("/forgot-password", forgotPasswordController);

//TODO: Route3 : test Using:POST
router.get("/test", requireSighIn, isAdmin, testController);

//TODO: Route4 : Proceted Router for USER:GET
router.get("/user-auth", requireSighIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//TODO: Route5 : Proceted Router for ADMIN:GET
router.get("/admin-auth", requireSighIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// TODO: Route6 : Update Profile
router.put("/profile", requireSighIn, updateProfileController);

// todo: Route7 : Orders
router.get("/orders", requireSighIn, getOrdersControllers);

// todo: Route8 : All Orders
router.get("/all-orders", requireSighIn, isAdmin, getAllOrdersControllers);

// todo: Route9 : All Orders Status Update
router.put(
  "/order-status/:orderId",
  requireSighIn,
  isAdmin,
  orderStatusController
);
export default router;
