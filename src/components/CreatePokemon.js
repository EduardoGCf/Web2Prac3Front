import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreatePokemon = () => {
  const [nombre, setNombre] = useState('');
  const [nroPokedex, setNroPokedex] = useState('');
  const [tipo1, setTipo1] = useState('');
  const [tipo2, setTipo2] = useState('');
  const [habilidad1, setHabilidad1] = useState('');
  const [habilidad2, setHabilidad2] = useState('');
  const [habilidad3, setHabilidad3] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [hp, setHp] = useState('');
  const [attack, setAttack] = useState('');
  const [defense, setDefense] = useState('');
  const [spattack, setSpAttack] = useState('');  // Puntos de ataque especiales (ps)
  const [spdefense, setSpDefense] = useState('');  // Puntos de defensa especiales (ps)
  const [speed, setSpeed] = useState('');
  const [imagen, setImagen] = useState(null);
  const [idEvSiguiente, setIdEvSiguiente] = useState(null);
  const [idEvPrevia, setIdEvPrevia] = useState(null);
  const [nivelEvolucion, setNivelEvolucion] = useState('');

  const [tipos, setTipos] = useState([]);
  const [habilidades, setHabilidades] = useState([]);
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    // Obtener todos los tipos
    axios.get('http://localhost:3000/api/tipo')
      .then(response => {
        setTipos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los tipos', error);
      });

    // Obtener todas las habilidades
    axios.get('http://localhost:3000/api/habilidad')
      .then(response => {
        setHabilidades(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las habilidades', error);
      });
      //Obtener todos los pokemones
      axios.get('http://localhost:3000/api/pokemon')
      .then(response => {
        setPokemons(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los pokemones', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('nroPokedex', nroPokedex);
    formData.append('idTipo1', tipo1 || null);  // Enviar null si no se selecciona un valor
    formData.append('idTipo2', tipo2 || null);  // Enviar null si no se selecciona un valor
    formData.append('idHabilidad1', habilidad1 || null);  // Enviar null si no se selecciona un valor
    formData.append('idHabilidad2', habilidad2 || null);  // Enviar null si no se selecciona un valor
    formData.append('idHabilidad3', habilidad3 || null);  // Enviar null si no se selecciona un valor
    formData.append('descripcion', descripcion);
    formData.append('hp', hp || null);
    formData.append('attack', attack || null);
    formData.append('defense', defense || null);
    formData.append('spattack', spattack || null);
    formData.append('spdefense', spdefense || null);
    formData.append('speed', speed || null);
    formData.append('imagen', imagen);
    formData.append('idEvSiguiente', idEvSiguiente || null);
    formData.append('idEvPrevia', idEvPrevia || null);
    formData.append('nivelEvolucion', nivelEvolucion || null);


    axios.post('http://localhost:3000/api/pokemon', formData)
      .then(response => {
        alert('Pokémon creado exitosamente');
      })
      .catch(error => {
        console.error('Error al crear el Pokémon', error);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Crear Pokémon</h1>
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
          <label className="form-label">Número de Pokédex</label>
          <input 
            type="number" 
            className="form-control" 
            value={nroPokedex} 
            onChange={(e) => setNroPokedex(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tipo 1</label>
          <select 
            className="form-select" 
            value={tipo1} 
            onChange={(e) => setTipo1(e.target.value)} 
            required
          >
            <option value="">Seleccionar Tipo 1</option>
            {tipos.map(tipo => (
              <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Tipo 2 (opcional)</label>
          <select 
            className="form-select" 
            value={tipo2} 
            onChange={(e) => setTipo2(e.target.value)}
          >
            <option value="">Seleccionar Tipo 2</option>
            {tipos.map(tipo => (
              <option key={tipo.id} value={tipo.id}>
                
                {tipo.nombre}
                </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Habilidad 1</label>
          <select 
            className="form-select" 
            value={habilidad1} 
            onChange={(e) => setHabilidad1(e.target.value)} 
            required
          >
            <option value="">Seleccionar Habilidad 1</option>
            {habilidades.map(habilidad => (
              <option key={habilidad.id} value={habilidad.id}>{habilidad.nombre}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Habilidad 2 (opcional)</label>
          <select 
            className="form-select" 
            value={habilidad2} 
            onChange={(e) => setHabilidad2(e.target.value)}
          >
            <option value="">Seleccionar Habilidad 2</option>
            {habilidades.map(habilidad => (
              <option key={habilidad.id} value={habilidad.id}>{habilidad.nombre}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Habilidad 3 (opcional)</label>
          <select 
            className="form-select" 
            value={habilidad3} 
            onChange={(e) => setHabilidad3(e.target.value)}
          >
            <option value="">Seleccionar Habilidad 3</option>
            {habilidades.map(habilidad => (
              <option key={habilidad.id} value={habilidad.id}>{habilidad.nombre}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea 
            className="form-control" 
            value={descripcion} 
            onChange={(e) => setDescripcion(e.target.value)}
            required 
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">HP</label>
          <input 
            type="number" 
            className="form-control" 
            value={hp} 
            onChange={(e) => setHp(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Ataque</label>
          <input 
            type="number" 
            className="form-control" 
            value={attack} 
            onChange={(e) => setAttack(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Defensa</label>
          <input 
            type="number" 
            className="form-control" 
            value={defense} 
            onChange={(e) => setDefense(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Sp. Atk</label>
          <input 
            type="number" 
            className="form-control" 
            value={spattack} 
            onChange={(e) => setSpAttack(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Sp. Def</label>
          <input 
            type="number" 
            className="form-control" 
            value={spdefense} 
            onChange={(e) => setSpDefense(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Velocidad</label>
          <input 
            type="number" 
            className="form-control" 
            value={speed} 
            onChange={(e) => setSpeed(e.target.value)} 
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
        <div className="mb-3">
          <label className="form-label">ID Evolución Siguiente (opcional)</label>
          <select 
            className="form-select" 
            value={idEvSiguiente} 
            onChange={(e) => setIdEvSiguiente(e.target.value)}
          >
            <option value="">Seleccionar Pokémon Evolución Siguiente</option>
            {pokemons.map(pokemon => (
              <option key={pokemon.id} value={pokemon.id}>{pokemon.nombre}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">ID Evolución Previa (opcional)</label>
          <select 
            className="form-select" 
            value={idEvPrevia} 
            onChange={(e) => setIdEvPrevia(e.target.value)}
          >
            <option value="">Seleccionar Pokémon Evolución Previa</option>
            {pokemons.map(pokemon => (
              <option key={pokemon.id} value={pokemon.id}>{pokemon.nombre}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Nivel de Evolución</label>
          <input 
            type="number" 
            className="form-control" 
            value={nivelEvolucion} 
            onChange={(e) => setNivelEvolucion(e.target.value)} 
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Crear Pokémon</button>
      </form>
    </div>
  );
};

export default CreatePokemon;
