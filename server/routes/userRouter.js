import express from "express";
import { getAllUsers, registerNewAdmin } from "../controller/userController.js";
import {
    isAuthenticated,
    isAuthorized,
} from "../middlewares/authMiddleware.js";
import { User } from "../models/userModel.js"

const router = express.Router();

router.get("/has-admin", async (req, res, next) => {
    try {
        const count = await User.countDocuments({ role: "Admin" });
        res.status(200).json({ success: true, hasAdmin: count > 0 });
    } catch (error) {
        next(error);
    }
});

router.get("/all", isAuthenticated, isAuthorized("Admin"), getAllUsers);

// Allow bypass for the very first Admin registration if no admin exists
router.post("/add/new-admin", async (req, res, next) => {
    try {
        const adminCount = await User.countDocuments({ role: "Admin" });
        if (adminCount === 0) {
            return next();
        }
        return isAuthenticated(req, res, (err) => {
            if (err) return next(err);
            return isAuthorized("Admin")(req, res, next);
        });
    } catch (error) {
        next(error);
    }
}, registerNewAdmin);


export default router;