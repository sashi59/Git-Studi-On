import express from 'express';
import { addLecturesToCourse, createNewCourse, deleteCourse, deleteLecture, getAllStats, getAllUsers, updateRole } from '../controllers/admin.controller.js';
import { ProtectedRoute } from '../middlewares/isAuth.js';
import { isAdmin } from '../middlewares/isAdmin.js';

import {uploadFiles} from "../middlewares/multer.js"


const router = express.Router();

router.post("/create", ProtectedRoute, isAdmin, uploadFiles, createNewCourse);
router.post("/:id", ProtectedRoute, isAdmin, uploadFiles, addLecturesToCourse);

router.delete("/lecture/:id", ProtectedRoute, isAdmin, deleteLecture)
router.delete("/course/:id", ProtectedRoute, isAdmin, deleteCourse)

router.get("/stats", ProtectedRoute, isAdmin, getAllStats)
router.get("/all-users", ProtectedRoute, isAdmin, getAllUsers);

router.post("/user/:id", ProtectedRoute, isAdmin, updateRole)





export default router;