'use client';
import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const AnalisisPronosticos = ({ pronosticos, actualizarPronosticos }) => {
    const gananciaTotal = pronosticos.reduce((total, pronostico) => total + pronostico.ganancia, 0);
    const [currentPage, setCurrentPage] = useState(1);
    const pronosticosPerPage = 10;
    const limpiarTexto = (texto) => {
        if (texto === undefined) {
            return '';
        }
        return texto.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase().trim();
    };

    const modificarEstado = async (id, nuevoEstado, pronostico) => {
        let nuevaGanancia = 0;
        if (nuevoEstado === 'Perdido') {
            nuevaGanancia = -100;
        } else if (nuevoEstado === 'Perdido Parcial') {
            nuevaGanancia = -50;
        } else if (nuevoEstado === pronostico.pronostico) {
            nuevaGanancia = (pronostico.cuota - 1) * 100;
        } else if (nuevoEstado === 'Ganancia Parcial') {
            nuevaGanancia = ((pronostico.cuota - 1) * 100) / 2;
        }

        const pronosticosActualizados = pronosticos.map(pronostico => {
            if (pronostico._id === id) {
                return { ...pronostico, resultado: nuevoEstado, ganancia: nuevaGanancia };
            }
            return pronostico;
        });
        actualizarPronosticos(pronosticosActualizados);

        try {
            await axios.put(`/api/pronosticos/${id}`, { resultado: nuevoEstado, ganancia: nuevaGanancia });
        } catch (error) {
            console.error('Error al modificar el estado:', error);
        }
    };

    const eliminarPronostico = async (id) => {
        try {
            await axios.delete(`/api/pronosticos/${id}`);
            const pronosticosActualizados = pronosticos.filter(pronostico => pronostico._id !== id);
            actualizarPronosticos(pronosticosActualizados);
        } catch (error) {
            console.error('Error al eliminar el pronóstico:', error);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } },
    };

    const listItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
    };

    const indexOfLastPronostico = currentPage * pronosticosPerPage;
    const indexOfFirstPronostico = indexOfLastPronostico - pronosticosPerPage;
    const currentPronosticos = pronosticos.slice(indexOfFirstPronostico, indexOfLastPronostico);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Definimos pageNumbers aquí, antes de usarlo
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(pronosticos.length / pronosticosPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <motion.div
            className="container mt-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ backgroundColor: 'yellow', color: 'black' }}
        >
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header" style={{ backgroundColor: 'yellow', color: 'black', textAlign: 'center' }}>
                            <h2>Lista de Pronósticos</h2>
                        </div>
                        <div className="card-body">
                            <div className="mb-4 text-center">
                                <p><strong>Total de Pronósticos:</strong> {pronosticos.length}</p>
                                <p><strong>Ganancia Total:</strong> {gananciaTotal}</p>
                            </div>

                            <ul className="list-group">
                                <AnimatePresence>
                                    {pronosticos && pronosticos.map((pronostico) => (
                                        <motion.li
                                            key={pronostico._id}
                                            className="list-group-item"
                                            variants={listItemVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            <strong>Partido:</strong> {pronostico.partido}<br />
                                            <strong>Pronóstico:</strong> {pronostico.pronostico}<br />
                                            <strong>Resultado:</strong>
                                            {pronostico.resultado === pronostico.pronostico ? (
                                                <button className="btn btn-success btn-sm ms-2" style={{ backgroundColor: 'green', color: 'white' }}>Ganado</button>
                                            ) : pronostico.resultado === 'Ganancia Parcial' ? (
                                                <button className="btn btn-warning btn-sm ms-2" style={{ backgroundColor: 'pink', color: 'white' }}>Ganancia Parcial</button>
                                            ) : pronostico.resultado === 'Perdido' ? (
                                                <button className="btn btn-danger btn-sm ms-2" style={{ backgroundColor: 'red', color: 'white' }}>Perdido</button>
                                            ) : pronostico.resultado === 'Perdido Parcial' ? (
                                                <button className="btn btn-secondary btn-sm ms-2" style={{ backgroundColor: 'purple', color: 'white' }}>Perdido Parcial</button>
                                            ) : null}
                                            <br />
                                            <strong>Cuota:</strong> {pronostico.cuota}<br />
                                            <strong>Ganancia:</strong> {pronostico.ganancia}<br />
                                            <strong>Estado:</strong>
                                            <button className="btn btn-success btn-sm ms-2" style={{ backgroundColor: 'green', color: 'white' }} onClick={() => modificarEstado(pronostico._id, pronostico.pronostico, pronostico)}>Ganado</button>
                                            <button className="btn btn-warning btn-sm ms-2" style={{ backgroundColor: 'pink', color: 'white' }} onClick={() => modificarEstado(pronostico._id, 'Ganancia Parcial', pronostico)}>Ganancia Parcial</button>
                                            <button className="btn btn-danger btn-sm ms-2" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => modificarEstado(pronostico._id, 'Perdido', pronostico)}>Perdido</button>
                                            <button className="btn btn-secondary btn-sm ms-2" style={{ backgroundColor: 'purple', color: 'white' }} onClick={() => modificarEstado(pronostico._id, 'Perdido Parcial', pronostico)}>Perdido Parcial</button>
                                            <button className="btn btn-danger btn-sm ms-2" style={{ backgroundColor: 'orange', color: 'white' }} onClick={() => eliminarPronostico(pronostico._id)}>Eliminar</button>
                                        </motion.li>
                                    ))}
                                </AnimatePresence>
                            </ul>
                            <nav>

                                <ul className="pagination justify-content-center">

                                    {pageNumbers.map(number => (

                                        <li key={number} className="page-item">

                                            <button onClick={() => paginate(number)} className="page-link">

                                                {number}   </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AnalisisPronosticos;
