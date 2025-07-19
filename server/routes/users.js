import express from 'express';
import fs from 'fs/promises';
import path from 'path';

const router = express.Router();
const dbPath = path.join(process.cwd(), 'data/db.json');

// Helper function to read database
const readDB = async () => {
    try {
        const data = await fs.readFile(dbPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading database:', error);
        // Return default structure if file doesn't exist
        return { users: [], products: [], carts: [] };
    }
};

// Helper function to write database
const writeDB = async (data) => {
    try {
        await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
        console.log('Database updated successfully');
    } catch (error) {
        console.error('Error writing database:', error);
        throw error;
    }
};

// GET all users (with query support for login)
router.get('/', async (req, res) => {
    try {
        console.log('GET /users - Query params:', req.query);
        const db = await readDB();
        let users = db.users || [];

        // Support query parameters for login
        if (req.query.email && req.query.password) {
            console.log(`Login attempt for email: ${req.query.email}`);
            users = users.filter(user => 
                user.email === req.query.email && user.password === req.query.password
            );
            console.log(`Found ${users.length} matching users`);
        }

        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// GET user by ID
router.get('/:id', async (req, res) => {
    try {
        const db = await readDB();
        const user = (db.users || []).find(u => u.id === req.params.id);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// POST create new user
router.post('/', async (req, res) => {
    try {
        const db = await readDB();
        if (!db.users) db.users = [];
        
        const newUser = {
            ...req.body,
            cart: req.body.cart || []
        };
        
        // Check if user already exists
        const existingUser = db.users.find(u => u.email === newUser.email);
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }
        
        db.users.push(newUser);
        await writeDB(db);
        
        console.log('User created successfully:', newUser.email);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// PATCH update user
router.patch('/:id', async (req, res) => {
    try {
        const db = await readDB();
        if (!db.users) db.users = [];
        
        const userIndex = db.users.findIndex(u => u.id === req.params.id);
        
        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        db.users[userIndex] = { ...db.users[userIndex], ...req.body };
        await writeDB(db);
        
        console.log('User updated successfully:', db.users[userIndex].email);
        res.json(db.users[userIndex]);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
});

// DELETE user
router.delete('/:id', async (req, res) => {
    try {
        const db = await readDB();
        if (!db.users) db.users = [];
        
        const userIndex = db.users.findIndex(u => u.id === req.params.id);
        
        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        const deletedUser = db.users[userIndex];
        db.users.splice(userIndex, 1);
        await writeDB(db);
        
        console.log('User deleted successfully:', deletedUser.email);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

export default router;