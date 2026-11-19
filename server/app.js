import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./database/db.js";
import { errorMiddleware } from "./middlewares/errorMiddlewares.js";
import authRoutes from "./routes/authRouter.js";
import bookRoutes from "./routes/bookRouter.js";
import borrowRoutes from "./routes/borrowRouter.js";
import userRoutes from "./routes/userRouter.js";
import expressFileupload from "express-fileupload";
import { notifyUsers } from "./services/notifyUsers.js";
import { removeUnverifiedAccounts } from "./services/removeUnverifiedAccounts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();
config({ path: path.join(__dirname, "config", "config.env") });

const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
].filter(Boolean).map(url => url.replace(/\/$/, ""));

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        const normalized = origin.replace(/\/$/, "");
        if (allowedOrigins.includes(normalized) || process.env.NODE_ENV !== "production") {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(expressFileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/book", bookRoutes);
app.use("/api/v1/borrow", borrowRoutes);
app.use("/api/v1/user", userRoutes);

// Static assets for production
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

notifyUsers();
connectDB();
removeUnverifiedAccounts();
app.use(errorMiddleware);