import { Router } from "express";
import {loginUsuario} from "../controllers/loginController"

const router = Router()

router.get("/login", loginUsuario)