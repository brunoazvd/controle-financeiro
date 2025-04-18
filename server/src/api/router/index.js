import { Router } from 'express';

import UserController from '../controllers/UserController.js';
import CategoryController from '../controllers/CategoryController.js';

import authMiddleware from '../middleware/auth.js';

const router = Router();


// USER ROUTES
// Auth Routes
router.post("/auth/register", UserController.createUser);
router.post("/auth/login", UserController.login);
router.get("/auth/verify", authMiddleware, UserController.verifyToken);
// Other User Routes
router.get("/api/users/:id", UserController.getUserById);
router.put("/api/users/:id", UserController.updateUser);
router.delete("/api/users/:id", UserController.deleteUser);

// CATEGORY ROUTES
router.get("/api/categories", authMiddleware, CategoryController.getAll);
router.post("/api/categories", authMiddleware, CategoryController.createCategory);
router.delete("/api/categories/:id", authMiddleware, CategoryController.deleteCategory);
router.put("/api/categories/:id", authMiddleware, CategoryController.updateCategory);

export default router;