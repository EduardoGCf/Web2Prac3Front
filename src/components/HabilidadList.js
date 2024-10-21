import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const HabilidadList = () => {
  const [habilidades, setHabilidades] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [habilidadToEdit, setHabilidadToEdit] = useState(null);

  const [nombre, setNombre] = useState('');

  useEffect(() => {
    fetchHabilidades();
  }, []);

  const fetchHabilidades = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/habilidad');
      setHabilidades(response.data);
    } catch (error) {
      console.error('Error al obtener las habilidades:', error);
    }
  };

  const deleteHabilidad = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/habilidad/${id}`);
      fetchHabilidades();
    } catch (error) {
      console.error('Error al eliminar la habilidad:', error);
    }
  };

  const handleEditClick = (habilidad) => {
    setHabilidadToEdit(habilidad);
    setNombre(habilidad.nombre);
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      const updatedHabilidad = { nombre };
      await axios.put(`http://localhost:3000/api/habilidad/${habilidadToEdit.id}`, updatedHabilidad);
      setShowEditModal(false);
      fetchHabilidades();
    } catch (error) {
      console.error('Error al actualizar la habilidad:', error);
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Lista de Habilidades</h1>

      <div className="text-end mb-3">
        <Button href="/crear-habilidad" variant="primary">Agregar Habilidad</Button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {habilidades.map((habilidad) => (
            <tr key={habilidad.id}>
              <td>{habilidad.nombre}</td>
              <td>
                <Button variant="warning" onClick={() => handleEditClick(habilidad)}>Editar</Button>{' '}
                <Button variant="danger" onClick={() => deleteHabilidad(habilidad.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Habilidad</Modal.Title>
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

export default HabilidadList;
