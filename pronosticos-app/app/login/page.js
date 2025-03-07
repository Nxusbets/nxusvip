'use client';
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            email,
            password,
            callbackUrl: "/",
        });

        if (result?.error) {
            alert(result.error);
        } else {
            console.log("Inicio de sesión exitoso");
        }
    };

    return (
        <div style={{ 
            backgroundColor: 'black', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh', 
            fontFamily: 'sans-serif', 
            color: 'white' 
        }}>
            <div style={{ 
                backgroundColor: 'yellow', 
                padding: '30px', 
                borderRadius: '10px', 
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
                width: '350px' 
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'black' }}>Iniciar Sesión</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input 
                        type="email" 
                        placeholder="Correo electrónico" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} 
                    />
                    <input 
                        type="password" 
                        placeholder="Contraseña" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} 
                    />
                    <button 
                        type="submit" 
                        style={{ 
                            padding: '10px 20px', 
                            backgroundColor: 'black', 
                            color: 'yellow', 
                            border: 'none', 
                            borderRadius: '5px', 
                            cursor: 'pointer', 
                            transition: 'background-color 0.3s' 
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#333'}
                        onMouseOut={(e) => e.target.style.backgroundColor = 'black'}
                    >
                        Iniciar Sesión
                    </button>
                </form>
                <p style={{ marginTop: '15px' }}>
                    ¿No tienes cuenta? <Link href="/register" style={{ color: 'blue' }}>Regístrate aquí</Link>
                </p>
            </div>
        </div>
    );
}