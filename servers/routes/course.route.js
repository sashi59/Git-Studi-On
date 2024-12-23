import express from 'express';
import { checkout, fetchCourseLecture, fetchSingleLecture, getAllCourse, getMyCourses, getSingleCourse, paymentVerification } from '../controllers/course.controller.js';
import { ProtectedRoute } from '../middlewares/isAuth.js';



const router = express.Router();

router.get("/mycourse", ProtectedRoute, getMyCourses)
router.get("/all", getAllCourse);
router.get("/:id",  getSingleCourse);
router.get("/lectures/:id", ProtectedRoute, fetchCourseLecture);
router.get("/lecture/:id", ProtectedRoute, fetchSingleLecture);
router.post("/checkout/:id", ProtectedRoute, checkout);
router.post("/verification/:id", ProtectedRoute, paymentVerification);


export default router;