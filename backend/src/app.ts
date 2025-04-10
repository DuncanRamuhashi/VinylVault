import express, { Express, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import { Env_Consts } from './constants/envConsts';
import { STATUS_CODES } from './constants/httpCodes';
import connectToDB from './config/database';
import authRouter from './routes/authRoutes';
import albumRouter from './routes/albumRoutes';
import { errorHandler, notFound } from './middleware/errorHandler';
import cors from 'cors';

const app: Express = express();

// Middleware
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser());

// CORS configuration
const allowedOrigins: string[] = [
    Env_Consts.FRONTEND_URL || 'https://vinyl-vault-psi.vercel.app',
    'http://localhost:3000',
];

app.use(cors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
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
app.get('/health', (req: Request, res: Response) => {
    console.log('Health endpoint hit');
    res.status(STATUS_CODES.OK).json({ 
        message: 'Server is healthy', 
        timestamp: new Date() 
    });
});

app.get('/', (req: Request, res: Response) => {
    console.log('Root endpoint hit');
    res.status(STATUS_CODES.OK).json('Welcome to the V-Api');
});

app.use('/api/auth', authRouter);
app.use('/api/album', albumRouter);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Log all registered routes for debugging
const printRoutes = (app: Express): void => {
    console.log('Registered routes:');
    // Check if router exists and has stack
    if (!app._router || !app._router.stack) {
        console.log('No routes registered yet');
        return;
    }

    app._router.stack.forEach((middleware: any) => {
        if (middleware.route) {
            // Direct routes
            console.log(`${middleware.route.path} (${Object.keys(middleware.route.methods)})`);
        } else if (middleware.name === 'router' && middleware.handle && middleware.handle.stack) {
            // Router middleware
            middleware.handle.stack.forEach((handler: any) => {
                if (handler.route) {
                    console.log(`${handler.route.path} (${Object.keys(handler.route.methods)})`);
                }
            });
        }
    });
};

// Start server
const startServer = async (): Promise<void> => {
    try {
        await connectToDB();
        console.log('Database connected successfully');
        
        if (process.env.NODE_ENV !== 'production') {
            // Call printRoutes after all routes are registered
            printRoutes(app);
        }

        if (!process.env.VERCEL) {
            const port = process.env.PORT || 3000;
            app.listen(port, () => {
                console.log(`Server running on port ${port}`);
            });
        }
    } catch (err) {
        console.error('Server startup failed:', err);
        throw err;
    }
};

startServer().catch((err: Error) => console.error(err));

export default app;