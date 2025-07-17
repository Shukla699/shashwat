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

// GET all users (with query support for login)
router.get('/', async (req, res) => {
  try {
    const db = await readDB();
    let users = db.users;

    // Support query parameters for login
    if (req.query.email && req.query.password) {
      users = users.filter(user => 
        user.email === req.query.email && user.password === req.query.password
      );
    }

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// GET user by ID
router.get('/:id', async (req, res) => {
  try {
    const db = await readDB();
    const user = db.users.find(u => u.id === req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// POST create new user
router.post('/', async (req, res) => {
  try {
    const db = await readDB();
    const newUser = {
      ...req.body,
      cart: req.body.cart || []
    };
    
    db.users.push(newUser);
    await writeDB(db);
    
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// PATCH update user
router.patch('/:id', async (req, res) => {
  try {
    const db = await readDB();
    const userIndex = db.users.findIndex(u => u.id === req.params.id);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    db.users[userIndex] = { ...db.users[userIndex], ...req.body };
    await writeDB(db);
    
    res.json(db.users[userIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// DELETE user
router.delete('/:id', async (req, res) => {
  try {
    const db = await readDB();
    const userIndex = db.users.findIndex(u => u.id === req.params.id);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    db.users.splice(userIndex, 1);
    await writeDB(db);
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;