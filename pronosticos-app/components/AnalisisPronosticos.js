'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AnalisisPronosticos = () => {
  const [pronosticos, setPronosticos] = useState([]);

  useEffect(() => {
    const fetchPronosticos = async () => {
      try {
        const response = await axios.get('/api/pronosticos');
        setPronosticos(response.data);
      } catch (error) {
        console.error('Error al obtener los pronósticos:', error);
      }
    };

    fetchPronosticos();
  }, []);

  // Calcula la ganancia total
  const gananciaTotal = pronosticos.reduce((total, pronostico) => total + pronostico.ganancia, 0);

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-warning text-center">
              <h2>Lista de Pronósticos</h2>
            </div>
            <div className="card-body">
              {/* Resumen */}
              <div className="mb-4 text-center">
                <p><strong>Total de Pronósticos:</strong> {pronosticos.length}</p>
                <p><strong>Ganancia Total:</strong> {gananciaTotal}</p>
              </div>

              <ul className="list-group">
                {pronosticos.map((pronostico) => (
                  <li key={pronostico._id} className="list-group-item">
                    <strong>Partido:</strong> {pronostico.partido}<br />
                    <strong>Pronóstico:</strong> {pronostico.pronostico}<br />
                    <strong>Resultado:</strong>
                    {pronostico.resultado === pronostico.pronostico ? (
                      <button className="btn btn-success btn-sm ms-2">Ganado</button>
                    ) : (
                      <button className="btn btn-danger btn-sm ms-2">Perdido</button>
                    )}
                    <br />
                    <strong>Cuota:</strong> {pronostico.cuota}<br />
                    <strong>Ganancia:</strong> {pronostico.ganancia}
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