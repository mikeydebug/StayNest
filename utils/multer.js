const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Save files to uploads folder
    },
    filename: function (req, file, cb) {
        // Generate random string + timestamp + original extension
        const randomString = Math.random().toString(36).substring(2, 15);
        const timestamp = Date.now();
        const extension = path.extname(file.originalname);
        cb(null, `${randomString}-${timestamp}${extension}`);
    }
});

// File filter - only accept images
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WEBP images are allowed.'), false);
    }
};

// Create multer upload instance
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;
