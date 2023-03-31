import multer from "multer";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const storageProductImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../Images"));
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const imagename = `${Math.floor(Math.random() * 100000000000000)}.${ext}`;
    cb(null, file.fieldname + "-" + imagename);
  },
});
const maxSize = 5 * 1024 * 1024;

const FilteringUploads = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  }
};

export const uploadImage = multer({
  storage: storageProductImage,
  limits: { fileSize: maxSize },
  fileFilter: FilteringUploads,
});
