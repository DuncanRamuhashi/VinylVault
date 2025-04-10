import express from 'express';
import cookieParser from 'cookie-parser';
import { Env_Consts } from './constants/envConsts';
import { STATUS_CODES } from './constants/httpCodes';
import connectToDB from './config/database';
import authRouter from './routes/authRoutes';
import albumRouter from './routes/albumRoutes';
import { errorHandler, notFound } from './middleware/errorHandler';
import cors from 'cors';

const app = express();

// Middleware
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser());

// CORS configuration
const allowedOrigins = [
    Env_Consts.FRONTEND_URL || 'https://vinyl-vault-psi.vercel.app',
    'http://localhost:5173',
    'https://vinyl-vault-psi.vercel.app',
];

app.use(cors({
    origin: (origin, callback) => {
        console.log('Incoming request origin:', origin);
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log('Blocked by CORS:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Routes
app.get('/health', (req, res) => {
    res.status(STATUS_CODES.OK).json({ message: 'Server is healthy', timestamp: new Date() });
});

app.get('/', (req, res) => {
    res.status(STATUS_CODES.OK).json('Welcome to the V-Api');
});

app.use('/api/auth', authRouter);
app.use('/api/album', albumRouter);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server for Vercel
const startServer = async () => {
    try {
        await connectToDB();
        console.log('Database connected successfully');
    } catch (err) {
        console.error('Server startup failed:', err);
        throw err;
    }
};

startServer().catch(err => console.error(err));
export default app; // Export for Vercel