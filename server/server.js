import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure data directory and db.json exist
const dataDir = path.join(process.cwd(), '..', 'data');
const dbPath = path.join(dataDir, 'db.json');

console.log('📁 Data directory:', dataDir);
console.log('📄 Database path:', dbPath);

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
    console.log('✅ Created data directory');
}

if (!fs.existsSync(dbPath)) {
    const initialData = {
        users: [
            {
                "id": "admin-user-123",
                "username": "admin",
                "email": "admin@store.com",
                "password": "admin123",
                "isAdmin": true,
                "cart": []
            }
        ],
        products: [
            {
                "id": "1",
                "title": "Sample Product",
                "price": 29.99,
                "description": "This is a sample product to get you started",
                "category": "electronics",
                "image": "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg"
            }
        ],
        carts: []
    };
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
    console.log('✅ Created initial db.json file with sample data');
}

// Middleware
app.use(helmet({
    crossOriginEmbedderPolicy: false,
}));

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
    credentials: false,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(compression());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Add request logging
app.use((req, res, next) => {
    console.log(`📝 ${new Date().toISOString()} - ${req.method} ${req.path}`);
    if (req.body && Object.keys(req.body).length > 0) {
        console.log('📦 Request body:', JSON.stringify(req.body, null, 2));
    }
    next();
});

// Import routes
import usersRouter from './routes/users.js';
import productsRouter from './routes/products.js';

// Routes
app.use('/users', usersRouter);
app.use('/products', productsRouter);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        port: PORT,
        database: fs.existsSync(dbPath) ? 'Connected' : 'Not Found'
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({ 
        message: '🛍️ E-commerce API Server',
        version: '1.0.0',
        endpoints: {
            users: '/users',
            products: '/products',
            health: '/health'
        },
        status: 'Running'
    });
});

// 404 handler
app.use('*', (req, res) => {
    console.log(`❌ 404 - Route not found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('💥 Server error:', err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`📁 Database file: ${dbPath}`);
    console.log(`✅ Server is ready to accept connections`);
});

export default app;