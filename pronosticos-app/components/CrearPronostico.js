'use client';
import { useState } from 'react';
import axios from 'axios';

const CrearPronostico = ({ onPronosticoCreado }) => {
    const [partido, setPartido] = useState('');
    const [pronostico, setPronostico] = useState('');
    const [cuota, setCuota] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cuotaNum = parseFloat(cuota);

        if (isNaN(cuotaNum)) {
            console.error('Cuota no es un número válido.');
            return;
        }

        try {
            const nuevoPronostico = {
                partido,
                pronostico,
                cuota: cuotaNum,
                ganancia: 0, // La ganancia se calculará en AnalisisPronosticos
                resultado: null, // Estado inicial: Pendiente
                _id: Date.now().toString(),
                createdAt: new Date().toISOString(),
            };

            onPronosticoCreado(nuevoPronostico);

            await axios.post('/api/pronosticos', {
                partido,
                pronostico,
                cuota: cuotaNum,
                ganancia: 0,
            });

            setPartido('');
            setPronostico('');
            setCuota('');
        } catch (error) {
            console.error('Error al crear el pronóstico:', error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-warning text-black text-center">
                            <h2>Crear Pronóstico</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Partido</label>
                                    <input type="text" className="form-control" value={partido} onChange={(e) => setPartido(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Pronóstico</label>
                                    <input type="text" className="form-control" value={pronostico} onChange={(e) => setPronostico(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Cuota</label>
                                    <input type="number" className="form-control" value={cuota} onChange={(e) => setCuota(e.target.value)} required />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-warning">Crear Pronóstico</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrearPronostico;