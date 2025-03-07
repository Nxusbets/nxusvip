// rehash-password.js
const bcrypt = require('bcryptjs');
const { MongoClient } = require('mongodb');

async function rehashPassword(email, newPassword) {
    const MONGODB_URI = process.env.MONGODB_URI;
    const MONGODB_DB = process.env.MONGODB_DB;

    if (!MONGODB_URI || !MONGODB_DB) {
        throw new Error('Please define MONGODB_URI and MONGODB_DB in your environment variables.');
    }

    const client = new MongoClient(MONGODB_URI);

    try {
        await client.connect();
        const db = client.db(MONGODB_DB);
        const collection = db.collection('users');

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const result = await collection.updateOne(
            { email: email },
            { $set: { password: hashedPassword } }
        );

        console.log('Password rehashed:', result.modifiedCount);
    } catch (error) {
        console.error('Error rehashing password:', error);
    } finally {
        await client.close();
    }
}

// Ejemplo de uso:
require('dotenv').config({ path: '../.env.local' });

console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('MONGODB_DB:', process.env.MONGODB_DB);
rehashPassword('usuarios@ejemplo.com', '123456'); // Reemplaza con la contraseña correcta