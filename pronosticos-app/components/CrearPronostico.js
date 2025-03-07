'use client';
import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';

const CrearPronostico = ({ onPronosticoCreado }) => {
    const { data: session } = useSession();
    const [partido, setPartido] = useState('');
    const [pronostico, setPronostico] = useState('');
    const [cuota, setCuota] = useState('');
    const [mensaje, setMensaje] = useState(null);
    const [cargando, setCargando] = useState(false);

    const mostrarMensaje = (tipo, texto) => {
        setMensaje({ tipo, texto });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje(null);
        setCargando(true);

        const cuotaNum = parseFloat(cuota);

        if (isNaN(cuotaNum)) {
            mostrarMensaje('error', 'Cuota no es un número válido.');
            setCargando(false);
            return;
        }

        try {
            const response = await axios.post('/api/pronosticos', {
                partido,
                pronostico,
                cuota: cuotaNum,
                ganancia: 0,
            });

            if (response.status === 201) {
                mostrarMensaje('success', 'Pronóstico creado correctamente.');
                setPartido('');
                setPronostico('');
                setCuota('');
                onPronosticoCreado();
            } else {
                mostrarMensaje('error', 'Error al crear el pronóstico.');
            }
        } catch (error) {
            console.error('Error al crear el pronóstico:', error);
            if (error.response) {
                console.log('Respuesta del servidor:', error.response);
                mostrarMensaje('error', `Error: ${error.response.data.error || 'Error desconocido'}`);
            } else {
                mostrarMensaje('error', 'Error al crear el pronóstico.');
            }
        } finally {
            setCargando(false);
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

    if (session?.user?.role !== 'admin') {
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
                                <p>No tienes permiso para crear pronósticos.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        );
    }

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
                            {mensaje && (
                                <div className={`alert alert-${mensaje.tipo === 'success' ? 'success' : 'danger'}`}>
                                    {mensaje.texto}
                                </div>
                            )}
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
                                    <button type="submit" className="btn" style={{ backgroundColor: 'yellow', color: 'black' }} disabled={cargando}>
                                        {cargando ? 'Cargando...' : 'Crear Pronóstico'}
                                    </button>
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