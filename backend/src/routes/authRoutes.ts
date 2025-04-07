import { Router } from "express";
import { registerHandler,loginHandler,logoutHandler } from "../controllers/authController";
import { registerUserSchemaZod,loginUserSchemaZod } from "../schemas/userValidation";
import { protect} from "../middleware/authMiddleware";
import validate from "../middleware/validateMiddleware";

const authRouter = Router();

authRouter.post("/register",validate(registerUserSchemaZod),registerHandler);
authRouter.post("/login",validate(loginUserSchemaZod),loginHandler);
authRouter.get("logout",protect,logoutHandler);

export default authRouter;