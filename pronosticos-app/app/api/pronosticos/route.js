import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Pronostico from '../../../models/Pronostico';

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();

        if (!body.partido || !body.pronostico || typeof body.cuota !== 'number' || typeof body.ganancia !== 'number' || body.cuota < 0 || body.ganancia < 0) {
            return NextResponse.json({ success: false, error: 'Invalid or missing fields' }, { status: 400 });
        }

        const pronostico = new Pronostico(body);
        await pronostico.save();
        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error('Error creating pronostico:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        await dbConnect();
        const pronosticos = await Pronostico.find();
        return NextResponse.json(pronosticos, { status: 200 });
    } catch (error) {
        console.error('Error fetching pronosticos:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}