import React, { useState } from 'react';
import axios from 'axios';

const CreateHabilidad = () => {
  const [nombre, setNombre] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { nombre };

    axios.post('http://localhost:3000/api/habilidad', data)
      .then(response => {
        alert('Habilidad creada exitosamente');
      })
      .catch(error => {
        console.error('Error al crear la habilidad', error);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Crear Habilidad</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input 
            type="text" 
            className="form-control" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Crear Habilidad</button>
      </form>
    </div>
  );
};

export default CreateHabilidad;
