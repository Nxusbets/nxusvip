// models/Pronostico.js
import mongoose from 'mongoose';

const PronosticoSchema = new mongoose.Schema({
  partido: {
    type: String,
    required: true,
    index: true, // Agrega un índice para el campo partido
  },
  pronostico: {
    type: String,
    required: true,
  },
  resultado: {
    type: String,
  },
  cuota: {
    type: Number,
    required: true,
    min: 0, // Asegura que la cuota sea mayor o igual a 0
  },
  ganancia: {
    type: Number,
    required: true,
    min: 0, // Asegura que la ganancia sea mayor o igual a 0
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-hook para actualizar el campo updatedAt antes de guardar
PronosticoSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Pronostico || mongoose.model('Pronostico', PronosticoSchema);