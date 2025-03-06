import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import Pronostico from '../../../../models/Pronostico';

export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const { id } = params;
        const body = await req.json();

        await Pronostico.findByIdAndUpdate(id, body);
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Error updating pronostico:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        await dbConnect();
        const { id } = params;

        await Pronostico.findByIdAndDelete(id);
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Error deleting pronostico:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}