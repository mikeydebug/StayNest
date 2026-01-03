# 🏡 StayNest - Premium Home Rental Platform

<div align="center">

![StayNest Logo](https://img.shields.io/badge/StayNest-Premium%20Rentals-purple?style=for-the-badge&logo=home)

**Your Perfect Home Away From Home**

[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.2.1-lightgrey?style=flat-square&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.18-blue?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-ISC-blue?style=flat-square)](LICENSE)

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [API Documentation](#-api-endpoints) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Database Models](#-database-models)
- [API Endpoints](#-api-endpoints)
- [User Roles](#-user-roles)
- [Security Features](#-security-features)
- [Image Upload System](#-image-upload-system)
- [Session Management](#-session-management)
- [Contributing](#-contributing)
- [Future Enhancements](#-future-enhancements)
- [License](#-license)
- [Author](#-author)

---

## 🌟 Overview

**StayNest** is a full-stack web application built with Node.js, Express.js, and MongoDB that enables users to discover, book, and manage vacation rental properties. The platform offers a seamless experience for both property hosts and guests, featuring advanced booking systems, user authentication, favorites management, and file upload capabilities.

### 🎯 Project Goals

- Create an intuitive, user-friendly interface for property rentals
- Implement secure authentication and authorization
- Enable real-time booking management with automatic price calculations
- Provide hosts with comprehensive property management tools
- Ensure responsive design across all devices
- Maintain clean, scalable, and maintainable codebase

---

## ✨ Features

### 🔐 Authentication & Authorization

- **User Registration & Login**
  - Secure password hashing using bcryptjs
  - Email validation with express-validator
  - Role-based access control (Guest/Host)
  - Session-based authentication with MongoDB session store
  - Persistent login sessions
  - Automatic session cleanup

### 🏠 Property Management (Host Features)

- **Add New Properties**
  - Upload property images with Multer
  - Automatic image processing and storage
  - Unique property ID generation
  - Custom ratings and pricing
  - Detailed descriptions and locations
  
- **Edit Existing Properties**
  - Update all property details
  - Replace property images
  - Maintain existing images if not updated
  - Real-time preview of changes

- **Delete Properties**
  - Safe deletion with confirmation
  - Automatic cleanup of associated data
  - Remove from favorites and bookings

- **View Property Listings**
  - Dedicated host dashboard
  - Grid/list view of all properties
  - Quick edit and delete actions

### 🎫 Booking System

- **Create Bookings**
  - Interactive date selection with validation
  - Guest count specification
  - Automatic price calculation (nights × price)
  - Minimum date validation (no past dates)
  - Instant booking confirmation

- **View Bookings**
  - Comprehensive booking history
  - Status tracking (Upcoming/Completed/Cancelled)
  - Detailed booking information display
  - Filtered views by status

- **Cancel Bookings**
  - Cancel upcoming reservations
  - Automatic status update
  - Preservation of booking history

### ❤️ Favorites System

- **Add to Favorites**
  - One-click favorite marking
  - Visual feedback with heart icons
  - Persistent across sessions
  - User-specific favorites list

- **Remove from Favorites**
  - Easy unfavorite option
  - Instant UI update
  - Bulk favorite management

- **Favorites List**
  - Dedicated favorites page
  - Quick access to saved properties
  - Direct booking from favorites

### 🖼️ Image Upload & Management

- **Multer Integration**
  - File type validation (JPEG, PNG, GIF, WEBP)
  - Automatic file naming with timestamps and random strings
  - Organized storage in uploads directory
  - Static file serving
  - No size limitations (configurable)

### 🎨 User Interface

- **Modern Design**
  - Dark theme with purple/pink gradient accents
  - Responsive layout (mobile, tablet, desktop)
  - Smooth animations and transitions
  - Hover effects and interactive elements
  - Tailwind CSS utility-first styling

- **Navigation**
  - Sticky header with logo and branding
  - Role-based menu items
  - Active page indicators
  - Mobile-friendly hamburger menu

- **Property Cards**
  - High-quality image display
  - Rating badges
  - Price per night display
  - Quick action buttons
  - Hover animations

### 🔍 Search & Discovery

- **Home Page**
  - Featured properties display
  - Popular destinations showcase
  - Hero section with search bar
  - Feature highlights section
  - Call-to-action sections

- **Property Details**
  - Full property information
  - Image gallery
  - Amenities list
  - Location details
  - Booking form integration
  - Add/Remove favorites toggle

---

## 🛠️ Tech Stack

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | Runtime environment |
| **Express.js** | 5.2.1 | Web application framework |
| **MongoDB** | Latest | NoSQL database |
| **Mongoose** | 9.1.0 | MongoDB ODM |
| **bcryptjs** | 3.0.3 | Password hashing |
| **express-session** | 1.18.2 | Session management |
| **connect-mongodb-session** | 5.0.0 | MongoDB session store |
| **express-validator** | 7.3.1 | Input validation |
| **multer** | 2.0.2 | File upload handling |
| **body-parser** | 2.2.1 | Request parsing |
| **cookie-parser** | 1.4.7 | Cookie parsing |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **EJS** | 3.1.10 | Template engine |
| **Tailwind CSS** | 4.1.18 | Utility-first CSS framework |
| **@tailwindcss/cli** | 4.1.18 | Tailwind CLI tools |

### Development Tools

| Tool | Version | Purpose |
|------|---------|---------|
| **nodemon** | 3.1.11 | Auto-restart on changes |
| **npm** | Latest | Package management |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Browser                        │
│                    (HTML, CSS, JavaScript)                   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP Requests
                         │
┌────────────────────────▼────────────────────────────────────┐
│                     Express.js Server                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Middleware Stack                        │   │
│  │  • Session Management                                │   │
│  │  • Body Parser                                       │   │
│  │  • Cookie Parser                                     │   │
│  │  • Static File Serving                               │   │
│  │  • Multer (File Upload)                             │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Routes Layer                            │   │
│  │  • Auth Routes                                       │   │
│  │  • Host Routes (with auth middleware)               │   │
│  │  • Store Routes                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │            Controllers Layer                         │   │
│  │  • Auth Controller                                   │   │
│  │  • Host Controller                                   │   │
│  │  • Store Controller                                  │   │
│  │  • Error Controller                                  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Models Layer                            │   │
│  │  • User Model                                        │   │
│  │  • Home Model                                        │   │
│  │  • Booking Model                                     │   │
│  │  • Favorite Model                                    │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ Mongoose ODM
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    MongoDB Atlas                             │
│  • Users Collection                                          │
│  • Homes Collection                                          │
│  • Bookings Collection                                       │
│  • Sessions Collection                                       │
└──────────────────────────────────────────────────────────────┘
```

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- **MongoDB Atlas Account** (or local MongoDB installation)
- **Git** (for cloning the repository)

### Step-by-Step Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/mikeydebug/staynest.git
cd staynest
```

#### 2. Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`:

```json
{
  "dependencies": {
    "@tailwindcss/cli": "^4.1.18",
    "bcryptjs": "^3.0.3",
    "body-parser": "^2.2.1",
    "connect-mongodb-session": "^5.0.0",
    "cookie-parser": "^1.4.7",
    "ejs": "^3.1.10",
    "express": "^5.2.1",
    "express-session": "^1.18.2",
    "express-validator": "^7.3.1",
    "mongodb": "^7.0.0",
    "mongoose": "^9.1.0",
    "multer": "^2.0.2",
    "nodemon": "^3.1.11",
    "tailwindcss": "^4.1.18"
  }
}
```

#### 3. Create Uploads Directory

```bash
mkdir uploads
```

#### 4. Setup MongoDB

**Option A: MongoDB Atlas (Recommended)**

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Whitelist your IP address
4. Create a database user
5. Get your connection string

**Option B: Local MongoDB**

1. Install MongoDB locally
2. Start MongoDB service
3. Use local connection string: `mongodb://localhost:27017/staynest`

#### 5. Configure Environment

Update the database URL in `app.js`:

```javascript
const dbUrl = 'mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/StayNest?appName=StayNest';
```

Replace:
- `USERNAME` with your MongoDB username
- `PASSWORD` with your MongoDB password
- `cluster` with your cluster name

---

## ⚙️ Configuration

### Environment Variables (Optional)

For production, create a `.env` file:

```env
# Server Configuration
PORT=3000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/StayNest

# Session
SESSION_SECRET=your-super-secret-key-here

# File Upload
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880
```

### Session Configuration

Located in `app.js`:

```javascript
app.use(session({
    secret: 'mysec',           // Change in production
    resave: false,
    saveUninitialized: true,
    store: store,              // MongoDB session store
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
    }
}));
```

### Multer Configuration

Located in `utils/multer.js`:

```javascript
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const randomString = Math.random().toString(36).substring(2, 15);
        const timestamp = Date.now();
        const extension = path.extname(file.originalname);
        cb(null, `${randomString}-${timestamp}${extension}`);
    }
});
```

---

## 🎮 Usage

### Start Development Server

```bash
npm start
```

This command runs both nodemon (for server) and Tailwind CSS watch mode:

```json
"scripts": {
  "start": "nodemon app.js & npm run tailwind",
  "tailwind": "tailwindcss -i ./public/home.css -o ./public/output.css --watch"
}
```

### Access the Application

Open your browser and navigate to:

```
http://localhost:3000
```

### User Workflows

#### 🔐 For New Users (Registration)

1. Navigate to `/signup`
2. Choose account type (Guest/Host)
3. Enter email and password
4. Click "Create Account"
5. Automatically logged in and redirected

#### 🏠 For Hosts

1. **Login** → `/login`
2. **View Dashboard** → Navigate to "My Listings"
3. **Add Property**:
   - Click "List Home" button
   - Fill in property details
   - Upload property image
   - Set price and rating
   - Submit form
4. **Edit Property**:
   - Go to "My Listings"
   - Click "Edit" on property card
   - Update details
   - Upload new image (optional)
   - Save changes
5. **Delete Property**:
   - Go to "My Listings"
   - Click "Delete" button
   - Confirm deletion

#### 🎫 For Guests

1. **Browse Homes** → Navigate to "Home" or "/"
2. **View Details** → Click on any property
3. **Book Property**:
   - Select check-in date
   - Select check-out date
   - Choose number of guests
   - Click "Reserve Now"
   - View confirmation in bookings
4. **Manage Favorites**:
   - Click heart icon on property
   - View all favorites in "Favorites" page
   - Remove from favorites anytime
5. **View Bookings**:
   - Navigate to "Bookings"
   - See all past and upcoming bookings
   - Cancel upcoming bookings if needed

---

## 📁 Project Structure

```
staynest/
│
├── app.js                          # Main application entry point
├── package.json                    # Project dependencies and scripts
├── nodemon.json                    # Nodemon configuration
├── README.md                       # Project documentation
│
├── controller/                     # Business logic controllers
│   ├── authController.js          # Authentication logic
│   ├── hostController.js          # Host operations (CRUD)
│   ├── StoreController.js         # Store/Guest operations
│   └── errors.js                  # Error handling
│
├── models/                         # Mongoose data models
│   ├── user_auth.js               # User schema
│   ├── home_model.js              # Home/Property schema
│   ├── booking_model.js           # Booking schema
│   └── favorite_model.js          # Favorites schema
│
├── routes/                         # Express route definitions
│   ├── authrouter.js              # Authentication routes
│   ├── hostrouter.js              # Host routes (protected)
│   └── StoreRouter.js             # Public store routes
│
├── views/                          # EJS templates
│   ├── partials/                  # Reusable components
│   │   ├── head.ejs               # HTML head section
│   │   ├── nav.ejs                # Navigation bar
│   │   ├── host-nav.ejs           # Host navigation
│   │   └── footer.ejs             # Footer section
│   │
│   ├── auth/                      # Authentication views
│   │   ├── login.ejs              # Login page
│   │   └── signup.ejs             # Registration page
│   │
│   ├── host/                      # Host views
│   │   ├── add-home.ejs           # Add property form
│   │   ├── edit-home.ejs          # Edit property form
│   │   ├── host-home-list.ejs     # Host properties list
│   │   └── homeadded.ejs          # Success confirmation
│   │
│   ├── store/                     # Guest/Store views
│   │   ├── index.ejs              # Homepage
│   │   ├── home-list.ejs          # All properties list
│   │   ├── home-detail.ejs        # Property details
│   │   ├── favorite-list.ejs      # Favorites page
│   │   ├── booking-list.ejs       # Bookings page
│   │   └── reserve.ejs            # Booking confirmation
│   │
│   └── 404.ejs                    # Error page
│
├── utils/                          # Utility modules
│   ├── multer.js                  # File upload configuration
│   ├── pathutil.js                # Path utilities
│   └── database.js                # Database utilities
│
├── public/                         # Static files
│   ├── home.css                   # Input CSS
│   └── output.css                 # Compiled Tailwind CSS
│
├── uploads/                        # Uploaded images
│   └── [random-timestamp].jpg     # Property images
│
└── data/                          # Legacy JSON data (optional)
    ├── homes_data.json
    └── favorites_data.json
```

---

## 💾 Database Models

### User Model (`user_auth.js`)

```javascript
{
  email: String (required, unique),
  password: String (required, hashed),
  accountType: String (enum: ['guest', 'host']),
  favourites: [ObjectId] (ref: 'Home'),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `email` (unique)

### Home Model (`home_model.js`)

```javascript
{
  id: String (custom identifier),
  title: String (required),
  description: String (required),
  price: Number (required),
  location: String (required),
  image: String (required, file path),
  rating: Number (required, 1-5),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `id` (for fast lookup)

### Booking Model (`booking_model.js`)

```javascript
{
  homeId: ObjectId (ref: 'Home', required),
  userId: ObjectId (ref: 'User', required),
  checkIn: Date (required),
  checkOut: Date (required),
  guests: Number (required, default: 1),
  totalPrice: Number (required),
  status: String (enum: ['upcoming', 'completed', 'cancelled']),
  bookingDate: Date (default: now),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `userId` (for user queries)
- `homeId` (for property queries)
- `status` (for filtering)

---

## 🌐 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/signup` | Show registration form | No |
| POST | `/signup` | Register new user | No |
| GET | `/login` | Show login form | No |
| POST | `/login` | Authenticate user | No |
| POST | `/logout` | End user session | Yes |

### Store/Guest Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Homepage | No |
| GET | `/homes` | List all properties | No |
| GET | `/homes/:id` | Property details | No |
| GET | `/favorites` | User favorites list | Yes (Guest) |
| POST | `/favorites` | Add to favorites | Yes (Guest) |
| POST | `/favorites/delete/:homeId` | Remove favorite | Yes (Guest) |
| GET | `/bookings` | User bookings list | Yes (Guest) |
| POST | `/bookings/create` | Create booking | Yes (Guest) |
| POST | `/bookings/cancel/:bookingId` | Cancel booking | Yes (Guest) |

### Host Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/host/add-home` | Add property form | Yes (Host) |
| POST | `/host/add-home` | Create property | Yes (Host) |
| GET | `/host/host-home-list` | Host properties | Yes (Host) |
| GET | `/host/edit-home/:id` | Edit property form | Yes (Host) |
| POST | `/host/edit-home/:id` | Update property | Yes (Host) |
| POST | `/host/delete-home/:id` | Delete property | Yes (Host) |

### Request/Response Examples

#### POST `/signup` - Register User

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "accountType": "guest"
}
```

**Response:**
- Success: Redirect to `/`
- Error: Render signup with error messages

#### POST `/bookings/create` - Create Booking

**Request Body:**
```json
{
  "homeId": "PROP001",
  "checkIn": "2026-06-01",
  "checkOut": "2026-06-05",
  "guests": "2"
}
```

**Response:**
- Success: Redirect to `/bookings`
- Error: Redirect to `/homes`

---

## 👥 User Roles

### Guest Role

**Permissions:**
- Browse all properties
- View property details
- Add/remove favorites
- Create bookings
- View booking history
- Cancel own bookings
- Update profile

**Restrictions:**
- Cannot add properties
- Cannot edit properties
- Cannot delete properties
- Cannot access host dashboard

### Host Role

**Permissions:**
- All guest permissions
- Add new properties
- Edit own properties
- Delete own properties
- View property analytics
- Manage property listings
- Upload property images

**Restrictions:**
- Can only edit/delete own properties
- Cannot modify other hosts' properties

---

## 🔒 Security Features

### Authentication Security

1. **Password Hashing**
   - bcryptjs with salt rounds
   - Passwords never stored in plain text
   - Automatic hashing on registration

2. **Session Management**
   - Secure session cookies
   - MongoDB session store for persistence
   - Automatic session expiration
   - CSRF protection ready

3. **Input Validation**
   - express-validator for all inputs
   - XSS prevention
   - SQL injection prevention (NoSQL)
   - Email format validation

### Authorization

1. **Route Protection**
   ```javascript
   app.use('/host', (req, res, next) => {
       if (!req.session.isLoggedIn) {
           return res.redirect('/login');
       }
       next();
   });
   ```

2. **Role-Based Access**
   - Host routes protected
   - Guest-specific features guarded
   - User verification on data operations

### File Upload Security

1. **File Type Validation**
   ```javascript
   const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
   ```

2. **Random File Naming**
   - Prevents file overwrites
   - Unique identifiers
   - Timestamp inclusion

---

## 📸 Image Upload System

### Multer Configuration

**Storage Engine:**
```javascript
diskStorage({
    destination: 'uploads/',
    filename: randomString-timestamp.ext
})
```

**File Filter:**
- Accepts: JPEG, JPG, PNG, GIF, WEBP
- Rejects: All other formats

**Features:**
- ✅ Automatic directory creation
- ✅ Random filename generation
- ✅ Type validation
- ✅ No size limit (configurable)
- ✅ Error handling

### Image Serving

Static file serving configured:
```javascript
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
```

**Access Pattern:**
```
http://localhost:3000/uploads/abc123-1234567890.jpg
```

---

## 🍪 Session Management

### Configuration

```javascript
const store = new mongodbSession({
    uri: dbUrl,
    collection: 'sessions'
});

app.use(session({
    secret: 'mysec',
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
    }
}));
```

### Session Data Structure

```javascript
{
  isLoggedIn: boolean,
  user: {
    _id: ObjectId,
    email: String,
    accountType: String
  },
  cookie: {
    expires: Date,
    maxAge: Number
  }
}
```

### Session Middleware

```javascript
app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn || false;
    res.locals.user = req.session.user || null;
    next();
});
```

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### How to Contribute

1. **Fork the Repository**
   ```bash
   git clone https://github.com/yourusername/staynest.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Write clean, documented code
   - Follow existing code style
   - Add comments where necessary

4. **Test Your Changes**
   - Test all affected features
   - Ensure no breaking changes
   - Verify responsive design

5. **Commit Your Changes**
   ```bash
   git commit -m "Add: Amazing new feature"
   ```

6. **Push to Branch**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   - Describe your changes
   - Reference any related issues
   - Request review

### Code Style Guidelines

- Use meaningful variable names
- Comment complex logic
- Follow Express.js best practices
- Maintain consistent indentation
- Use async/await over callbacks

### Commit Message Format

```
Type: Brief description

Detailed explanation of changes
```

**Types:**
- `Add:` New feature
- `Fix:` Bug fix
- `Update:` Modify existing feature
- `Remove:` Delete code/feature
- `Refactor:` Code restructure
- `Docs:` Documentation changes

---

## 🚀 Future Enhancements

### Planned Features

#### Phase 1: Enhanced Functionality
- [ ] Advanced search with filters (price, location, rating)
- [ ] Map integration for property locations
- [ ] Property reviews and ratings system
- [ ] Real-time availability calendar
- [ ] Email notifications for bookings
- [ ] Payment integration (Stripe/PayPal)

#### Phase 2: User Experience
- [ ] Wishlist sharing functionality
- [ ] Property comparison tool
- [ ] Chat system between hosts and guests
- [ ] Push notifications
- [ ] Multi-language support
- [ ] Dark/Light theme toggle

#### Phase 3: Analytics & Admin
- [ ] Host analytics dashboard
- [ ] Booking analytics and reports
- [ ] Revenue tracking
- [ ] Admin panel for platform management
- [ ] User verification system
- [ ] Property verification process

#### Phase 4: Mobile & Advanced
- [ ] Mobile app (React Native)
- [ ] Progressive Web App (PWA)
- [ ] AI-powered recommendations
- [ ] Virtual property tours
- [ ] Social media integration
- [ ] Referral program

### Technical Improvements

- [ ] Implement Redis for caching
- [ ] Add comprehensive unit tests
- [ ] Setup CI/CD pipeline
- [ ] Docker containerization
- [ ] API rate limiting
- [ ] GraphQL API option
- [ ] Microservices architecture
- [ ] Load balancing setup

---

## 🐛 Known Issues

1. **Image Upload**
   - Large files may take time to upload
   - No progress indicator currently

2. **Session Management**
   - Sessions cleared on server restart (development)
   - Need to implement session persistence

3. **Responsive Design**
   - Some elements may need adjustment on very small screens
   - Mobile menu needs enhancement

---

## 📝 License

This project is licensed under the **ISC License**.

```
ISC License

Copyright (c) 2026 Mayank Soni

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

---

## 👨‍💻 Author

**Mayank Soni**

- GitHub: [@mayanksoni](https://github.com/mayanksoni)
- Email: mayank@example.com
- LinkedIn: [Mayank Soni](https://linkedin.com/in/mayanksoni)

---

## 🙏 Acknowledgments

- **Node.js Community** for excellent documentation
- **Express.js Team** for the robust framework
- **MongoDB** for the powerful database solution
- **Tailwind CSS** for the amazing utility-first CSS framework
- **Unsplash** for placeholder images
- **Stack Overflow** community for problem-solving help

---

## 📞 Support

If you encounter any issues or have questions:

1. **Check Documentation** - Review this README thoroughly
2. **Search Issues** - Look for similar problems in GitHub issues
3. **Create Issue** - Open a new issue with detailed information
4. **Contact Author** - Reach out via email for urgent matters

### Reporting Bugs

When reporting bugs, please include:

- Node.js version
- npm version
- Operating system
- Error message/stack trace
- Steps to reproduce
- Expected vs actual behavior

---

## 📊 Project Statistics

- **Lines of Code:** ~5000+
- **Files:** 50+
- **Dependencies:** 14
- **Routes:** 20+
- **Models:** 4
- **Views:** 15+

---

## 🌟 Star History

If you find this project useful, please consider giving it a ⭐!

---

<div align="center">

### Made with ❤️ by Mayank Soni

**StayNest** - *Your Perfect Home Away From Home*

[⬆ Back to Top](#-staynest---premium-home-rental-platform)

</div>
