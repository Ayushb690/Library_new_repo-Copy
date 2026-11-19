export const sendToken = (user, statusCode, message, res) => {
    const token = user.generateToken();
    const cookieExpireDays = Number(process.env.COOKIE_EXPIRE) || 3;
    const cookieOptions = {
        expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
    };

    res.status(statusCode).cookie("token", token, cookieOptions).json({
        success: true,
        user,
        message,
        token,
    });
};