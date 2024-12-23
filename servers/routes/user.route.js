import express from 'express';
import { getMe, signinUser, signupUser, verifyOtp } from '../controllers/user.controller.js';
import { ProtectedRoute } from '../middlewares/isAuth.js';
const router = express.Router()

router.post("/signup", signupUser)
router.post("/verify", verifyOtp)
router.post("/signin", signinUser)
router.get("/me", ProtectedRoute, getMe)



export default router