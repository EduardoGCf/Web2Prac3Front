import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PokemonDetail.css';  // Asegúrate de tener los estilos personalizados
import { Link } from 'react-router-dom'; // Importar Link para navegación

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [evolutiveLine, setEvolutiveLine] = useState([]);  // Estado para la línea evolutiva
  const [tipos, setTipos] = useState({});
  const [habilidades, setHabilidades] = useState({});

  const level = 100;
  const iv = 31;  // Valor individual máximo
  const evMin = 0;
  const evMax = 252;

  // Fórmulas para calcular HP
  const calculateHp = (baseStat, ev) => {
    return Math.floor(((2 * baseStat + iv + ev / 4) * level) / 100 + level + 10);
  };

  // Fórmulas para las demás estadísticas (Ataque, Defensa, etc.)
  const calculateStat = (baseStat, ev) => {
    return Math.floor(((2 * baseStat + iv + ev / 4) * level) / 100 + 5);
  };

  // Obtener detalles del Pokémon y la línea evolutiva
  const fetchPokemonDetail = async () => {
    try {
      // Obtener detalles del Pokémon
      const response = await axios.get(`http://localhost:3000/api/pokemon/${id}`);
      const pokemonData = response.data;

      // Obtener línea evolutiva del Pokémon
      const evolutiveResponse = await axios.get(`http://localhost:3000/api/pokemon/${id}/evolutive-line`);
      const evolutiveLineData = evolutiveResponse.data;

      // Obtener tipos y habilidades del Pokémon actual
      const tipoPromises = [];
      const habilidadPromises = [];

      if (pokemonData.idTipo1) {
        tipoPromises.push(axios.get(`http://localhost:3000/api/tipo/${pokemonData.idTipo1}`));
      }
      if (pokemonData.idTipo2) {
        tipoPromises.push(axios.get(`http://localhost:3000/api/tipo/${pokemonData.idTipo2}`));
      }
      if (pokemonData.idHabilidad1) {
        habilidadPromises.push(axios.get(`http://localhost:3000/api/habilidad/${pokemonData.idHabilidad1}`));
      }
      if (pokemonData.idHabilidad2) {
        habilidadPromises.push(axios.get(`http://localhost:3000/api/habilidad/${pokemonData.idHabilidad2}`));
      }
      if (pokemonData.idHabilidad3) {
        habilidadPromises.push(axios.get(`http://localhost:3000/api/habilidad/${pokemonData.idHabilidad3}`));
      }

      const tipoResults = await Promise.all(tipoPromises);
      const habilidadResults = await Promise.all(habilidadPromises);

      setTipos({
        tipo1: tipoResults[0] ? tipoResults[0].data : null,
        tipo2: tipoResults[1] ? tipoResults[1].data : null,
      });

      setHabilidades({
        habilidad1: habilidadResults[0] ? habilidadResults[0].data : null,
        habilidad2: habilidadResults[1] ? habilidadResults[1].data : null,
        habilidad3: habilidadResults[2] ? habilidadResults[2].data : null,
      });

      // Ahora obtener los tipos para cada Pokémon en la línea evolutiva
      const evolutiveWithTypes = await Promise.all(evolutiveLineData.map(async (evolution) => {
        const tiposEvolucion = [];

        if (evolution.tipo1) {
          tiposEvolucion.push(axios.get(`http://localhost:3000/api/tipo/${evolution.tipo1}`));
        }
        if (evolution.tipo2) {
          tiposEvolucion.push(axios.get(`http://localhost:3000/api/tipo/${evolution.tipo2}`));
        }

        const tipoResults = await Promise.all(tiposEvolucion);

        return {
          ...evolution,
          tipo1: tipoResults[0] ? tipoResults[0].data.nombre : null,
          tipo1Imagen: tipoResults[0] ? tipoResults[0].data.imagen : null,
          tipo2: tipoResults[1] ? tipoResults[1].data.nombre : null,
          tipo2Imagen: tipoResults[1] ? tipoResults[1].data.imagen : null,
        };
      }));

      setEvolutiveLine(evolutiveWithTypes);
      setPokemon(pokemonData);
      setLoading(false);
    } catch (err) {
      console.error('Error al obtener los detalles del Pokémon:', err);
      setError('No se pudieron cargar los detalles del Pokémon');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonDetail();
  }, [id]);

  if (loading) {
    return <div>Cargando detalles del Pokémon...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!pokemon) {
    return <div>No se encontraron detalles del Pokémon</div>;
  }

  return (
    <div className="container mt-5" id="inf-pok">
      {/* Información general del Pokémon */}
      <h1>{pokemon.nombre}</h1>
      
      <p>Número Pokédex: {pokemon.nroPokedex}</p>
      <div className="d-flex align-items-center">
      <img src={`http://localhost:3000/uploads/${pokemon.imagen}`} alt={pokemon.nombre} className="imgg img-fluid" />
      <p className='mt-5 mx-4'>{pokemon.descripcion}</p>
      </div>
      {/* Mostrar tipos con sus imágenes */}
      <div className="d-flex align-items-center mt-5">
        {tipos.tipo1 ? (
          <div>
            <p>Tipo 1: {tipos.tipo1.nombre}</p>
            <img
              src={`http://localhost:3000/uploads/${tipos.tipo1.imagen}`}
              alt={tipos.tipo1.nombre}
              className="imgg img-thumbnail"
              style={{ width: '50px', height: '50px' }}
            />
          </div>
        ) : (
          <p></p>
        )}
        {tipos.tipo2 ? (
          <div className="ms-4">
            <p>Tipo 2: {tipos.tipo2.nombre}</p>
            <img
              src={`http://localhost:3000/uploads/${tipos.tipo2.imagen}`}
              alt={tipos.tipo2.nombre}
              className="img-thumbnail"
              style={{ width: '50px', height: '50px' }}
            />
          </div>
        ) : (
          <p></p>
        )}
      </div>



      {/* Mostrar habilidades */}
      <div className="mt-5">
        {habilidades.habilidad1 ? <p>Habilidad 1: {habilidades.habilidad1.nombre}</p> : <p>Habilidad 1: XXXXXXXX</p>}
        {habilidades.habilidad2 ? <p>Habilidad 2: {habilidades.habilidad2.nombre}</p> : <p>Habilidad 2: XXXXXXXX</p>}
        {habilidades.habilidad3 ? <p>Habilidad 3: {habilidades.habilidad3.nombre}</p> : <p>Habilidad 3: XXXXXXXX</p>}
      </div>



      {/* Tabla de estadísticas (EVs) */}
      <div className="stats-container mt-5">
        <h3>Estadísticas del Pokémon</h3>
        <table className="table stats-table">
          <thead>
            <tr>
              <th>Stat</th>
              <th>Value</th>
              <th></th>
              <th>Min</th>
              <th>Max</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>HP</td>
              <td>{pokemon.hp}</td>
              <td>
                <div className="stat-bar-container">
                  <div
                    className="stat-bar"
                    style={{
                      width: `${(pokemon.hp / calculateHp(pokemon.hp, evMax)) * 100}%`,
                      backgroundColor: 'orange',
                    }}
                  ></div>
                </div>
              </td>
              <td>{calculateHp(pokemon.hp, evMin)}</td>
              <td>{calculateHp(pokemon.hp, evMax)}</td>
            </tr>
            <tr>
              <td>Ataque</td>
              <td>{pokemon.attack}</td>
              <td>
                <div className="stat-bar-container">
                  <div
                    className="stat-bar"
                    style={{
                      width: `${(pokemon.attack / calculateStat(pokemon.attack, evMax)) * 100}%`,
                      backgroundColor: 'orange',
                    }}
                  ></div>
                </div>
              </td>
              <td>{calculateStat(pokemon.attack, evMin)}</td>
              <td>{calculateStat(pokemon.attack, evMax)}</td>
            </tr>
            <tr>
              <td>Defensa</td>
              <td>{pokemon.defense}</td>
              <td>
                <div className="stat-bar-container">
                  <div
                    className="stat-bar"
                    style={{
                      width: `${(pokemon.defense / calculateStat(pokemon.defense, evMax)) * 100}%`,
                      backgroundColor: 'orange',
                    }}
                  ></div>
                </div>
              </td>
              <td>{calculateStat(pokemon.defense, evMin)}</td>
              <td>{calculateStat(pokemon.defense, evMax)}</td>
            </tr>
            <tr>
              <td>Sp. Atk</td>
              <td>{pokemon.spattack}</td>
              <td>
                <div className="stat-bar-container">
                  <div
                    className="stat-bar"
                    style={{
                      width: `${(pokemon.spattack / calculateStat(pokemon.spattack, evMax)) * 100}%`,
                      backgroundColor: 'yellow',
                    }}
                  ></div>
                </div>
              </td>
              <td>{calculateStat(pokemon.spattack, evMin)}</td>
              <td>{calculateStat(pokemon.spattack, evMax)}</td>
            </tr>
            <tr>
              <td>Sp. Def</td>
              <td>{pokemon.spdefense}</td>
              <td>
                <div className="stat-bar-container">
                  <div
                    className="stat-bar"
                    style={{
                      width: `${(pokemon.spdefense / calculateStat(pokemon.spdefense, evMax)) * 100}%`,
                      backgroundColor: 'yellow',
                    }}
                  ></div>
                </div>
              </td>
              <td>{calculateStat(pokemon.spdefense, evMin)}</td>
              <td>{calculateStat(pokemon.spdefense, evMax)}</td>
            </tr>
            <tr>
              <td>Velocidad</td>
              <td>{pokemon.speed}</td>
              <td>
                <div className="stat-bar-container">
                  <div
                    className="stat-bar"
                    style={{
                      width: `${(pokemon.speed / calculateStat(pokemon.speed, evMax)) * 100}%`,
                      backgroundColor: 'orange',
                    }}
                  ></div>
                </div>
              </td>
              <td>{calculateStat(pokemon.speed, evMin)}</td>
              <td>{calculateStat(pokemon.speed, evMax)}</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>{pokemon.hp + pokemon.attack + pokemon.defense + pokemon.spattack + pokemon.spdefense + pokemon.speed}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>



      {/* Línea evolutiva */}
{evolutiveLine && evolutiveLine.length > 0 && (
  <div className="evolutive-container mt-5">
    <h3>Línea Evolutiva</h3>
    <div className="evolutive-line d-flex align-items-center">
      {evolutiveLine.map((pokemonEvolutivo, index) => (
        <div key={index} className="d-flex align-items-center">
          {/* Evolución del Pokémon */}
          <div className="evolution-item">
            <Link to={`/pokemon/${pokemonEvolutivo.id}`}>
              <img
                src={`http://localhost:3000/uploads/${pokemonEvolutivo.imagen}`}
                alt={pokemonEvolutivo.nombre}
                className="evolution-img"
              />
              <p>{pokemonEvolutivo.nombre}</p>
            </Link>
            <p>N.º {pokemonEvolutivo.nroPokedex}</p>

            {/* Mostrar tipos con sus imágenes */}
            <div className="pokemon-types">
              {pokemonEvolutivo.tipo1 && (
                <div className="type-item d-flex align-items-center">
                  <img
                    src={`http://localhost:3000/uploads/${pokemonEvolutivo.tipo1Imagen}`}
                    alt={pokemonEvolutivo.tipo1}
                    className="type-img"
                  />
                  <p>{pokemonEvolutivo.tipo1}</p>
                </div>
              )}
              {pokemonEvolutivo.tipo2 && (
                <div className="type-item d-flex align-items-center">
                  <img
                    src={`http://localhost:3000/uploads/${pokemonEvolutivo.tipo2Imagen}`}
                    alt={pokemonEvolutivo.tipo2}
                    className="type-img"
                  />
                  <p>{pokemonEvolutivo.tipo2}</p>
                </div>
              )}
            </div>
            <p>{pokemonEvolutivo.nivelEvolucion}</p>
          </div>

          {index < evolutiveLine.length - 1 && (
            <span className="evolution-arrow mx-3" >→</span>
          )}
        </div>
      ))}
    </div>
  </div>
)}

    </div>
  );
};

export default PokemonDetail;
