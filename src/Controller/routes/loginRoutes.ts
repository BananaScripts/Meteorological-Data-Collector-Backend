import { Router } from "express";
import {loginUsuario} from "../controllers/loginController"

const router = Router()

router.post("/login", loginUsuario)

export default router