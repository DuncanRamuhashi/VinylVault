import express from 'express';
import cookieParser from "cookie-parser";
import { Env_Consts } from './constants/envConsts';
import { STATUS_CODES } from './constants/httpCodes';
import connectToDB from './config/database';
import authRouter from './routes/authRoutes';
import albumRouter from './routes/albumRoutes';
import { errorHandler, notFound } from './middleware/errorHandler';
import cors from 'cors';

const app = express();

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' })); 
app.use(cookieParser());
app.use(cors({
    origin: '*',
    credentials: true
}));

app.get('/', (req, res) => {
    res.status(STATUS_CODES.OK).json("Welcome to the V-Api");
});

app.use("/api/auth", authRouter);
app.use("/api/album", albumRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(Env_Consts.PORT, async () => {
    console.log(`connected at PORT : ${Env_Consts.PORT}`);
    await connectToDB();
});