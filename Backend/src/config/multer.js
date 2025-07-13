import multer from "multer";
import path from "path";
import fs from "fs";

export const getMulterUploader = (folder) => {
  // Try both capitalized and lowercase paths to handle case sensitivity
  const uploadPathLower = path.join("src", "upload", folder.toLowerCase());
  const uploadPathUpper = path.join("src", "Upload", folder);
  
  // Use the Upload directory if it exists, otherwise use upload
  let uploadPath = fs.existsSync(path.dirname(uploadPathUpper)) ? uploadPathUpper : uploadPathLower;
  
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadPath),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = Date.now() + ext;
      cb(null, filename);
    },
  });

  return multer({ storage });
};
