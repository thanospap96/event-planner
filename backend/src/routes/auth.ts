import { Router } from "express";
import { registerUser, loginUser } from "../controllers/authController";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;





// import { Router, Request, Response } from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User, {IUser} from "../models/User"
//
// const router = Router();
//
// router.post("/register", async (req: Request , res: Response) => {
//     try {
//         const {username, email, password} = req.body;
//
//         const existingUser =  await User.findOne({ email });
//         if (existingUser) return res.status(400).json({message: "User already exists"})
//
//         const hashedPassword = await bcrypt.hash(password, 10);
//
//         const newUser: IUser = new User({ username, email, password: hashedPassword })
//         await newUser.save();
//
//         res.status(201).json({message: "User successfully created"})
//     } catch (err) {
//         res.status(500).json({message: "Internal server error",error: err});
//     }
// });
//
// router.post("/login", async (req: Request, res: Response) => {
//     try {
//         const {email, password} = req.body;
//
//         const user = await User.findOne({email});
//         if (!user) return res.status(400).json({message: "Invalid email or password"});
//
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({message: "Invalid email or password"});
//
//         const token = jwt.sign({id: user.id}, process.env.JWT_SECRET!, {expiresIn: "10h"});
//         res.status(200).json({
//             message: "Login successful ✅",
//             token,
//             user: {
//                 id: user._id,
//                 username: user.username,
//                 email: user.email
//             }
//
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({message: "Server error",error: err});
//     }
// })