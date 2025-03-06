'use client';
import { useState } from 'react';
import axios from 'axios';

const AnalisisPronosticos = ({ pronosticos, actualizarPronosticos }) => {
    const gananciaTotal = pronosticos.reduce((total, pronostico) => total + pronostico.ganancia, 0);

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
        } else if (nuevoEstado === pronostico.pronostico) {
            nuevaGanancia = (pronostico.cuota - 1) * 100;
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

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header bg-warning text-center">
                            <h2>Lista de Pronósticos</h2>
                        </div>
                        <div className="card-body">
                            <div className="mb-4 text-center">
                                <p><strong>Total de Pronósticos:</strong> {pronosticos.length}</p>
                                <p><strong>Ganancia Total:</strong> {gananciaTotal}</p>
                            </div>

                            <ul className="list-group">
                                {pronosticos && pronosticos.map((pronostico) => (
                                    <li key={pronostico._id} className="list-group-item">
                                        <strong>Partido:</strong> {pronostico.partido}<br />
                                        <strong>Pronóstico:</strong> {pronostico.pronostico}<br />
                                        {pronostico.resultado && pronostico.pronostico && (
                                            <>
                                                <strong>Resultado:</strong>
                                                {limpiarTexto(pronostico.resultado) === limpiarTexto(pronostico.pronostico) ? (
                                                    <button className="btn btn-success btn-sm ms-2">Ganado</button>
                                                ) : (
                                                    <button className="btn btn-danger btn-sm ms-2">Perdido</button>
                                                )}
                                                <br />
                                            </>
                                        )}
                                        <strong>Cuota:</strong> {pronostico.cuota}<br />
                                        <strong>Ganancia:</strong> {pronostico.ganancia}<br />
                                        <strong>Estado:</strong>
                                        <button className="btn btn-success btn-sm ms-2" onClick={() => modificarEstado(pronostico._id, pronostico.pronostico, pronostico)}>Ganado</button>
                                        <button className="btn btn-danger btn-sm ms-2" onClick={() => modificarEstado(pronostico._id, 'Perdido', pronostico)}>Perdido</button>
                                        <button className="btn btn-danger btn-sm ms-2" onClick={() => eliminarPronostico(pronostico._id)}>Eliminar</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalisisPronosticos;