// app/api/pronosticos/[id]/route.js
import { NextResponse } from 'next/server';
import dbPromise from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PUT(req, { params }) {
    try {
        const db = await dbPromise();
        const collection = db.collection('pronosticos');
        const { id } = params;
        const body = await req.json();

        if (!body.partido && !body.pronostico && !body.cuota && !body.ganancia && !body.resultado) {
            return NextResponse.json({ success: false, error: 'No fields to update' }, { status: 400 });
        }

        console.log("updating pronostico with id:", id);
        console.log("body:", body);

        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: body }
        );

        console.log("pronostico updated:", result);

        if (result.modifiedCount === 0) {
            return NextResponse.json({ success: false, error: 'Pronostico not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Error updating pronostico:', error, error.stack);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const db = await dbPromise();
        const collection = db.collection('pronosticos');
        const { id } = params;

        console.log("deleting pronostico with id:", id);

        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        console.log("pronostico deleted:", result);

        if (result.deletedCount === 0) {
            return NextResponse.json({ success: false, error: 'Pronostico not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Error deleting pronostico:', error, error.stack);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}