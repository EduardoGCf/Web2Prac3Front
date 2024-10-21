import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PokemonCatalog from './components/PokemonCatalog';
import PokemonDetail from './components/PokemonDetail';
import CreatePokemon from './components/CreatePokemon';
import CreateTipo from './components/CreateTipo';
import CreateHabilidad from './components/CreateHabilidad';
import PokemonList from './components/PokemonList';
import HabilidadList from './components/HabilidadList';
import TipoList from './components/TipoList';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<PokemonCatalog />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route path="/crear-pokemon" element={<CreatePokemon />} />
        <Route path="/crear-tipo" element={<CreateTipo />} />
        <Route path="/crear-habilidad" element={<CreateHabilidad />} />
        <Route path="/lista-pokemon" element={<PokemonList />} />
        <Route path="/lista-habilidades" element={<HabilidadList />} />
        <Route path="/lista-tipos" element={<TipoList />} />
      </Routes>
    </Router>
  );
};

export default App;
