import multer from "multer";
import path from "path";

const uploadDir = path.resolve("upload");

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export default upload;
