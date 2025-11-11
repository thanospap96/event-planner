import { Router} from "express";
import { authenticate, verifyAdmin} from "../middleware/authMiddleware";
import { getUsers, getUserByUsername, getUserByEmail, deleteUser} from "../controllers/userController";
import { validate} from "../middleware/validate";
import {findUserByEmailQuerySchema, idParamSchema, usernameParamSchema} from "../validation/userSchemas";

const router = Router();

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: List all users (admin only)
 *     tags: [Users]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/UserResponse' }
 *       401: { description: Invalid or missing token }
 *       403: { description: Admin access required }
 */
router.get("/", authenticate, verifyAdmin, getUsers);

/**
 * @openapi
 * /api/users/by-email:
 *   get:
 *     summary: Get user by email
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: Invalid or missing token
 *       404:
 *         description: User not found
 */
router.get("/by-email", authenticate, validate(findUserByEmailQuerySchema), getUserByEmail);

/**
 * @openapi
 * /api/users/{username}:
 *   get:
 *     summary: Get user by username
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found

 *       401:
 *         description: Invalid or missing token
 *       404:
 *         description: User not found
 */
router.get("/:username", authenticate, validate(usernameParamSchema), getUserByUsername);

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user (admin only)
 *     tags: [Users]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: Deleted }
 *       401: { description: Invalid or missing token }
 *       403: { description: Admin access required }
 *       404: { description: User not found }
 */

router.delete("/:id", authenticate, verifyAdmin, validate(idParamSchema), deleteUser);
export default router;
