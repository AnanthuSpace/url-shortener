import { Router } from "express";
import { UserController } from "../Controllers/userController";
import { UserService } from "../service/userService";
import { UserRepository } from "../Repository/userRepository";
import UserModel from "../Modals/userModal";

const userRepository = new UserRepository(UserModel)
const userService = new UserService(userRepository)
const userController = new UserController(userService);
const router = Router()

router.post("/signup", userController.registration)

export default router;