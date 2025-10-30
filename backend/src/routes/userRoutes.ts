import { Router} from "express";
import { authenticate, verifyAdmin} from "../middleware/authMiddleware";
import { getUsers, getUserByUsername} from "../controllers/userController";

const router = Router();

router.get("/", authenticate, verifyAdmin, getUsers);
router.get("/:username", getUserByUsername);

export default router;
