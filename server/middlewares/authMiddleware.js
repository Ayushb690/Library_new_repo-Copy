
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddlewares.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js"

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("User is not authenticated.", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
        return next(new ErrorHandler("User not found or session expired.", 404));
    }
    next();
});
export const isAuthorized = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new ErrorHandler(`User with role (${req.user?.role || "Unknown"}) not allowed to access this resource.`, 403));
        }
        next();
    };
};