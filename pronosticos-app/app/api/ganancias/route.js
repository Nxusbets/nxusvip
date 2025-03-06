// app/api/ganancias/route.js
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Pronostico from '../../../models/Pronostico';

export async function GET() {
  try {
    await dbConnect();
    const pronosticos = await Pronostico.find({ resultado: { $ne: null } });
    const ganancias = pronosticos.reduce((total, pronostico) => {
      if (pronostico.pronostico === pronostico.resultado) {
        return total + pronostico.ganancia;
      }
      return total;
    }, 0);
    return NextResponse.json({ ganancias }, { status: 200 });
  } catch (error) {
    console.error('Error fetching ganancias:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}