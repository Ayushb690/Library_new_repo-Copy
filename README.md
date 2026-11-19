<<<<<<< Updated upstream

=======
# E-Library Management System

A full-stack MERN application for managing library books, user borrowing records, fines, overdue notifications, and administrative workflows.

## Project Structure

```
├── client/                 # React frontend (Vite, TailwindCSS, Redux Toolkit)
│   ├── src/
│   │   ├── assets/         # UI images and icons
│   │   ├── components/     # Dashboard and management views (Admin, User, Books, Catalog, etc.)
│   │   ├── layout/         # Header and Sidebar navigation
│   │   ├── pages/          # Login, Register, OTP, Forgot/Reset Password, Home
│   │   ├── popups/         # Modal dialogs (Add Book, Record Borrow, Return, View Details)
│   │   ├── store/          # Redux Toolkit store and slices
│   │   └── utils/          # API base URL configuration
│   └── package.json
│
├── server/                 # Express backend (renamed from backend)
│   ├── config/             # Environment configuration (config.env, config.env.example)
│   ├── controller/         # Auth, Book, Borrow, and User business logic
│   ├── database/           # MongoDB connection setup
│   ├── middlewares/        # Authentication, Authorization, Error Handling
│   ├── models/             # Mongoose schemas (User, Book, Borrow)
│   ├── routes/             # Express API route declarations
│   ├── services/           # Automated cron jobs (notifications, unverified accounts)
│   ├── utils/              # Email templates, JWT token handling, fine calculator
│   └── server.js           # Server entry point
│
└── package.json            # Root scripts for running client & server
```

## Getting Started

### 1. Environment Configuration

Copy `server/config/config.env.example` to `server/config/config.env`:

```env
PORT=4000
FRONTEND_URL=http://localhost:5173
MONGO_URI=mongodb://127.0.0.1:27017/LibraryDB
SMTP_HOST=smtp.gmail.com
SMTP_SERVICE=gmail
SMTP_PORT=465
SMTP_MAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password
JWT_SECRET_KEY=your_jwt_secret_key
JWT_EXPIRE=3d
COOKIE_EXPIRE=3
CLOUDINARY_CLIENT_NAME=your_cloudinary_name
CLOUDINARY_CLIENT_API=your_cloudinary_api
CLOUDINARY_CLIENT_SECRET=your_cloudinary_secret
```

### 2. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Run Development Servers

From the root directory:
```bash
# Start backend server (port 4000)
npm run server:dev

# Start frontend client (port 5173)
npm run client
```

### 4. Build for Production

```bash
# Build the client
npm run client:build
```

---

## Key Fixes & Improvements

1. **Folder Renamed**: Renamed `backend/` to `server/` and updated all internal imports and configuration paths.
2. **Merge Conflict Resolved**: Removed git merge conflict markers (`<<<<<<< HEAD`) from `server/config/config.env`.
3. **Initial Admin Setup**:
   - Resolved the chicken-and-egg admin registration deadlock: the first admin can register without requiring a pre-existing authenticated admin session.
   - Added an "Admin Setup" modal trigger accessible directly from the Login page.
   - Added Cloudinary optional fallback so admin registration succeeds gracefully even if Cloudinary credentials are not configured.
4. **Backend Bugfixes**:
   - Fixed `server/routes/borrowRouter.js` where `/my-borrowed-books` incorrectly called `getBorrowedBooksForAdmin` instead of `borrowedBooks`.
   - Fixed listening port fallback in `server.js` (`app.listen(PORT, ...)`).
   - Fixed dotenv loading with directory-agnostic path resolution (`path.join(__dirname, ...)`).
   - Added `await` to `sendVerificationCode` and `sendEmail` calls to properly catch mail service errors.
   - Added safe fallback for cookie expiration days in `sendToken.js`.
   - Robust cross-origin configuration with normalized URL matching.
5. **UI & Frontend Bugfixes**:
   - Fixed broken CSS typos across modals (`Dbg-black`, `rounded-1g`, `text-x1`, `Oborder-black`, `sm:text-lg:text-xl`).
   - Removed universal `* { overflow-x: hidden; }` which broke horizontal scrolling of data tables.
   - Fixed Login, Register, and OTP split-screen responsiveness (`md:w-1/2` grid layout).
   - Repositioned the "Back" buttons in `OTP.jsx` and `ResetPassword.jsx` from offscreen (`-left-24`) to within the viewport.
   - Fixed button labels ("VERIFY" on login changed to "SIGN IN", with active loading states).
   - Fixed "My Borrowed Books" in `SideBar.jsx` which was hidden on desktop (`md:hidden`) and incorrectly opened credentials settings.
   - Fixed "Update Credentials" button missing click handler.
   - Fixed missing ISBN field in `AddBookPopup.jsx`, and fixed the quantity input which previously overwrote the book title.
   - Fixed `BookManagement.jsx` table rendering `{book.quantity}` inside the action buttons cell.
   - Fixed `MyBorrowedBooks.jsx` crashing due to `useBorrowedBooks` vs `userBorrowedBooks` typo and `data.getFullyear()` ReferenceError.
   - Centralized API endpoint routing through `VITE_API_URL` environment variable.
>>>>>>> Stashed changes
