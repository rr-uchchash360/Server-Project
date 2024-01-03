const multer = require('multer');

// Multer configuration for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images'); // Destination folder for image uploads
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname); // Rename image files
  },
});

const fileFilter = (req, file, cb) => {
  // Validate file type (image)
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images are allowed.'), false);
  }
};

const uploadImage = multer({ storage, fileFilter }).single('image'); // Adjust field name as needed

module.exports = { uploadImage };
