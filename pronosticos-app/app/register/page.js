'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();
            setMessage(data.message);

            if (response.ok) {
                router.push('/login');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Ocurrió un error durante el registro.');
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
                <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'black' }}>Registro</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} 
                    />
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
                        Registrarse
                    </button>
                </form>
                {message && <p style={{ color: 'red', marginTop: '15px' }}>{message}</p>}
            </div>
        </div>
    );
}