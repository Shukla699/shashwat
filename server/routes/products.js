import express from 'express';
import fs from 'fs/promises';
import path from 'path';

const router = express.Router();
const dbPath = path.join(process.cwd(), 'server/data/db.json');

// Helper function to read database
const readDB = async () => {
  const data = await fs.readFile(dbPath, 'utf8');
  return JSON.parse(data);
};

// Helper function to write database
const writeDB = async (data) => {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
};

// GET all products with pagination support
router.get('/', async (req, res) => {
  try {
    const db = await readDB();
    let products = db.products;

    // Support pagination
    const limit = parseInt(req.query._limit);
    const start = parseInt(req.query._start) || 0;

    if (limit) {
      products = products.slice(start, start + limit);
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET product by ID
router.get('/:id', async (req, res) => {
  try {
    const db = await readDB();
    const product = db.products.find(p => p.id === req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST create new product
router.post('/', async (req, res) => {
  try {
    const db = await readDB();
    const newProduct = req.body;
    
    db.products.push(newProduct);
    await writeDB(db);
    
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// PATCH update product
router.patch('/:id', async (req, res) => {
  try {
    const db = await readDB();
    const productIndex = db.products.findIndex(p => p.id === req.params.id);
    
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    db.products[productIndex] = { ...db.products[productIndex], ...req.body };
    await writeDB(db);
    
    res.json(db.products[productIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE product
router.delete('/:id', async (req, res) => {
  try {
    const db = await readDB();
    const productIndex = db.products.findIndex(p => p.id === req.params.id);
    
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    db.products.splice(productIndex, 1);
    await writeDB(db);
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

export default router;