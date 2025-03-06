'use client';
import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

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
                ganancia: 0,
                resultado: null,
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

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    };

    return (
        <motion.div
            className="container mt-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <motion.div
                        className="card"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="card-header" style={{ backgroundColor: 'yellow', color: 'black', textAlign: 'center' }}>
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
                                    <button type="submit" className="btn" style={{ backgroundColor: 'yellow', color: 'black' }}>Crear Pronóstico</button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default CrearPronostico;