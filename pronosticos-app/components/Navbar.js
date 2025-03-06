'use client';
import { useState } from 'react';

const Navbar = ({ onComponenteSeleccionado }) => {
    const [componenteActivo, setComponenteActivo] = useState('CrearPronostico');

    const handleClick = (componente) => {
        setComponenteActivo(componente);
        onComponenteSeleccionado(componente);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-warning">
            <div className="container">
                <a className="navbar-brand text-dark" href="#">NxuS Bets</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className={`nav-item ${componenteActivo === 'CrearPronostico' ? 'active' : ''}`}>
                            <button className="nav-link btn btn-link text-dark" onClick={() => handleClick('CrearPronostico')}>Crear Pronóstico</button>
                        </li>
                        <li className={`nav-item ${componenteActivo === 'AnalisisPronosticos' ? 'active' : ''}`}>
                            <button className="nav-link btn btn-link text-dark" onClick={() => handleClick('AnalisisPronosticos')}>Resultados</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;