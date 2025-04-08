import { Router } from "express";
import { albumSchemaZod } from "../schemas/albumValidation";
import validate from "../middleware/validateMiddleware";
import { protect } from "../middleware/authMiddleware";
import { createAlbumHandler,getAlbumsHandler } from "../controllers/albumController";


const albumRouter = Router();

albumRouter.post("/create-album/:accessToken",protect,validate(albumSchemaZod),createAlbumHandler);
//user id
albumRouter.get("/get-albums/:accessToken/:user",protect,getAlbumsHandler);

export default albumRouter;