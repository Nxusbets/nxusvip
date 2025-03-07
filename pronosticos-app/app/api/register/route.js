// app/api/register/route.js
import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        const db = await clientPromise();
        const collection = db.collection("users");

        const existingUser = await collection.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "El usuario ya existe" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const role = email === "jericho888873@gmail.com" ? "admin" : "user";

        await collection.insertOne({
            email,
            password: hashedPassword,
            role,
        });

        return NextResponse.json({ message: "Usuario registrado con éxito" }, { status: 201 });
    } catch (error) {
        console.error("Error en la API de registro:", error);
        if (error.name === "MongoServerError") {
            return NextResponse.json({ message: "Error de MongoDB: " + error.message }, { status: 500 });
        } else if (error.name === "BcryptError") {
            return NextResponse.json({ message: "Error de Bcrypt: " + error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "Error interno del servidor: " + error.message }, { status: 500 });
    }
}