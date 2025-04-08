import dotenv from 'dotenv';

dotenv.config();

interface EnvConsts {
    PORT: string | number;
    CONNECTION_STRING: string | undefined;
    NODE_ENV: string | undefined;
    JWT_SECRET: string | undefined;
    FRONTEND_URL: string | undefined;
}

export const Env_Consts: EnvConsts = {
    PORT: process.env.PORT || 5001,
    CONNECTION_STRING: process.env.CONNECTION_STRING,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    FRONTEND_URL: process.env.FRONTEND_URL
};
