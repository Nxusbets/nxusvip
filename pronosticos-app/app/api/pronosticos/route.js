import { NextResponse } from 'next/server';
import dbPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req) {
    try {
        const db = await dbPromise();
        const collection = db.collection('pronosticos');

        const body = await req.json();

        if (!body.partido || !body.pronostico || typeof body.cuota !== 'number' || typeof body.ganancia !== 'number' || body.cuota < 0 || body.ganancia < 0) {
            return NextResponse.json({ success: false, error: 'Invalid or missing fields' }, { status: 400 });
        }

        const result = await collection.insertOne(body);
        console.log('Pronostico inserted:', result.insertedId);

        return NextResponse.json({ success: true, insertedId: result.insertedId }, { status: 201 });
    } catch (error) {
        console.error('Error creating pronostico:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const db = await dbPromise();
        const collection = db.collection('pronosticos');

        const pronosticos = await collection.find().toArray();

        return NextResponse.json(pronosticos, { status: 200 });
    } catch (error) {
        console.error('Error fetching pronosticos:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}