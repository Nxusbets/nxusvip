'use client';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Navbar = ({ onComponenteSeleccionado }) => {
    const { data: session, status } = useSession();
    const [componenteActivo, setComponenteActivo] = useState('CrearPronostico');
    const router = useRouter();

    const handleClick = (componente) => {
        setComponenteActivo(componente);
        onComponenteSeleccionado(componente);
    };

    const handleSignOut = async () => {
        try {
            await signOut({ callbackUrl: '/login' });
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'yellow' }}>
            <div className="container">
                <a className="navbar-brand text-dark" href="#">NxuS Bets</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto"> {/* Alineación a la izquierda */}
                        <li className={`nav-item ${componenteActivo === 'CrearPronostico' ? 'active' : ''}`}>
                            <button className="nav-link btn btn-link text-dark" onClick={() => handleClick('CrearPronostico')}>
                                Crear Pronóstico
                            </button>
                        </li>
                        <li className={`nav-item ${componenteActivo === 'AnalisisPronosticos' ? 'active' : ''}`}>
                            <button className="nav-link btn btn-link text-dark" onClick={() => handleClick('AnalisisPronosticos')}>
                                Resultados
                            </button>
                        </li>
                    </ul>
                    <ul className="navbar-nav"> {/* Alineación a la derecha */}
                        {status === 'authenticated' && (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link">Hola {session.user.email}</span>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link btn btn-link text-dark" onClick={handleSignOut}>
                                        Cerrar Sesión
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;