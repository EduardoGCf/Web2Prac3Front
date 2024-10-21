import React, { useState } from 'react';
import axios from 'axios';

const CreateTipo = () => {
  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('imagen', imagen);

    axios.post('http://localhost:3000/api/tipo', formData)
      .then(response => {
        alert('Tipo creado exitosamente');
      })
      .catch(error => {
        console.error('Error al crear el tipo', error);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Crear Tipo</h1>
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
        <div className="mb-3">
          <label className="form-label">Imagen</label>
          <input 
            type="file" 
            className="form-control" 
            onChange={(e) => setImagen(e.target.files[0])} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Crear Tipo</button>
      </form>
    </div>
  );
};

export default CreateTipo;
