import { Router } from "express";
import { UserController } from "../Controllers/userController";
import { UserService } from "../service/userService";
import { UserRepository } from "../Repository/userRepository";
import UserModel from "../Modals/userModal";
import { verifyToken } from "../Config/jwtConfig";

const userRepository = new UserRepository(UserModel)
const userService = new UserService(userRepository)
const userController = new UserController(userService);
const router = Router()

router.post("/signup", userController.registration)
router.post("/otp-verification", userController.otpVerification)
router.post("/login", userController.login)
router.get("/get-urls", verifyToken, userController.getUrls);
router.post("/add-url", verifyToken, userController.addUrl)
router.get("/redirectUrl", verifyToken, userController.redirectUrl)

export default router;