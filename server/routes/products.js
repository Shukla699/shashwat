import express from 'express';
import fs from 'fs/promises';
import path from 'path';

const router = express.Router();
const dbPath = path.join(process.cwd(), '..', 'data', 'db.json');

// Helper function to read database
const readDB = async () => {
    try {
        const data = await fs.readFile(dbPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('❌ Error reading database:', error);
        return { users: [], products: [], carts: [] };
    }
};

// Helper function to write database
const writeDB = async (data) => {
    try {
        await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
        console.log('✅ Database updated successfully');
    } catch (error) {
        console.error('❌ Error writing database:', error);
        throw error;
    }
};

// GET all products with pagination support
router.get('/', async (req, res) => {
    try {
        console.log('🛍️ GET /products - Query params:', req.query);
        const db = await readDB();
        let products = db.products || [];

        // Support pagination
        const limit = parseInt(req.query._limit);
        const start = parseInt(req.query._start) || 0;

        console.log(`📄 Pagination - limit: ${limit}, start: ${start}, total products: ${products.length}`);

        if (limit && !isNaN(limit)) {
            products = products.slice(start, start + limit);
        }

        console.log(`✅ Returning ${products.length} products`);
        res.json(products);
    } catch (error) {
        console.error('❌ Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// GET product by ID
router.get('/:id', async (req, res) => {
    try {
        const db = await readDB();
        const product = (db.products || []).find(p => p.id === req.params.id);
        
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        res.json(product);
    } catch (error) {
        console.error('❌ Error fetching product:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

// POST create new product
router.post('/', async (req, res) => {
    try {
        const db = await readDB();
        if (!db.products) db.products = [];
        
        const newProduct = req.body;
        
        db.products.push(newProduct);
        await writeDB(db);
        
        console.log('✅ Product created successfully:', newProduct.title);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('❌ Error creating product:', error);
        res.status(500).json({ error: 'Failed to create product' });
    }
});

// PATCH update product
router.patch('/:id', async (req, res) => {
    try {
        const db = await readDB();
        if (!db.products) db.products = [];
        
        const productIndex = db.products.findIndex(p => p.id === req.params.id);
        
        if (productIndex === -1) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        db.products[productIndex] = { ...db.products[productIndex], ...req.body };
        await writeDB(db);
        
        console.log('✅ Product updated successfully:', db.products[productIndex].title);
        res.json(db.products[productIndex]);
    } catch (error) {
        console.error('❌ Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// DELETE product
router.delete('/:id', async (req, res) => {
    try {
        const db = await readDB();
        if (!db.products) db.products = [];
        
        const productIndex = db.products.findIndex(p => p.id === req.params.id);
        
        if (productIndex === -1) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        const deletedProduct = db.products[productIndex];
        db.products.splice(productIndex, 1);
        await writeDB(db);
        
        console.log('✅ Product deleted successfully:', deletedProduct.title);
        res.status(204).send();
    } catch (error) {
        console.error('❌ Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

export default router;