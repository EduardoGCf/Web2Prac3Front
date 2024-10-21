import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importar Link para navegación

const PokemonCatalog = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Cargar todos los Pokémon al montar el componente
  const fetchAllPokemons = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/pokemon');
      setPokemons(response.data);
      setFilteredPokemons(response.data);  // Inicialmente, no hay filtro
    } catch (error) {
      console.error('Error al obtener los Pokémon', error);
    }
  };

  useEffect(() => {
    fetchAllPokemons();
  }, []);

  // Función para filtrar los Pokémon en el frontend
  useEffect(() => {
    const filtered = pokemons.filter((pokemon) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        pokemon.nombre.toLowerCase().includes(searchLower) ||
        pokemon.nroPokedex.toString().includes(searchLower) ||
        (pokemon.Tipo1 && pokemon.Tipo1.toLowerCase().includes(searchLower)) ||
        (pokemon.Tipo2 && pokemon.Tipo2.toLowerCase().includes(searchLower))
      );
    });
    setFilteredPokemons(filtered);
  }, [searchTerm, pokemons]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Catálogo de Pokémon</h1>

      {/* Campo de búsqueda */}
      <div className="row mb-4">
        <div className="col-md-12">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre, número de Pokédex o tipo"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Filtrar en frontend
          />
        </div>
      </div>

      <div className="row">
        {filteredPokemons.length === 0 ? (
          <div className="text-center">No se encontraron Pokémon</div>
        ) : (
          filteredPokemons.map((pokemon) => (
            <div key={pokemon.id} className="col-md-4 mb-4">
              <div className="card">
                {/* Link alrededor de la imagen */}
                <Link to={`/pokemon/${pokemon.id}`}>
                  <img
                    src={`http://localhost:3000/uploads/${pokemon.imagen}`}
                    className="card-img-top"
                    alt={pokemon.nombre}
                  />
                </Link>
                <div className="card-body">
                  {/* Link alrededor del nombre */}
                  <h5 className="card-title">
                    <Link to={`/pokemon/${pokemon.id}`}>{pokemon.nombre}</Link>
                  </h5>
                  <p className="card-text">Número Pokédex: {pokemon.nroPokedex}</p>
                  <p className="card-text">Tipo 1: {pokemon.Tipo1}</p>
                  {pokemon.Tipo2 && <p className="card-text">Tipo 2: {pokemon.Tipo2}</p>}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PokemonCatalog;
