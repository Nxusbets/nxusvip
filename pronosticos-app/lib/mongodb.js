// lib/mongodb.js
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

if (!MONGODB_DB) {
    throw new Error('Please define the MONGODB_DB environment variable inside .env.local');
}

let cached = global.mongo;

if (!cached) {
    cached = global.mongo = { client: null, db: null, promise: null };
}

async function clientPromise() {
    if (cached.client) {
        console.log('Using cached MongoDB client');
        return cached.client;
    }

    if (!cached.promise) {
        console.log('Creating new MongoDB client connection');
        cached.promise = MongoClient.connect(MONGODB_URI)
            .then((client) => {
                console.log('MongoDB client connected successfully');
                return client;
            })
            .catch((error) => {
                console.error('MongoDB client connection error:', error);
                throw error;
            });
    }

    cached.client = await cached.promise;
    console.log('MongoDB client ready');
    return cached.client;
}

async function dbPromise() {
    if (cached.db) {
        console.log('Using cached MongoDB database');
        return cached.db;
    }

    const client = await clientPromise();
    cached.db = client.db(MONGODB_DB);
    console.log('MongoDB database ready');
    return cached.db;
}

export default dbPromise;