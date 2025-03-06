'use client';
import { useState } from 'react';
import axios from 'axios';

const CrearPronostico = ({ onPronosticoCreado }) => {
  const [partido, setPartido] = useState('');
  const [pronostico, setPronostico] = useState('');
  const [resultado, setResultado] = useState('');
  const [cuota, setCuota] = useState(0);
  const [ganancia, setGanancia] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedCuota = parseFloat(cuota);
      const parsedGanancia = parseFloat(ganancia);

      await axios.post('/api/pronosticos', {
        partido,
        pronostico,
        resultado,
        cuota: isNaN(parsedCuota) ? 0 : parsedCuota,
        ganancia: isNaN(parsedGanancia) ? 0 : parsedGanancia,
      });

      setPartido('');
      setPronostico('');
      setResultado('');
      setCuota(0);
      setGanancia(0);
      onPronosticoCreado();
    } catch (error) {
      console.error('Error al crear el pronóstico:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-warning text-center">
              <h2>Crear Pronóstico</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="partido" className="form-label">Partido:</label>
                  <input type="text" id="partido" value={partido} onChange={(e) => setPartido(e.target.value)} className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="pronostico" className="form-label">Pronóstico:</label>
                  <input type="text" id="pronostico" value={pronostico} onChange={(e) => setPronostico(e.target.value)} className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="resultado" className="form-label">Resultado:</label>
                  <input type="text" id="resultado" value={resultado} onChange={(e) => setResultado(e.target.value)} className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="cuota" className="form-label">Cuota:</label>
                  <input type="number" id="cuota" value={cuota} onChange={(e) => setCuota(parseFloat(e.target.value))} className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="ganancia" className="form-label">Ganancia:</label>
                  <input type="number" id="ganancia" value={ganancia} onChange={(e) => setGanancia(parseFloat(e.target.value))} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary w-100">Guardar Pronóstico</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearPronostico;