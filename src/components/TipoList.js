import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const TipoList = () => {
  const [tipos, setTipos] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [tipoToEdit, setTipoToEdit] = useState(null);

  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState(null);

  useEffect(() => {
    fetchTipos();
  }, []);

  const fetchTipos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/tipo');
      setTipos(response.data);
    } catch (error) {
      console.error('Error al obtener los tipos:', error);
    }
  };

  const deleteTipo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/tipo/${id}`);
      fetchTipos();
    } catch (error) {
      console.error('Error al eliminar el tipo:', error);
    }
  };

  const handleEditClick = (tipo) => {
    setTipoToEdit(tipo);
    setNombre(tipo.nombre);
    setImagen(null); // No cambiar la imagen por defecto
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      const formData = new FormData();
      formData.append('nombre', nombre);

      if (imagen) {
        formData.append('imagen', imagen);
      }

      await axios.put(`http://localhost:3000/api/tipo/${tipoToEdit.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setShowEditModal(false);
      fetchTipos();
    } catch (error) {
      console.error('Error al actualizar el tipo:', error);
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Lista de Tipos</h1>

      <div className="text-end mb-3">
        <Button href="/crear-tipo" variant="primary">Agregar Tipo</Button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tipos.map((tipo) => (
            <tr key={tipo.id}>
              <td>{tipo.nombre}</td>
              <td>
                <Button variant="warning" onClick={() => handleEditClick(tipo)}>Editar</Button>{' '}
                <Button variant="danger" onClick={() => deleteTipo(tipo.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Tipo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImagen(e.target.files[0])}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>Cancelar</Button>
          <Button variant="primary" onClick={handleSaveEdit}>Guardar cambios</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TipoList;
