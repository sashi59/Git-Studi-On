import multer from "multer";
import {v4 as uuid} from "uuid"


const storage = multer.diskStorage({
    destination(req, file, cb) {
        console.log("Multer storage destination called"); // Debugging
        cb(null, 'uploads');
    },
    filename(req, file, cb) {
        const id = uuid();
        const extName = file.originalname.split('.').pop();
        const fileName = `${id}.${extName}`;
        console.log("Multer storage filename called", fileName); // Debugging
        cb(null, fileName);
    }
});

export const uploadFiles = multer({ storage }).single("file");