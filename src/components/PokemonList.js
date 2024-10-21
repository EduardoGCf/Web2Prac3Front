import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [tipos, setTipos] = useState([]);  // Estado para los tipos
  const [habilidades, setHabilidades] = useState([]);  // Estado para las habilidades
  const [showEditModal, setShowEditModal] = useState(false);
  const [pokemonToEdit, setPokemonToEdit] = useState(null);

  // Estado para los inputs del modal de edición
  const [nombre, setNombre] = useState('');
  const [nroPokedex, setNroPokedex] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [hp, setHp] = useState('');
  const [attack, setAttack] = useState('');
  const [defense, setDefense] = useState('');
  const [spattack, setSpAttack] = useState('');
  const [spdefense, setSpDefense] = useState('');
  const [speed, setSpeed] = useState('');
  const [idTipo1, setIdTipo1] = useState('');  // Tipo 1 (puede ser nulo)
  const [idTipo2, setIdTipo2] = useState('');  // Tipo 2 (puede ser nulo)
  const [idHabilidad1, setIdHabilidad1] = useState('');  // Habilidad 1 (puede ser nulo)
  const [idHabilidad2, setIdHabilidad2] = useState('');  // Habilidad 2 (puede ser nulo)
  const [idHabilidad3, setIdHabilidad3] = useState('');  // Habilidad 3 (puede ser nulo)
  const [imagen, setPokemonImage] = useState(null);  // Imagen nueva
  const [idEvPrevia, setEvolucionAnterior] = useState('');
  const [idEvSiguiente, setEvolucionSiguiente] = useState('');
  const [nivelEvolucion, setNivelEvolucion] = useState(0);

  useEffect(() => {
    fetchPokemons();
    fetchTipos();
    fetchHabilidades();
  }, []);

  const fetchPokemons = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/pokemon');
      setPokemons(response.data);
    } catch (error) {
      console.error('Error al obtener los Pokémon:', error);
    }
  };

  const fetchTipos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/tipo');
      setTipos(response.data);
    } catch (error) {
      console.error('Error al obtener los tipos:', error);
    }
  };

  const fetchHabilidades = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/habilidad');
      setHabilidades(response.data);
    } catch (error) {
      console.error('Error al obtener las habilidades:', error);
    }
  };

  const deletePokemon = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/pokemon/${id}`);
      fetchPokemons();
    } catch (error) {
      console.error('Error al eliminar el Pokémon:', error);
    }
  };

  const handleEditClick = (pokemon) => {
    setPokemonToEdit(pokemon);
    setNombre(pokemon.nombre);
    setNroPokedex(pokemon.nroPokedex);
    setDescripcion(pokemon.descripcion);
    setHp(pokemon.hp);
    setAttack(pokemon.attack);
    setDefense(pokemon.defense);
    setSpAttack(pokemon.spattack);
    setSpDefense(pokemon.spdefense);
    setSpeed(pokemon.speed);
    setIdTipo1(pokemon.idTipo1 || '');  // Cargar el Tipo 1 actual (puede ser nulo)
    setIdTipo2(pokemon.idTipo2 || '');  // Cargar el Tipo 2 actual (puede ser nulo)
    setIdHabilidad1(pokemon.idHabilidad1 || '');  // Cargar la Habilidad 1 actual (puede ser nulo)
    setIdHabilidad2(pokemon.idHabilidad2 || '');  // Cargar la Habilidad 2 actual (puede ser nulo)
    setIdHabilidad3(pokemon.idHabilidad3 || '');  // Cargar la Habilidad 3 actual (puede ser nulo)
    setPokemonImage(null);  // No cambiar la imagen por defecto
    setShowEditModal(true);
    setEvolucionAnterior(pokemon.idEvPrevia);
    setEvolucionSiguiente(pokemon.idEvSiguiente);
    setNivelEvolucion(pokemon.nivelEvolucion);
    
  };

  const handleSaveEdit = async () => {
    try {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('nroPokedex', nroPokedex);
      formData.append('descripcion', descripcion);
      formData.append('hp', hp);
      formData.append('attack', attack);
      formData.append('defense', defense);
      formData.append('spattack', spattack);
      formData.append('spdefense', spdefense);
      formData.append('speed', speed);


      // Añadir los tipos y habilidades al formData
      formData.append('idTipo1', idTipo1 || null);
      formData.append('idTipo2', idTipo2 || null);
      formData.append('idHabilidad1', idHabilidad1 || null);
      formData.append('idHabilidad2', idHabilidad2 || null);
      formData.append('idHabilidad3', idHabilidad3 || null);


      // Si hay una nueva imagen seleccionada, agregarla
      if (imagen) {
        formData.append('imagen', imagen);
      }

      // Añadir la evolución anterior y siguiente
      formData.append('idEvPrevia', idEvPrevia || null);
      formData.append('idEvSiguiente', idEvSiguiente || null);
      formData.append('nivelEvolucion', nivelEvolucion);

      await axios.put(`http://localhost:3000/api/pokemon/${pokemonToEdit.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setShowEditModal(false);
      fetchPokemons();
    } catch (error) {
      console.error('Error al actualizar el Pokémon:', error);
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Lista de Pokémon</h1>

      <div className="text-end mb-3">
        <Button href="/crear-pokemon" variant="primary">Agregar Pokémon</Button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nro. Pokédex</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pokemons.map((pokemon) => (
            <tr key={pokemon.id}>
              <td>{pokemon.nroPokedex}</td>
              <td>{pokemon.nombre}</td>
              <td>
                <Button variant="warning" onClick={() => handleEditClick(pokemon)}>Editar</Button>{' '}
                <Button variant="danger" onClick={() => deletePokemon(pokemon.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Pokémon</Modal.Title>
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
              <Form.Label>Nro. Pokédex</Form.Label>
              <Form.Control
                type="number"
                value={nroPokedex}
                onChange={(e) => setNroPokedex(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>HP</Form.Label>
              <Form.Control
                type="number"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ataque</Form.Label>
              <Form.Control
                type="number"
                value={attack}
                onChange={(e) => setAttack(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Defensa</Form.Label>
              <Form.Control
                type="number"
                value={defense}
                onChange={(e) => setDefense(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ataque Especial</Form.Label>
              <Form.Control
                type="number"
                value={spattack}
                onChange={(e) => setSpAttack(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Defensa Especial</Form.Label>
              <Form.Control
                type="number"
                value={spdefense}
                onChange={(e) => setSpDefense(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Velocidad</Form.Label>
              <Form.Control
                type="number"
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
              />
            </Form.Group>

            {/* Selectores de Tipo */}
            <Form.Group>
              <Form.Label>Tipo 1</Form.Label>
              <Form.Control
                as="select"
                value={idTipo1}
                onChange={(e) => setIdTipo1(e.target.value)}
              >
                <option value="">Ninguno</option>
                {tipos.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Tipo 2</Form.Label>
              <Form.Control
                as="select"
                value={idTipo2}
                onChange={(e) => setIdTipo2(e.target.value)}
              >
                <option value="">Ninguno</option>
                {tipos.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                ))}
              </Form.Control>
            </Form.Group>

            {/* Selectores de Habilidad */}
            <Form.Group>
              <Form.Label>Habilidad 1</Form.Label>
              <Form.Control
                as="select"
                value={idHabilidad1}
                onChange={(e) => setIdHabilidad1(e.target.value)}
              >
                <option value="">Ninguna</option>
                {habilidades.map((habilidad) => (
                  <option key={habilidad.id} value={habilidad.id}>{habilidad.nombre}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Habilidad 2</Form.Label>
              <Form.Control
                as="select"
                value={idHabilidad2}
                onChange={(e) => setIdHabilidad2(e.target.value)}
              >
                <option value="">Ninguna</option>
                {habilidades.map((habilidad) => (
                  <option key={habilidad.id} value={habilidad.id}>{habilidad.nombre}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Habilidad 3</Form.Label>
              <Form.Control
                as="select"
                value={idHabilidad3}
                onChange={(e) => setIdHabilidad3(e.target.value)}
              >
                <option value="">Ninguna</option>
                {habilidades.map((habilidad) => (
                  <option key={habilidad.id} value={habilidad.id}>{habilidad.nombre}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setPokemonImage(e.target.files[0])}
              />
            </Form.Group>


            <Form.Group>
  <Form.Label>Evolución Anterior</Form.Label>
  <Form.Control
    as="select"
    value={idEvPrevia || ""}
    onChange={(e) => setEvolucionAnterior(e.target.value)}
  >
    <option value="">Ninguna</option>
    {pokemons.map((pokemon) => (
      <option key={pokemon.id} value={pokemon.id}>{pokemon.nombre}</option>
    ))}
  </Form.Control>
</Form.Group>
<Form.Group>
  <Form.Label>Evolución Siguiente</Form.Label>
  <Form.Control
    as="select"
    value={idEvSiguiente || ""}
    onChange={(e) => setEvolucionSiguiente(e.target.value)}
  >
    <option value="">Ninguna</option>
    {pokemons.map((pokemon) => (
      <option key={pokemon.id} value={pokemon.id}>{pokemon.nombre}</option>
    ))}
  </Form.Control>
</Form.Group>

              <Form.Group>
              <Form.Label>Nivel de Evolucion</Form.Label>
              <Form.Control
                type="number"
                value={nivelEvolucion}
                onChange={(e) => setNivelEvolucion(e.target.value)}
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

export default PokemonList;
