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

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser());

// CORS configuration
const allowedOrigins = [
    Env_Consts.FRONTEND_URL, 
    'http://localhost:5173', 
    'https://vinyl-vault-psi.vercel.app' // Explicitly add your frontend URL
];

app.use(cors({
    origin: (origin, callback) => {
        console.log('Request origin:', origin); // Debug log to check the origin
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow cookies or auth headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Root route
app.get('/', (req, res) => {
    res.status(STATUS_CODES.OK).json("Welcome to the V-Api");
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/album", albumRouter);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server with database connection
const startServer = async () => {
    try {
        await connectToDB(); // Connect to DB first
        console.log('Database connected successfully');
        app.listen(Env_Consts.PORT, () => {
            console.log(`Connected at PORT: ${Env_Consts.PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1); // Exit if DB connection fails
    }
};

startServer();