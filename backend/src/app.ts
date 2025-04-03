import express from 'express';
import cookieParser from "cookie-parser";
import { Env_Consts } from './constants/envConsts';
import { STATUS_CODES } from './constants/httpCodes';
const app =  express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/',(req,res) =>{
    res.status(STATUS_CODES.OK).json("Welcome to the V-Api");
});

app.listen(Env_Consts.PORT ,async () =>{
    console.log(`connected at PORT : ${Env_Consts.PORT}`);

});