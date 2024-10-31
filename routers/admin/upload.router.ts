import { Router } from "express";
import multer from "multer";
const router : Router = Router();

const upload = multer();

import * as uploadCloud from "../../middlewares/admin/uploadCloudinary.middlewares";

import * as controller from "../../controllers/admin/upload.controller";

router.post("/",
    upload.single('file'), 
    uploadCloud.uploadSingle,
    controller.index);


export const uploadRoutes : Router = router